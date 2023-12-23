import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const pswd = body.password;
    if (pswd === process.env.ADMIN_PASSWORD){
        return NextResponse.json({token: process.env.ADMIN_TOKEN});
    } else {
        return NextResponse.json({message: "W R O N G"}, {status: 401})
    }
}