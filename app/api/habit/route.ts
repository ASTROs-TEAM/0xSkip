import connecttodb from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import HabitModel from "@/db/models/HabitSchema";

export async function GET(req: NextRequest) {
  try {
    await connecttodb();
    const habits = await HabitModel.find();
    return NextResponse.json(
      { message: "Habits retrieved", habits: habits },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error retrieving habits", error: err },
      { status: 500 }
    );
  }
}
