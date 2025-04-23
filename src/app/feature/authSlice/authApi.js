import conf from "../../../conf/conf";
import fetchWrapper from "../../fetchWrapper";

const registerUser = async (data) => {
    return await fetchWrapper(`${conf.authUrl}/register`, "POST", data)
}
const loginUser = async (data) => {
    return await fetchWrapper(`${conf.authUrl}/login`, "POST", data)
}
const updateUser = async (data, id,token) => {
    return await fetchWrapper(`${conf.authUrl}/${id}`, "PATCH", data,token)
}
const getUserData = async (token) => {
    return await fetchWrapper(`${conf.authUrl}/`, "GET", null, token)
}

export { registerUser, loginUser, updateUser, getUserData }