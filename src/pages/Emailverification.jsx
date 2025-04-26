import React, { useEffect, useState } from 'react'
import conf from '../conf/conf'
import { useNavigate, useParams } from 'react-router-dom'

function Emailverification() {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const { id, token } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        async function verifyUserEmail() {
            try {
                if (!id || !token) {
                    throw new Error("Invailed link")

                }
                const res = await fetch(`${conf.authUrl}/${id}/verify/${token}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const resData = await res.json()
                
                if (resData.sucess === false) {
                    throw new Error(resData.data.msg)
                }
                setSuccess(resData.data.msg)
            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    navigate("/login")
                }, 10000)
            }
        }
        verifyUserEmail()
    }, [])

    return (
        <div>
            <h1>Email verification</h1>
            {error&&<p>{error}</p>}
            {success&&<p>{success}</p>}
        </div>
    )
}

export default Emailverification
