import mongoose from "mongoose";

const ClaimsSchema = new mongoose.Schema({
    userid: { type: String, ref: 'User', required: true }, 
    habitid: { type: String, ref: 'Habit', required: true }, 
    claim_raised_date: { type: Date, required: true },
    claim_settled_date: { type: Date },
    claim_amount: { type: String, required: true },
    claim_status: {
      type: String,
      enum: ['in process', 'settled', 'rejected'],
      required: true,
    },
    claim_status_bool: { type: Boolean, required: true },
  });
  