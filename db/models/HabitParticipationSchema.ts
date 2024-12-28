import mongoose from "mongoose";

const HabitParticipationSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true }, 
    habitId: { type: String, ref: 'Habit', required: true }, 
    join_date: { type: Date, required: true },
    status: {
      type: String,
      enum: ['current', 'quit', 'past'],
      required: true,
    },
    totalDays: { type: Number, required: true },
    daysChecked: { type: Number, default: 0 },
    daysMissed: { type: Number, default: 0 },
    daysValidated: { type: Number, default: 0 },
  });


  const HabitParticipationModel = mongoose.models.HabitParticipation || mongoose.model('HabitParticipation', HabitParticipationSchema);
  export default HabitParticipationModel;
  