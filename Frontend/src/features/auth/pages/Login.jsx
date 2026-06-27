import React from 'react'
import '../styles/Login.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import { useState } from 'react'


const Login = () => {
    const {loading, handleLogin} = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e){
        e.preventDefault()

        await handleLogin({
            username:email,
            email:email,
            password:password
        })

        navigate("/")

    }


    return (
        <main className="login-page">
        <section className="login-card">
            <header>
            <h1 className="login-heading">Moody Login</h1>
            <p className="login-subtitle">
                Sign in with your email or username to discover music recommendations based on your emotion.
            </p>
            </header>

            <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="user-field">Email or username</label>
                <input
                onInput={(e)=>{setEmail(e.target.value)}}
                id="user-field"
                name="user"
                type="text"
                placeholder="you@example.com or melodylover"
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
                placeholder="Enter your password"
                required
                />
            </div>

            <div className="login-actions">
                <button className="login-button" type="submit">
                Continue to mood playlist
                </button>
            </div>
            </form>

            <div className="icon-row" aria-label="Emotion music hints">
            <span className="icon-chip">🎧 Vibe analysis</span>
            <span className="icon-chip">✨ Emotion sync</span>
            <span className="icon-chip">🎶 Smart recommendations</span>
            </div>

            <p className="login-footer">
            New here? <Link to="/register">Create Account</Link> to save your mood playlists and facial emotion history.
            </p>
        </section>
        </main>
    )
}

export default Login
