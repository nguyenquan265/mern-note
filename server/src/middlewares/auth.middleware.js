import { getAuth } from 'firebase-admin/auth'

const authorization = async (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    const accessToken = token.split(' ')[1]

    getAuth()
      .verifyIdToken(accessToken)
      .then((decoded) => {
        res.locals.uid = decoded.uid
        next()
      })
      .catch((err) => {
        console.log(err)
        return res.status(403).json({ message: 'Forbidden' })
      })
  } else {
    next()
  }
}

export default authorization
