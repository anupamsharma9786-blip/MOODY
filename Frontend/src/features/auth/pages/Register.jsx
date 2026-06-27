import React from 'react'
import '../styles/Login.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'



const Register = () => {
    const {user, loading, handleRegister} = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        await handleRegister({username,email,password})

        navigate("/")


    }

    
  

    return (
        <main className="login-page">
        <section className="login-card">
            <header>
            <h1 className="login-heading">Create your Moody account</h1>
            <p className="login-subtitle">
                Enter your username, email, and password to start getting emotion-driven music recommendations.
            </p>
            </header>

            <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username-field">Username</label>
                <input
                onInput={(e)=>{setUsername(e.target.value)}}
                id="username-field"
                name="username"
                type="text"
                placeholder="melodylover"
                required
                />
            </div>

            <div className="input-group">
                <label htmlFor="email-field">Email</label>
                <input
                onInput={(e)=>{setEmail(e.target.value)}}
                id="email-field"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                />
            </div>

            <div className="input-group">
                <label htmlFor="password-field">Password</label>
                <input
                onInput={(e)=>{setPassword(e.target.value)}}
                id="password-field"
                name="password"
                type="password"
                placeholder="Create a password"
                required
                />
            </div>

            <div className="login-actions">
                <button className="login-button" type="submit">
                Create account
                </button>
            </div>
            </form>

            <div className="icon-row" aria-label="Emotion music hints">
            <span className="icon-chip">🎵 Mood-based sign up</span>
            <span className="icon-chip">🌿 Nature-inspired theme</span>
            <span className="icon-chip">🔒 Secure authentication</span>
            </div>

            <p className="login-footer">
            Already have an account? <Link to="/login">Login</Link> and start discovering mood playlists.
            </p>
        </section>
        </main>
    )
}

export default Register