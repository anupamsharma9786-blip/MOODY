import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'
import '../styles/Loading.scss'

const Protected = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <main className="loading-shell">
                <section className="loading-card">
                    <div className="loading-spinner" aria-hidden="true" />
                    <h2 className="loading-title">Checking your session</h2>
                    <p className="loading-copy">Preparing your Moody experience...</p>
                </section>
            </main>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default Protected