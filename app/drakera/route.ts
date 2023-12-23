import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    if(!body.email) {
        return NextResponse.json({ message: 'No email provided'}, { status: 400 })
    }

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    sgMail.send({
        to: body.email,
        from: 'entr0py@nigdit.men',
        subject: 'Drake Era',
        text: '- .-- --- .--- / -.- --- -.. ---... / ---.. ---.. ---.. ..... ..... ...--',
    })

    return NextResponse.json({ message: 'Email sent' })
}