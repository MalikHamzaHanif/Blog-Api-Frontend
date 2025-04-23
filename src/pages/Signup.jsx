import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { Link } from "react-router-dom"
import { registerUser } from '../app/feature/authSlice/authApi';
function Signup() {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function createUser(data) {
    setError("");
    setSuccessMsg("");
    try {
      const userData = await registerUser(data);
      console.log("here is userdat",userData);
      
      if (userData.success === true) {
        setSuccessMsg(userData.data.msg);
      } else {
    throw new Error(userData.message)
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Register Now</h1>

      <div className="mb-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}
      </div>

      <form
        onSubmit={handleSubmit(createUser)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <div>
          <Input
            {...register("name", { required: "Name is required" })}
            type="text"
            label="Name"
            placeholder="Enter your name here"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

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
            Register
          </button>
        </div>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Signup;
