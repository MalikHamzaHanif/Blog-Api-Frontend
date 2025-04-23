import React, { useState } from 'react'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import conf from '../conf/conf'

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    async function searchEmail(data) {
        try {
            const res = await fetch(`${conf.authUrl}/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: data?.email })
            })
            const resData = await res.json()
            if (resData.success !== true) {
                throw new Error(resData.data.msg)
            }
            setSuccessMessage(resData.data.msg)
            setError("")
        } catch (err) {
            setError(err.message)
            setSuccessMessage("")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {successMessage && <p className="text-green-600 text-sm mb-2">{successMessage}</p>}

                <form onSubmit={handleSubmit(searchEmail)} className="space-y-4">
                    <Input
                        label="Email"
                        placeholder="Enter your email here"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <button
                        type='submit'
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
