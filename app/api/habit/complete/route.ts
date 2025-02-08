import HabitParticipationModel from "@/db/models/HabitParticipationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    /**
     * This api gives the info of a user's participation in a habit
     * days checked, days missed, days validated and status
     */
    
    const { userid , habitid } = await req.json();
    
    const habit = await HabitParticipationModel.findOne({ habitid, userid });

    return NextResponse.json(
        { message: "Habit retrieved", habit: habit },
    )
}