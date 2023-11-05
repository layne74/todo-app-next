import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request) {
    const response = await request.json()
    const { content } = response;
    // console.log(content);

    const result = await prisma.todo.create({
        data: {
            content
        }
    });

    return NextResponse.json(result);

}
