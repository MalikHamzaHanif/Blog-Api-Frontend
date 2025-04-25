import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { Link } from "react-router-dom"
import { loginUser } from '../app/feature/authSlice/authApi';
import { useDispatch } from "react-redux"
import { login } from '../app/feature/authSlice/authSlice';

function Signin() {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  async function signInUser(data) {
    setError("");
    try {
      const userData = await loginUser(data);
      if (userData.success === true) {
        localStorage.setItem("x-auth-token", `Bearer ${userData.data.data.user.token}`)
        dispatch(login({ userData: userData.data.data.user }))
      } else {

        throw new Error(userData.message)
      }
    } catch (err) {

      setError(err.message);

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center text-3xl font-bold text-gray-700">Login Now</h1>

        {error && (
          <div className="text-center mb-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(signInUser)}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-6"
        >
          <div>
            <Input
              {...register("email", { required: "Email is required" })}
              type="email"
              label="Email"
              placeholder="Enter your email here"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Input
              {...register("password", { required: "Password is required" })}
              type="password"
              label="Password"
              placeholder="Enter your password here"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </form>

        <button
          onClick={() => signInUser({ email: "test@example.com", password: "test" })}
          className="w-full py-2 mt-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition"
        >
          Login as Test User
        </button>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register Now
            </Link>
          </p>
        </div>
        <div className="text-center text-sm text-gray-600">
          <p>
            Forgot Passoword?{" "}
            <Link to="/forgotpassword" className="text-blue-600 hover:underline">
              Click Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
