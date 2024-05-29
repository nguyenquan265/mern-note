import { Button, Typography } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

function Login() {
  const auth = getAuth()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    await signInWithPopup(auth, provider)
  }

  if (user?.uid) {
    navigate('/')
    return
  }

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '10px' }}>Welcome to Note App</Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>Login with google</Button>
    </>
  )
}

export default Login