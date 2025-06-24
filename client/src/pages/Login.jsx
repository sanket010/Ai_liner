import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';

function Login() {
  const [userState, setUserState] = useState('Login');
  const { showLogin, setShowLogin, backendUrl, token, setToken, loadUserCredits } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = userState === 'Sign Up' ? '/api/auth/signup' : '/api/auth/login';
      const payload = userState === 'Sign Up' 
        ? { name, email, password }
        : { email, password };

      const response = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (response.data.success) {
        const { token, user } = response.data;
        setToken(token);
        localStorage.setItem('token', token);
        setShowLogin(false);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: ''
        });

        // Load user data
        if (loadUserCredits) {
          await loadUserCredits();
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(
        error.response?.data?.message || 
        'An error occurred during authentication. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form 
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{}}
        className='rounded-xl relative bg-white p-10 text-slate-500 w-full max-w-md mx-4'
      >
        <button 
          type="button" 
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h1 className='text-center pb-2 font-medium text-[#444444] text-2xl'>{userState}</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {userState === 'Login' ? (
          <p className='text-sm'>Welcome back! Please sign in to continue</p>
        ) : (
          <p className='text-sm'>Welcome, Create an Account to continue</p>
        )}

        <div className='pt-6 space-y-4'>
          {userState === 'Sign Up' && (
            <div className='flex items-center gap-2 px-6 py-2 border rounded-full'>
              <img width={26} src={assets.profile_icon} alt="Profile" />
              <input 
                className='outline-none w-full bg-transparent'
                name="name"
                value={name}
                onChange={handleChange}
                type="text" 
                placeholder='Full Name' 
                required
              />
            </div>
          )}

          <div className='flex items-center gap-2 px-6 py-2 border rounded-full'>
            <img src={assets.email_icon} alt="Email" />
            <input 
              className='outline-none w-full bg-transparent'
              name="email"
              value={email}
              onChange={handleChange}
              type="email" 
              placeholder='Email address' 
              autoComplete="email"
              required
            />
          </div>

          <div className='flex items-center gap-2 px-6 py-2 border rounded-full'>
            <img src={assets.lock_icon} alt="Password" />
            <input 
              className='outline-none w-full bg-transparent'
              name="password"
              value={password}
              onChange={handleChange}
              type="password" 
              placeholder='Password' 
              autoComplete={userState === 'Login' ? 'current-password' : 'new-password'}
              required
              minLength={userState === 'Sign Up' ? 6 : undefined}
            />
          </div>

          <button 
            type="submit" 
            className='text-white bg-[#007AFF] rounded-full px-8 py-3 w-full cursor-pointer hover:bg-[#0066cc] transition-colors disabled:opacity-70 flex items-center justify-center gap-2'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {userState === 'Login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : userState}
          </button>

          <div className="text-center text-sm pt-2">
            {userState === 'Login' ? (
              <>
                Don't have an account?{' '}
                <button 
                  type="button" 
                  className="text-[#007AFF] hover:underline"
                  onClick={() => setUserState('Sign Up')}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button 
                  type="button" 
                  className="text-[#007AFF] hover:underline"
                  onClick={() => setUserState('Login')}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </motion.form>
    </div>
  );
}

export default Login;