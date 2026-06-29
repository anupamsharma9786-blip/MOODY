import { useEffect, useState } from "react"
import { createContext } from "react"
import { getMe } from "./services/auth.api"

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true)
                const data = await getMe()
                setUser(data?.user || null)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}