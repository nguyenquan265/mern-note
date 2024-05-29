import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { getAuth } from 'firebase/auth'
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        setUser(user)
        localStorage.setItem('accessToken', user.accessToken)
        return
      }

      setUser({})
      localStorage.removeItem('accessToken')
      navigate('/login')
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthProvider