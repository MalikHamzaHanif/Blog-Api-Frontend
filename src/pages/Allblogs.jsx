import React, { useEffect, useState } from 'react'
import { getAllBlog } from '../app/feature/dataSlice/dataApi'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { addBlogs } from '../app/feature/dataSlice/dataSlice';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import Select from '../components/Select';

function Allblogs({ createdBy = "" }) {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [totalNoOfPages, setTotalNoOfPages] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const blogs = useSelector((state) => state.data.blogs)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      "category": "All",
      "sort": "a-z",
    }
  })
  const options = ["All", "tech", "fashion", "travel", "health", "education", "other"]
  function createPageButtons() {
    let buttons = []
    for (let i = 1; i <= totalNoOfPages; i++) {
      buttons.push((<button key={i} onClick={() => { setActivePage(i) }} className={`mx-1 px-4 py-2 rounded ${activePage === i ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{i}</button>))
    }
    return buttons;
  }
  useEffect(() => {
    getAllTheBlogs()
    setLoading(false);
  }, [activePage, sort, category, search]);

  function getQueryObject(data) {
    setLoading(true)
    setSearch(data.search || "")
    setCategory(data.category)
    setSort(data.sort)
    setLoading(false)
  }
  async function getAllTheBlogs() {
    setError("");
    setLoading(true);
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      setError("Something went wrong with the token please login again.")
      return null;
    }
    const queryObject = {
      search,
      sort,
      category,
      page: activePage,

    }
    if (createdBy) {
      queryObject.createdBy = createdBy
    }
    const queryUrl = new URLSearchParams(queryObject).toString()
    setSearchParams(queryUrl)
    const res = await getAllBlog(`?${queryUrl}`, token)

    if (res.success === false) {
      setError("No blog found")
      dispatch(addBlogs({ blogData: [] }))
      return
    }
    const blogs = res.data.data
    console.log(blogs);

    const noOfPages = res.data.totalPages
    dispatch(addBlogs({ blogData: blogs }))
    setTotalNoOfPages(Number(noOfPages))
    setLoading(false)
  }
  if (loading) {
    return (<h1 className="text-center text-2xl font-semibold mt-10">Loading...</h1>)
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <form onSubmit={handleSubmit(getQueryObject)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Type here"
          label="Search"
          {...register("search")}
        />
        <Select
          label="Category"
          options={options}
          {...register("category")}
        />
        <Select
          label="Sort"
          options={["a-z", "z-a", "latest", "oldest"]}
          {...register("sort")}
        />
        <button type='submit' className="col-span-1 sm:col-span-3 mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Search</button>
      </form>
      <div className="grid gap-6">
        {blogs && blogs.map((blog) => {
          return (
            <div key={blog._id} className="bg-white shadow-md rounded p-6 border border-gray-200">
              <Link to={`/blogs/${blog._id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
                {blog.title.toUpperCase()}
              </Link>
              <div className="w-full h-64 flex items-center justify-center bg-gray-100 border border-gray-300 rounded">
                <img
                  src={blog.image.url}
                  alt={blog.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-gray-700 mb-3">{blog.content}</p>
              <h3 className="text-sm text-gray-600 font-medium">Category: <span className="capitalize">{blog.category}</span></h3>
              <h3 className="text-sm text-gray-600">Created At: <span className="font-medium">{new Date(blog.createdAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}</span></h3>
              <h3 className="text-sm text-gray-600">Updated At: <span className="font-medium">{new Date(blog.updatedAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}</span></h3>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {blogs?.length > 0 && createPageButtons()}
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    </div>
  )
}

export default Allblogs
