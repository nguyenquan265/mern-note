import 'dotenv/config'

export default {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  BUILD_MODE: process.env.BUILD_MODE
}
