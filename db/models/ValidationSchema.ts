import mongoose from "mongoose";

const ValidationSchema = new mongoose.Schema({
    userid: { type: String, ref: 'User', required: true },
    habitid: { type: String, ref: 'Habit', required: true },
    progress: { type: String, maxlength: 300, required: true },
    date_of_validation: { type: Date, required: true },
    proof_imgs: [{ type: String, required: true }],
    validated_by: [{ type: String, ref: 'User' }],
    validation_status: {
      type: String,
      enum: ['pending', 'partial', 'validated'],
      required: true,
    },
    validation_status_bool: { type: Boolean, required: true },
    signed : { type: Boolean, default: false}
  });
  

  const ValidationModel = mongoose.models.Validation || mongoose.model('Validation', ValidationSchema);
  export default ValidationModel;