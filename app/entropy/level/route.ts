import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const body = await req.json();
    const { entropy, timeTaken, hintsUsed, completed, level_index } = body;

    console.log(body)
    console.log("entropy: ", entropy)
    console.log("completed: ", completed)

    let errors = [];
    if (entropy === null || entropy === undefined) errors.push("entropy");
    if (Number.isNaN(timeTaken)) errors.push("timeTaken");
    if (Number.isNaN(hintsUsed)) errors.push("hintsUsed");
    if (completed === null || completed === undefined) errors.push("completed");
    if (Number.isNaN(level_index)) errors.push("level_index");

    if (errors.length > 0) {
        console.log("errors: ", errors)
        return NextResponse.json({message: "Missing/wrong values: " + errors.join(", ")}, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            entropy
        }
    })
    console.log("user: ", user)
    if (!user) {
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
    console.log("level: ", level)
    if (!level) {
        return NextResponse.json({message: "Level not found"}, {status: 404})
    }

    if (level.completed) {
        console.log("level already completed")
        return NextResponse.json({message: "Level already completed"}, {status: 400})
    }

    const updated = await prisma.level.update({
        where: {
            id: level.id
        },
        data: {
            timeTaken,
            hintsUsed,
            completed
        }
    })

    console.log(updated)

    return NextResponse.json({message: "Success!"})
}