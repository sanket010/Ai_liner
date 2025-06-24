import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [credits, setCredits] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    // Set up axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            loadUserCredits();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
            setCredits(0);
        }
    }, [token]);

    // Check for existing token on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    const loadUserCredits = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/auth/me`);
            if (response.data.success) {
                setUser(response.data.user);
                // If your API returns credits, uncomment the line below
                // setCredits(response.data.user.credits || 0);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            // If token is invalid, clear it
            if (error.response && error.response.status === 401) {
                logout();
            }
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
            if (response.data.success) {
                setToken(response.data.token);
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'An error occurred during login' 
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${backendUrl}/api/auth/signup`, { name, email, password });
            if (response.data.success) {
                setToken(response.data.token);
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            console.error('Registration error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'An error occurred during registration' 
            };
        }
    };

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        setUser(null);
        setCredits(0);
        navigate('/');
    };

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

    return (
        <AppContext.Provider 
            value={{
                backendUrl,
                token,
                user,
                credits,
                isLoading,
                showLogin,
                setShowLogin,
                setToken,
                login,
                register,
                logout,
                loadUserCredits,
                generateImage
            }}
        >
            {!isLoading && props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;