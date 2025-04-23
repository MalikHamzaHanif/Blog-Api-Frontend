import { createSlice } from "@reduxjs/toolkit"


const dataSlice = createSlice({
    name: "data",
    initialState: {
        blogs: [],
        userblogs:[]

    },
    reducers: {
        addBlogs: (state, action) => {
            state.blogs = action.payload.blogData
        },
        addUserBlogs: (state, action) => {
            state.userblogs= action.payload.blogData
        },
        updateUserblog:(state,action)=>{
            const {_id}=action.payload.blog
          state.userblogs[_id]=action.payload.blog
          console.log(_id);
        },
        removeUserBlog:(state,action)=>{
            const {_id}=action.payload.blog
            console.log(_id);
            
          state.userblogs=state.userblogs.filter((blog)=>blog._id!==_id)
       
        },
        removeBlogs: (state) => {
            state.blogs = []
            state.userblogs= []
        },
    }
});

export const { addBlogs, removeBlogs,addUserBlogs,updateUserblog,removeUserBlog } = dataSlice.actions

export default dataSlice.reducer