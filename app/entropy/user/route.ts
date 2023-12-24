import { levelNames } from "@/models/levelNames";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { entropy, favColor, favAnimal, favCrisis, name, whatWouldYouBe, deepestSecret } = body;
    if (!entropy || !favColor || !favAnimal || !favCrisis || !name || !whatWouldYouBe || !deepestSecret) {
        return NextResponse.json({message: "Missing fields"}, {status: 400})
    }
    const user = await prisma.user.create({
        data: {
            entropy
        }
    })
    await prisma.formAnswer.create({
        data: {
            favColor,
            favAnimal,
            favCrisis,
            name,
            whatWouldYouBe,
            deepestSecret,
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    for (let i = 0; i < 18; i++) {
        const levelName: string = levelNames[i] || "Unknown"
        await prisma.level.create({
            data: {
                name: levelName,
                level_index: i,
                user: {
                    connect: {
                        id: user.id
                    }
                },
                completed: false,
                hintsUsed: 0,
                timeTaken: 0
            }
        })
    }

    return NextResponse.json({message: "Success!"})
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const {userId, superadminpassword} = body;
    if (!userId || !superadminpassword) {
        return NextResponse.json({message: "Missing fields"}, {status: 400})
    }
    if (superadminpassword !== process.env.SUPERADMIN_PASSWORD) {
        return NextResponse.json({message: "Wrong password"}, {status: 401})
    }

    await prisma.level.deleteMany({
        where: {
            user: {
                id: userId
            }
        }
    })
    await prisma.formAnswer.delete({
        where: {
            userId
        }
    })
    await prisma.user.delete({
        where: {
            id: userId
        }
    })

    return NextResponse.json({message: "Success!"})
}