import connecttodb from "@/db/db";
import ValidationModel from "@/db/models/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connecttodb();
    const data = await req.json();
    const pathParts = req.nextUrl.pathname.split('/');
    const userid = pathParts[pathParts.length - 1];

    const validate = new ValidationModel({
      habitid:data.habitid,
      userid: userid,
      progress: data.progress,
      date_of_validation: new Date(),
      proof_imgs: data.proof_imgs,
      validation_status: 'pending',
      validation_status_bool: false,
    });

    await validate.save();
    return NextResponse.json(
      { message: "Progress added" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err},
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connecttodb();
    const pathParts = req.nextUrl.pathname.split('/');
    const userid = pathParts[pathParts.length - 1];
    console.log(userid)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const myvalidation = await ValidationModel.findOne({
      userid: userid,
      date_of_validation: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!myvalidation) {
      return NextResponse.json(
        { message: "No progress found for today" },
        { status: 200 }
      );
    }

    return NextResponse.json(myvalidation, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err },
      { status: 400 }
    );
  }
}