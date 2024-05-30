import mongoose from 'mongoose'
import env from './env.js'

export const connectMongo = async () => {
  await mongoose
    .connect(env.MONGO_URI)
    .then(console.log('Connect db successfully!'))
    .catch((err) => console.error(err))
}
