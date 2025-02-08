import connecttodb from "@/db/db";
import HabitParticipationModel from "@/db/models/HabitParticipationSchema";
import ValidationModel from "@/db/models/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
      await connecttodb();
      const data = await req.json();
      
      const validate = new ValidationModel({
        habitid: data.habitid,
        userid: data.userid,
        progress: data.progress,
        date_of_validation: new Date(),
        proof_imgs : data.proof_imgs, 
        validation_status: 'pending',
        validation_status_bool: false,
      });
      
      await validate.save();

      await HabitParticipationModel.findOneAndUpdate({
        habitId: data.habitid,
        userId:  data.userid,
      }, {
        $inc: { daysChecked: 1}
      })
      return NextResponse.json(
        { message: "Progress added" },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { error: err},
        { status: 400 }
      );
    }
  }