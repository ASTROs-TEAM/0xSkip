import connecttodb from "@/db/db";
import { NextResponse,NextRequest } from "next/server";
import UserModel from "@/db/models/UserSchema";
import HabitModel from "@/db/models/HabitSchema";
import HabitParticipationModel from "@/db/models/HabitParticipationSchema";

export async function GET(req: NextRequest) {
    try{
        await connecttodb();
        const pathParts = req.nextUrl.pathname.split('/');
        const userid = pathParts[pathParts.length - 1];
        const user= await UserModel.findOne({userid:userid});
        if(user){
            return NextResponse.json(
                { message: "User data retrieved", user:user },
                { status: 200 }
              );
        }
        else{
            return NextResponse.json(
                { message: "User not found" },
                { status: 500 }
              ); 
        }
    }
    catch(err){
        return NextResponse.json(
            { message: "Error finding user", error:err },
            { status: 500 }
          );
    }
}

export async function PATCH(req: NextRequest) {
    try {
      await connecttodb();
      const pathParts = req.nextUrl.pathname.split('/');
        const userid = pathParts[pathParts.length - 1];
      const { habitid, join_date } = await req.json();
  
      const habit = await HabitModel.findOne({ habitid });
      if (!habit) {
        return NextResponse.json(
          { message: "Habit not found" },
          { status: 404 }
        );
      }
  
      const userJoinDate = new Date(join_date || Date.now());
      if (userJoinDate >= habit.startDate) {
        return NextResponse.json(
          { message: "You cannot join the habit after its start date" },
          { status: 400 }
        );
      }
  
      habit.participants.push(userid);
      await habit.save();
  
      const user = await UserModel.findOne({ userid });
      if (!user) {
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
        join_date: userJoinDate,
        status: "current",
        totalDays: habit.noOfDays,
      });
      await habitParticipant.save();
  
      return NextResponse.json(
        { message: "Habit joined successfully", habit },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Error joining habit", error: err },
        { status: 500 }
      );
    }
  }
  