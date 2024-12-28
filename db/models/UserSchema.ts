import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    current_habits: [{ type: String, ref: 'Habit' }], 
    userid: { type: String, required: true, unique: true }, 
  });
  