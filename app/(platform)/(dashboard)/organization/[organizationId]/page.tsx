import BoardList from "@/components/organization/BoardList"
import Info from "@/components/organization/Info"
import { Separator } from "@/components/ui/separator"
import { checkSubscription } from "@/lib/subscription"
import { Suspense } from "react"

const OrganizationIdPage = async () => {

  const isPro = await checkSubscription()

  return (
   <div className="w-full mb-20">
     <Info isPro={isPro}/>
     <Separator className="my-4"/>
     <div className="px-2 md:px-4">
      <Suspense fallback={<BoardList.Skeleton/>}>
        <BoardList/>
      </Suspense>
     </div>
   </div>
  )
}

export default OrganizationIdPage