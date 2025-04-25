import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import { updateUser } from '../app/feature/authSlice/authApi'
import { useNavigate, useParams } from 'react-router-dom'
import { login, logout } from '../app/feature/authSlice/authSlice'
import { deleteBlog, getAllBlog, getBlogsByCategory } from '../app/feature/dataSlice/dataApi'
import { addUserBlogs, removeUserBlog, updateUserblog } from '../app/feature/dataSlice/dataSlice'
import Select from '../components/Select'
import conf from '../conf/conf'
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);



function Profile() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [editPassword, setEditPassword] = useState(false)
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [blogLoading, setBlogLoading] = useState(true);
  const userBlogs = useSelector((state) => state.data.userblogs)
  const [totalPages, setTotalPages] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [categoryData, setCategoryData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);


  function createPageButtons() {
    let buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setActivePage(i)}
          className={`px-3 py-1 border rounded-md mx-1 transition 
            ${activePage === i
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  }
  useEffect(() => {
    setValue("name", user?.name)
    setValue("email", user?.email)
    setTimeout(() => {
      setError("")
      setSuccessMsg("")
    }, 4000)
  }, [user])

  useEffect(() => {
    if (editPassword === false) {
      setValue("oldPassword", "")
      setValue("newPassword", "")
    }
    getUserBlogs()
    getBlogsBasedOnCategory()

  }, [editPassword, activePage])

  async function getBlogsBasedOnCategory() {
    const token = localStorage.getItem("x-auth-token");
    const res = await getBlogsByCategory(token);
    if (res.success) {
      const { defaultValues, monthlyCategory } = res.data.data;

      setCategoryData({
        labels: Object.keys(defaultValues),
        datasets: [
          {
            label: "Total Blogs by Category",
            data: Object.values(defaultValues),
            backgroundColor: [
              "#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#A855F7"
            ],
          },
        ],
      });
      setMonthlyData({
        labels: monthlyCategory.map((item) => item.date),
        datasets: [
          {
            label: "Blogs per Month",
            data: monthlyCategory.map((item) => item.count),
            backgroundColor: "#6366F1",
          },
        ],
      });
    }
  }


  async function getUserBlogs() {
    try {
      const token = localStorage.getItem("x-auth-token")
      if (!token) {
        throw new Error("something went wrong with the token")
      }
      const res = await getAllBlog(`?createdBy=${id}&page=${activePage}`, token)
      dispatch(addUserBlogs({ blogData: res.data.data }))
      setTotalPages(res.data.totalPages)

    } catch (err) {
      console.log(err);

    } finally {
      setBlogLoading(false);
    }
  }

  async function update(data) {
    setSuccessMsg("")
    setError("")
    try {
      const token = localStorage.getItem("x-auth-token")
      if (!token) {
        dispatch(logout())
        return;
      }
      const userData = await updateUser(data, id, token)
      if (userData.success === true) {
        dispatch(login({ userData: userData.data.data.user }))
        setSuccessMsg(userData.data.data.msg)
      } else {
        throw new Error(userData.message)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-10">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome {user?.name}</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

      <form onSubmit={handleSubmit(update)} className="space-y-4">
        <Input
          label="Name"
          placeholder="Enter your name here"
          {...register("name", { required: "Name can not be empty" })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <Input
          label="Email"
          placeholder="Enter your email here"
          disabled={true}
          {...register("email", { required: "Email can not be empty" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {editPassword && EditPassword(register, errors)}

        <button
          type="submit"
          className="w-full bg-rose-600 text-white font-semibold py-2 rounded-md hover:bg-rose-700 transition"
        >
          Update
        </button>
      </form>

      <button
        onClick={() => setEditPassword((prev) => !prev)}
        className="w-full border border-rose-600 text-rose-600 font-medium py-2 rounded-md hover:bg-rose-100 transition"
      >
        {!editPassword ? "Edit Password" : "Close"}
      </button>
      {/* charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">Blogs by Category</h2>
            {categoryData ? (
              <Doughnut data={categoryData} />
            ) : (
              <p className="text-center text-gray-500">Loading category chart...</p>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">Monthly Blog Stats</h2>
            {monthlyData ? (
              <Bar
                data={monthlyData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      ticks: {
                        beginAtZero: true,
                        stepSize: 50,
                        callback: function (value) {
                          return value;
                        }
                      }
                    }
                  }
                }}
              />
            ) : (
              <p className="text-center text-gray-500">Loading monthly chart...</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold">Your Blogs</h2>
          <button
            onClick={() => navigate(`/${id}/createblog`)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Create Blog
          </button>
        </div>

        <div className="space-y-4">
          {blogLoading ? (
            <p className="text-center">Loading...</p>
          ) : userBlogs?.length <= 0 ? (
            <p className="text-center text-gray-500">No Blog Found</p>
          ) : (
            userBlogs.map((blog) => (
              <div key={blog._id} className="p-4 border rounded shadow-sm">
                <UpdateBlog
                  title={blog.title}
                  content={blog.content}
                  category={blog.category}
                  imageurl={blog.image.url}
                  _id={blog._id}
                />
              </div>
            ))
          )}
        </div>

        {blogLoading ? null : userBlogs.length > 0 ? (
          <div className="flex gap-2 justify-center mt-4">
            {createPageButtons()}
          </div>
        ) : null}
      </div>
    </div>

  )
}

export default Profile

function UpdateBlog({ title, content, category, imageurl, _id }) {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm()
  const [editButton, setEditButton] = useState(false)
  const [image, setImage] = useState(imageurl)
  const imageWatch = watch("image")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  useEffect(() => {
    setValue("title", title)
    setValue("content", content)
    setValue("category", category)
    if (imageWatch && imageWatch.length > 0) {
      const img = imageWatch[0]
      const imgUrl = URL.createObjectURL(img)
      setImage(imgUrl)
      return () => URL.revokeObjectURL(img);

    }
  }, [imageWatch])

  async function updateBlog(data) {
    setEditButton((prev) => !prev)
    let formData = new FormData()
    formData.append("title", data.title)
    formData.append("content", data.content)
    formData.append("category", data.category)
    if (data.image.length > 0) {
      formData.append("image", data.image[0])
    }
    try {
      const token = localStorage.getItem("x-auth-token")
      if (!token) {
        throw new Error("Something went wrong with the token please login again")
      }
      const res = await fetch(`${conf.dataUrl}/${_id}`, {
        method: "PATCH",
        headers: {
          authorization: token
        },
        body: formData
      })
      const resData = await res.json()
      if (resData.sucess === false) {        
        throw new Error(resData.data.msg)
      }
      
      setSuccessMessage(resData.msg)
      dispatch(updateUserblog({ blog: resData.data }))
    } catch (err) {
      setError(err.message)
    } finally {
      setTimeout(() => {
        setError("")
        setSuccessMessage("")
      }, 4000)
    }
  }
  async function deleteTheBlog() {
    const token = localStorage.getItem("x-auth-token")
    try {
      if (!token) {
        throw new Error("Something went wrong with the token.")
      }
      const res = await deleteBlog(_id, token)
     if(res.success===false){
      throw new Error(res.message)
     }
      setSuccessMessage(res.data.msg)
      dispatch(removeUserBlog({ blog: res.data.data }))
      
    } catch (err) {
      setError(err.message)
    } finally {
      setTimeout(() => {
        setError("")
        setSuccessMessage("")
      }, 4000)
    }
  }
  return (
    <div className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <form onSubmit={handleSubmit(updateBlog)} className="space-y-4">
        <Input
          placeholder="Enter your title here"
          label="Title"
          disabled={!editButton}
          {...register("title", { required: "Title cannot be empty" })}
        />

        {errors.title && <p className="text-sm text-red-600" >{errors.title.message}</p>}
        <textarea
        placeholder="Content"
        className="w-full border rounded p-2"
        rows={4}
        {...register("content", { required: "Content is required" })}
        disabled={!editButton}
      />
        {errors.content && <p className="text-sm text-red-600" >{errors.content.message}</p>}

        {image && (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100 border border-gray-300 rounded">

            <img src={image} alt="Blog Preview" className="max-w-full max-h-full object-contain" />
          </div>
        )}

        <Input
          label="Change Image"
          disabled={!editButton}
          type="file"
          accept="image/*"
          {...register("image")}
        />
        {errors.image && <p className="text-sm text-red-600" >{errors.image.message}</p>}

        <Select
          label="Category"
          disabled={!editButton}
          options={["tech", "fashion", "travel", "health", "education", "other"]}
          {...register("category", { required: "Category cannot be left empty" })}
        />
        {errors.category && <p className="text-sm text-red-600" >{errors.category.message}</p>}

        {editButton && (
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Update
          </button>
        )}
      </form>

      <div className="flex gap-3 mt-4">
        {editButton ? (
          <button
            onClick={() => {
              setEditButton((prev) => !prev)
              setImage(imageurl)
            }}
            className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setEditButton((prev) => !prev)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit
          </button>
        )}

        <button
          onClick={deleteTheBlog}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>

  );
}


function EditPassword(register, errors) {
  return (
    <div className="space-y-4">
      <Input
        label="Old Password"
        placeholder="Enter your new password here"
        {...register("oldPassword", { required: "Old Passoword can not be empty" })}
      />
      {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}

      <Input
        label="New Password"
        placeholder="Enter your new password here"
        {...register("newPassword", { required: "New Passoword can not be empty" })}
      />
      {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
    </div>
  );
}
