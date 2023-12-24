import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const body = await req.json();
    const { entropy, timeTaken, hintsUsed, completed, level_index } = body;
    console.log(body)
    if (!entropy || !timeTaken || !hintsUsed || !completed || !level_index) {
        console.log("Missing fields")
        return NextResponse.json({message: "Missing fields"}, {status: 400})
    }

    const user = await prisma.user.findUnique({
        where: {
            entropy
        }
    })
    if (!user) {
        console.log("No user: " + entropy)
        return NextResponse.json({message: "User not found"}, {status: 404})
    }

    const level = await prisma.level.findFirst({
        where: {
            user: {
                entropy
            },
            level_index
        }
    })
    if (!level) {
        console.log("No level: " + level_index)
        return NextResponse.json({message: "Level not found"}, {status: 404})
    }

    if (level.completed) {
        console.log("Level already completed")
        return NextResponse.json({message: "Level already completed"}, {status: 400})
    }

    await prisma.level.update({
        where: {
            id: level.id
        },
        data: {
            timeTaken,
            hintsUsed,
            completed
        }
    })

    return NextResponse.json({message: "Success!"})
}