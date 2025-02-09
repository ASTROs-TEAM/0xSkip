import mongoose from "mongoose";

const ClaimsSchema = new mongoose.Schema({
    userid: { type: String, ref: 'User', required: true }, 
    habitid: { type: String, ref: 'Habit', required: true }, 
    claim_issued_date: { type: Date, required: true },
    claim_issued: { type: Boolean, required: true },
    claim_raised_date: { type: Date, default: null },
    claim_raised: { type: Boolean, default: false },
    claim_settled_date: { type: Date , default: null },
    claim_settled: { type: Boolean , default: false },
    claim_amount: { type: String, required: true },
    claim_status: {
      type: String,
      enum: ['issued','in process', 'settled', 'rejected'],
      required: true,
    },
  });


  
    const ClaimsModel = mongoose.models.claims || mongoose.model('claims', ClaimsSchema);
    export default ClaimsModel;