import HabitParticipationModel from "@/db/models/HabitParticipationSchema";
import { calculateHabitPenalties } from "@/lib/math";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    /**
     * This api gives the info of a user's participation in a habit
     * days checked, days missed, days validated and status
     */
    
    const { userid , habitid } = await req.json();
    
    const habit = await HabitParticipationModel.findOne({ habitid, userid });
    
    const values = {
      joiningAmount: habit,
      totalDays: habit.totalDays,
      daysCompleted: habit.daysChecked,
      missed3DayIntervals: habit.daysMissed
    }

    const {
      perMissPenalty,
      inactivityPenalty,
      quitPenalty: quitPenaltyAmount,
      percentCompleted,
      quitPenaltyPercentage
    } = calculateHabitPenalties(values)

    // Eth logic to send the claim for the remaining amount

    return NextResponse.json(
        { message: "Claim sent", habit: habit },
    )
}