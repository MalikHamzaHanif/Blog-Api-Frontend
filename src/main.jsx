import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Allblogs from './pages/Allblogs.jsx'
import SingleBlog from './pages/SingleBlog.jsx'
import Profile from './pages/Profile.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import { Provider } from 'react-redux'
import store from "../src/app/store/store.js"
import Protected from './components/Protected.jsx'
import CreateBlog from './pages/CreateBlog.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import NotFound from './pages/NotFound.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/services",
        element: <Services />
      },
      {
        path:"/forgotpassword",
        element:<ForgotPassword/>
      
      },
      {
        path:"/forgotpassword/:id/:token",
        element:<ResetPassword/>
      
      },
      {
        path: "register",
        element: <Protected authentication  ={false}>
          <Signup />
        </Protected>
      },
      {
        path: "login",
        element: <Protected authentication ={false}>
          <Signin />
        </Protected>
      },
     
      {
        path: "blogs",
        element: <Protected authentication ={true}>
          <Allblogs />
        </Protected>
      },
      {
        path: "blogs/:id",
        element: <Protected authentication ={true}>
          <SingleBlog />
        </Protected>
      },
      {
        path: ":id",
        element: <Protected authentication ={true}>
          <Profile />
        </Protected>
      },
      {
        path: ":id/createblog",
        element: <Protected authentication ={true}>
          <CreateBlog />
        </Protected>
      },
      {
        path:"*",
        element:<NotFound/>
      }
     
    ]
  }
])
createRoot(document.getElementById('root')).render(


  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>


)
