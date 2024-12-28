import connecttodb from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
// const User
import HabitSchema from '@/';

export async function POST(req: NextRequest) {
    try{
        connecttodb();

    }
    catch(err){

    }

}

export async function GET(req: NextRequest) {
    try{
        connecttodb();
        const habits= await HabitSchema.find();
        return NextResponse.json({message:"Habits retrieved",habits:habits},{status:200});
    }
    catch(err){
        return NextResponse.json({message:"Error retrieving habits",error:err},{status:500});
    }

}