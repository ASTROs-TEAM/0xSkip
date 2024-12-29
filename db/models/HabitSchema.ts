import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  habitid: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String, ref: "User", required: true },
  canUpdate: { type: Boolean, default: true },
  updateRemaining: { type: Number, default: 2 },
  participants: [{ type: String, ref: "User" }],
  prizePool: { type: String, required: true },
  entryPrize: { type: String, required: true },
  noOfDays: { type: Number, min: 21, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  withdrawn_participants: [{ type: String, ref: "User" }],
  private: { type: Boolean, default: false },
  invite_code: { type: String, default: "" },
  maxparticipants: { type: Number, required: true },
});

const HabitModel =
  mongoose.models.Habit || mongoose.model("Habit", HabitSchema);
export default HabitModel;
