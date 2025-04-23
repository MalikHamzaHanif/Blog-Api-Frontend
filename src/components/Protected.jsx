import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
function Protected({ authentication = true, children }) {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        if (authentication === true && authStatus !== authentication) {

            navigate("/login");
        }
        else if (!authentication && authStatus !== authentication) {
            ///true && true !!==false
            ///true && true
            navigate("/blogs");
        }
        setLoading(false)
    }, [authStatus, navigate, authentication])

    if (loading) {
        return (<h1>Loading</h1>)
    }

    return <>{children}</>
}

export default Protected
