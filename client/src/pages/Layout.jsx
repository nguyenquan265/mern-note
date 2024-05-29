import { Outlet } from "react-router-dom"
import AuthProvider from "../context/AuthProvider"

function Layout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default Layout