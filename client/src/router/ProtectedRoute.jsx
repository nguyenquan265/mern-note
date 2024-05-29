import { Outlet, useNavigate } from "react-router-dom"

function ProtectedRoute() {
  const navigate = useNavigate()

  if (!localStorage.getItem('accessToken')) {
    navigate('/login')
    return
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute