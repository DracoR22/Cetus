import { auth } from "@clerk/nextjs"
import { db } from "./db"

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return false
  }

  // CHECK IF ORGANIZATION IS SUBSCRIBED
  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
        orgId
    },
    select: {
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true
    }
  })

  if (!orgSubscription) {
    return false
  }

  // CHECK IF SUBSCRIPTION IS NOT EXPIRED
  const isValid = orgSubscription.stripePriceId && orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid
}