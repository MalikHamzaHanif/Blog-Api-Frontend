import conf from "../../../conf/conf";
import fetchWrapper from "../../fetchWrapper";

const createBlog = async (data,token) => {
    return await fetchWrapper(`${conf.dataUrl}/`, "POST", data,token)
}
const updateBlog = async (data,token) => {
    return await fetchWrapper(`${conf.dataUrl}/`, "POST", data,token)
}
const deleteBlog = async (id,token) => {
    return await fetchWrapper(`${conf.dataUrl}/${id}`, "DELETE",null,token)
}
const getSingleBlog = async (id,token) => {
    return await fetchWrapper(`${conf.dataUrl}/${id}`, "GET", null, token)
}
const getAllBlog = async (query,token) => {
    
    return await fetchWrapper(`${conf.dataUrl}${query}`, "GET", null, token)
}
const getBlogsByCategory = async (token) => {
    return await fetchWrapper(`${conf.dataUrl}/category`, "GET", null, token)
}
const searchBlogs = async (query,token) => {
    return await fetchWrapper(`${conf.dataUrl}/?${query}`, "GET", null, token)
}


export { getAllBlog, deleteBlog, updateBlog, getSingleBlog,createBlog,searchBlogs,getBlogsByCategory }