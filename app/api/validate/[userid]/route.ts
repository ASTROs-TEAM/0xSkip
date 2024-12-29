import connecttodb from "@/db/db";
import ValidationModel from "@/db/models/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    await connecttodb();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const pathParts = req.nextUrl.pathname.split('/');
        const userid = pathParts[pathParts.length - 1];

    const habitvalidate = await ValidationModel.find({
      date_of_validation: { $gte: startOfDay, $lte: endOfDay },
      userid: { $ne: userid },
      validation_status: { $ne: "validated" },
    });
    if(!habitvalidate){
      return NextResponse.json(
        { message: "No habits" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Fetched habits successfully", data: habitvalidate },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching habits", error: err },
      { status: 500 }
    );
  }
}
