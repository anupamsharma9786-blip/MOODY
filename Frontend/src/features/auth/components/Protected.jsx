import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router'
import { useEffect } from 'react'


const Protected = ({ children }) => {

            useEffect(() => {
            handleGetMe()
        }, [])


    const { user, loading, handleGetMe } = useAuth()



    const navigate = useNavigate()

    if (loading) {

        return (
            <h1>loading...</h1>
        )
    }

    if (!user && !loading) {
        return <Navigate to="/login" />
    }



    return children
}

export default Protected