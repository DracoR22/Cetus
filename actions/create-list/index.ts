'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateList } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if(!userId || !orgId) {
        return {
            error: 'Unauthorized'
        }
    }

    // THIS IS REQ BODY
    const { title, boardId } = data
    let list

    try {
        // FIND THE BOARD
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            }
        })

        if (!board) {
            return {
                error: "Board not found"
            }
        }
     
        // FIND THE LAST LIST IN OUR ORDER
        const lastList = await db.list.findFirst({
            where: {
                boardId 
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            }
        })

        // THIS IS THE ORDER OF EACH LIST CREATED
        const newOrder = lastList ? lastList.order + 1 : 1

        // CREATE THE LIST
        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder
            }
        })
    } catch (error) {
        return {
            error: "Failed to create."
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list }
}

export const createList = createSafeAction(CreateList, handler)