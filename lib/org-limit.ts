import { auth } from "@clerk/nextjs"
import { db } from "./db"
import { MAX_FREE_BOARDS } from "@/constants/boards"

// INCREMENT COUNT EACH TIME AN ORGANIZATON CREATES A BOARD
export const incrementAvailableCount = async () => {
    const { orgId } = auth()

    if (!orgId) {
        throw new Error("Unauthorized")
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId }
    })

    // CHECK IF ORGANIZATION HAS CREATED A BOARD IF ITS TRUE WE UPDATE THE LIMIT BY 1 EACH TIME IT CREATES ONE
    if (orgLimit) {
        await db.orgLimit.update({
            where: { orgId },
            data: { count: orgLimit.count + 1}
        })
    } else {
        await db.orgLimit.create({
            data: { orgId, count: 1 }
        })
    }
}

// DECREASE COUNT EACH TIME AN ORGANIZATON DELETES A BOARD
export const decreaseAvailableCount = async () => {
    const { orgId } = auth()

    if (!orgId) {
        throw new Error("Unauthorized")
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId }
    })

    if (orgLimit) {
        await db.orgLimit.update({
            where: { orgId },
            data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0}
        })
    } else {
        await db.orgLimit.create({
            data: { orgId, count: 1 }
        })
    }
}

// CHECK IF THE ORGANIZATION RAN OUT OF FREE BOARDS
export const hasAvailableCount = async () => {
    const { orgId } = auth()

    if (!orgId) {
        throw new Error("Unauthorized")
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId }
    })

    if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
        return true
    } else {
        false
    }
}

// GET THE ORGANIZATION CURRENT FREE BOARDS CREATED
export const getAvailableCount = async () => {
    const { orgId } = auth()

    if (!orgId) {
         return 0
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId }
    })

    if (!orgLimit) {
        return 0
    }

    return orgLimit.count
}