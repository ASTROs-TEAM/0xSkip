import connecttodb from "@/db/db";
import { NextResponse,NextRequest } from "next/server";
import UserModel from "@/db/models/UserSchema";

export async function GET(req: NextRequest) {
    try{
        await connecttodb();
        const pathParts = req.nextUrl.pathname.split('/');
        const userid = pathParts[pathParts.length - 1];
        const user= await UserModel.findOne({userid:userid});
        console.log(user);
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
