import { SubscriptionButton } from "@/components/SubscriptionButton"
import Info from "@/components/organization/Info"
import { Separator } from "@/components/ui/separator"
import { checkSubscription } from "@/lib/subscription"

const BillingPage = async () => {

 const isPro = await checkSubscription()

  return (
    <div className="w-full">
       <Info isPro={isPro}/>
       <Separator className="my-2"/>
       <SubscriptionButton isPro={isPro}/> 
    </div>
  )
}

export default BillingPage