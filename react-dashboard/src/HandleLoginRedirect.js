//HandleLoginRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import jwt_decode from "jwt-decode";

const HandleLoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const role = urlParams.get('role');
    const username = urlParams.get('role');

    if (token && role && username) {
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', username);
      navigate(`/${role}-dashboard`);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default HandleLoginRedirect;
