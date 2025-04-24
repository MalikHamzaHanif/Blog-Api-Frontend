import React, { useEffect, useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { getUserData } from './app/feature/authSlice/authApi';
import { useDispatch } from 'react-redux';
import { login, logout } from './app/feature/authSlice/authSlice';


function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  async function verifyUserToken() {
    setLoading(true)
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      // navigate("/");
      return;
    }
    try {
      const userData = await getUserData(token)
      if (userData.success === true) {
        dispatch(login({ userData: userData.data.data.user }))
      } else {


        dispatch(logout())
      }

    } catch (err) {

      navigate("/");
    } finally {

      setLoading(false)
    }

  }
  useEffect(() => {
    verifyUserToken()
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
