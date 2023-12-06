'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { DeleteBoard } from "./schema"
import { redirect } from "next/navigation"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { decreaseAvailableCount } from "@/lib/org-limit"
import { checkSubscription } from "@/lib/subscription"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if(!userId || !orgId) {
        return {
            error: 'Unauthorized'
        }
    }

    const isPro = await checkSubscription()

    // THIS IS REQ BODY
    const { id } = data
    let board

    try {
        board = await db.board.delete({
            where: {
                id,
                orgId
            },
        })

        // DECREASE THE LIMIT OF FREE BOARDS REMAINING IF A BOARD IS DELETED
        if (!isPro) {
            await decreaseAvailableCount()
        }

         // CREATE A NEW ACTIVITY LOG
         await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE,
          })
    } catch (error) {
        return {
            error: "Failed to delete."
        }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)