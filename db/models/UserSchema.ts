import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image_url: { type: String },
  current_habits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }],
  userid: { type: String, required: true, unique: true }
})

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)
export default UserModel
