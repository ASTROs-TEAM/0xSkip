import connecttodb from "@/db/db";
import UserSchema from "@/db/models/UserSchema";
import { NextRequest ,NextResponse} from "next/server";
import {v4} from 'uuid';

export async function POST(req: NextRequest) {
    try{
        await connecttodb();
        const id=v4();
        console.log(id);
        const {email,password,username,fullname,userid}= await req.json();
        const newuser= new UserSchema(
            {
              email,
              password,
              username,
              fullname,
              userid,
            //   current_habits
            }
        )
        await newuser.save();
        return NextResponse.json(
            { message: "user added" },
            { status: 200 }
          );

    }
    catch(err){
        return NextResponse.json(
                { message: "Error joining habit", error: err },
                { status: 500 }
              );
    }
}