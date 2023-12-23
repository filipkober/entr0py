import { NextResponse } from "next/server";

export async function OPTIONS(req: Request){
    return NextResponse.json({odpowiedź: "StworzenIe krEDa portfEl karMić drzewO Siarka hIszpania projEktor poMidor doJrzały nErka prąD ElementarNy"}, {status: 200})
}