import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { use } from "react";
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()


const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')

    const [showLogin, setShowLogin] = useState(false)
    const [credits, setCredits] = useState(false)

    // axios.defaults.withCredentials = true

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))

        }
    }, [])

    const loadUserCredits = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/user/user-credits', { headers: { token } })
            
            if (response.data.success) {
                setCredits(response.data.credits)
                setUser(response.data.user)
            }
            else {
                console.log(response.data.message)
            }

        } catch (error) {
            console.log(error.message)
        }


    }

    useEffect(() => {
        if (token) {
            loadUserCredits()
        }
    }, [token])

    const generateImage = async (prompt) => {
        try {

            const response = await axios.post(backendUrl + "/api/image/generate-image", { prompt }, { headers: { token } })

            if (response.data.success) {
                loadUserCredits()
                return response.data.resultImage
            }
            else {
                console.log(response.data.message)
                loadUserCredits()
                if (response.data.creditBalance === 0) {
                    navigate('/pricing')
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const value = {
        showLogin, setShowLogin, backendUrl, setToken, token,
        credits, setCredits, loadUserCredits, user, setUser,
        generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


}

export default AppContextProvider;