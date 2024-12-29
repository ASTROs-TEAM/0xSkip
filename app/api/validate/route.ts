import connecttodb from "@/db/db";
import ValidationModel from "@/db/models/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
      await connecttodb();
    
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
  
      const data = await req.json();
  
      const habit = await ValidationModel.findOne({
        habitid: data.habitid,
        date_of_validation: { $gte: startOfDay, $lte: endOfDay },
        userid: data.userid,
      });
  
      if (!habit) {
        return NextResponse.json(
          { message: "Habit not found for the given date and user" },
          { status: 404 }
        );
      }
  
      if (!habit.validated_by.includes(data.validatorUserId)) {
        habit.validated_by.push(data.validatorUserId);
  
        if (habit.validated_by.length === 2) {
          habit.validation_status = "partial";
        } else if (habit.validated_by.length === 3) {
          habit.validation_status = "validated";
          habit.validation_status_bool = true;
        }
  
        await habit.save(); 
        return NextResponse.json(
          { message: "Habit validated successfully", habit },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "User has already validated this habit" },
          { status: 400 }
        );
      }
    } catch (err) {
      return NextResponse.json(
        { message: "Error validating habit", error: err },
        { status: 500 }
      );
    }
  }