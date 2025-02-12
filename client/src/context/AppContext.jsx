import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext()


const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [token, setToken] = useState('')

    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false)

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, setToken, token
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


}

export default AppContextProvider;