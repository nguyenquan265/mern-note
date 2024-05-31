import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    content: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Notification = mongoose.model('Notification', notificationSchema)
export default Notification
