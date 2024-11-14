// AuthPage.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../Context/Context";

function AuthPage({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // If user is authenticated, render the children (Profile)
  if (user) {
    return children;
  }

  // If user is not authenticated, redirect to login
  return <Navigate to="/login" />;
}

export default AuthPage;
