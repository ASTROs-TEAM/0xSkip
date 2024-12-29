import connecttodb from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import HabitModel from "@/db/models/HabitSchema";
import { v4 } from "uuid";
import UserModel from "@/db/models/UserSchema";
import HabitParticipationModel from "@/db/models/HabitParticipationSchema";


export async function POST(req: NextRequest) {
    /*
    this api is to add new habit
    userid from params
    body includes title,description,prizePool,entryPrize,startDate,noOfDays
    updates currenthabit field in usermodel by pushing habitid 
    also add new habitparticipationmodel
    */
    try {
      await connecttodb();
  
      const pathParts = req.nextUrl.pathname.split('/');
      const userid = pathParts[pathParts.length - 1];
  
      const data = await req.json();
      const { title, description, prizePool, entryPrize, startDate, noOfDays,maxparticipants } = data;
      if (!title || !startDate || !noOfDays || !entryPrize || !prizePool || maxparticipants) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }
  
      const habitid = v4();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + noOfDays);
  
      const habit = new HabitModel({
        habitid,
        title,
        description,
        creator: userid,
        participants: [userid],
        prizePool,
        entryPrize,
        startDate,
        noOfDays,
        endDate,
        maxparticipants,
      });
  
      const user = await UserModel.findOne({ userid });
      if (!user) {
        console.log("User Not Found:", userid);
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
  
      user.current_habits.push(habitid);
      await user.save();
  
      const habitParticipant = new HabitParticipationModel({
        userId: userid,
        habitId: habitid,
        join_date: new Date(startDate),
        status: "current",
        totalDays: noOfDays,
      });
      await habitParticipant.save();
      await habit.save();
  
      console.log("Habit Created Successfully:", habitid);
      return NextResponse.json(
        { message: "Habit created successfully" },
        { status: 201 }
      );
    } catch (err) {
      console.error("Error Creating Habit:", err);
      return NextResponse.json(
        { message: "Error creating habit", error: err },
        { status: 500 }
      );
    }
  }