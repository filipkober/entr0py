import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const levelNames = ["80808", "Hazard Duty Pay!", "Krystle", "Rainbow Six", "Hollywood Baby", "Western Union", "Toothless", "God Loves You", "Known For It", "Drake Era", "Out By 16, Dead on the Scene", "The Fear", "Tantor", "Deathcamp", "Burfict", "The 27 Club", "Free The Frail", "Today"]

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
        await prisma.level.create({
            data: {
                name: levelNames[i],
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