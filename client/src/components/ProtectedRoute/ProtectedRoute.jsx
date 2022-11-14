import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ children, isAllowed, redirect }) {
  if (!isAllowed) {
    console.log(isAllowed);
    return <Navigate to={redirect} replace />;
  }
  return children || <Outlet />;
}
