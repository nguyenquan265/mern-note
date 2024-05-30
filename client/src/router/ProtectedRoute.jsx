import { Outlet, Navigate } from "react-router-dom"

function ProtectedRoute() {
  if (!localStorage.getItem('accessToken')) {
    return <Navigate to='/login' />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute