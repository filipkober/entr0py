import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json()
    const {number} = body;

    if (typeof number !== "number") {
        return new Response("Podaj liczbę", {status: 400})
    }

    if (number === 46863) {
        return NextResponse.json({status: 'correct'})
    }

    if (number > 46863) {
        return NextResponse.json({status: 'lower'})
    }

    return NextResponse.json({status: 'higher'})
}