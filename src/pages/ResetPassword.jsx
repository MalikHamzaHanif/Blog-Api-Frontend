import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import conf from '../conf/conf'
import Input from '../components/Input'

function ResetPassword() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const { id, token } = useParams()
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [notShow, setNotShow] = useState(true)

    useEffect(() => {
        async function checkResetPasswordRequest() {
            try {
                const res = await fetch(`${conf.authUrl}/forgotpassword/${id}/${token}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                const resData = await res.json()
                if (resData.success !== true) {
                    throw new Error(resData.data.msg)
                }
                setSuccess(true)
                setNotShow(false)
                setSuccessMessage(resData.data.msg)
            } catch (err) {
                setError(err.message)
                setNotShow(true)
                setSuccess(false)
            } finally {
                setLoading(false)
            }
        }
        checkResetPasswordRequest()
    }, [])

    async function changePassword(data) {
        try {
            const res = await fetch(`${conf.authUrl}/forgotpassword/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newPassword: data?.password })
            })
            const resData = await res.json()
            if (resData.success !== true) {
                throw new Error(resData.data.msg)
            }

            setSuccessMessage(resData.data.msg)
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <h1 className="text-2xl font-semibold">Loading...</h1>
            </div>
        )
    }

    if (notShow === true) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-red-50 text-center px-4">
                <h1 className="text-2xl font-bold text-red-600 mb-2">Password Reset Failed</h1>
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if (success === true) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>
                    {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
                    {successMessage && <p className="text-green-600 mb-4 text-sm">{successMessage}</p>}

                    <form onSubmit={handleSubmit(changePassword)} className="space-y-4">
                        <Input
                            label="New Password"
                            placeholder="Enter your new password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                        <button
                            type='submit'
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ResetPassword
