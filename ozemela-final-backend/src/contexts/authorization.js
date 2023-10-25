import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { api, createSession } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      navigate('/posts');
    }
    
  }, []);

  const login = async (email, password) => {
    try {
      const response = await createSession(email, password);

      if (!response) return;

      localStorage.setItem('token', response.data.token);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');

      api.defaults.headers.Authorization = null;

      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node, 
};