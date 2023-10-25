import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isExpired, decodeToken } from 'react-jwt';

import { goToHome } from '../../routes/coordinator';

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);
    const tokenExpired = isExpired(token);

    if (token === null || tokenExpired || !decodedToken) {
      goToHome(navigate);
    }
   
  }, []);

  return children;
};

export default ProtectedPage;