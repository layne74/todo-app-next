import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request, {params}) {
    const id = params.id;
    console.log(id);

    const post = await prisma.todo.delete({
        where: {id}
    });

    return NextResponse.json(post);
}

// update the completed status of a todo
export async function PUT(request, {params}) {
    const id = params.id;
    const completed = await request.json();
    const completedBoolean = completed.completed;
    // console.log(id);
    // console.log(completedBoolean);

    const todo = await prisma.todo.update({
        where: {id},
        data: {
            completed: completedBoolean
        }
    });

    return NextResponse.json(todo);
}



