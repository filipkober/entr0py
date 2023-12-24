import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const body = await req.json();
    const { entropy, timeTaken, hintsUsed, completed, level_index } = body;

    let errors = [];
    entropy ?? errors.push("entropy");
    timeTaken ?? errors.push("timeTaken");
    hintsUsed ?? errors.push("hintsUsed");
    completed ?? errors.push("completed");
    level_index ?? errors.push("level_index");

    if (errors.length > 0) {
        return NextResponse.json({message: "Missing/wrong values: " + errors.join(", ")}, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            entropy
        }
    })
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
    if (!level) {
        return NextResponse.json({message: "Level not found"}, {status: 404})
    }

    if (level.completed) {
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
    
    return NextResponse.json({message: "Success!"})
}