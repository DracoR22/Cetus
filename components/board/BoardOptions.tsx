'use client'

import { MoreHorizontal, X } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useAction } from "@/hooks/use-action"
import { deleteBoard } from "@/actions/delete-board"
import { toast } from "sonner"

interface BoardOptionsProps {
    id: string
}

const BoardOptions = ({ id }: BoardOptionsProps) => {

  // GET THE ACTION FROM OUR SERVER ACTION AND DELETE THE BOARD
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
        toast.error(error)
    }
  })

  const onDelete = () => {
    execute({ id })
  }

  return (
    <Popover>
        <PopoverTrigger asChild>
          <Button className="h-auto w-auto p-2" variant="transparent">
             <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
         <div className="text-sm font-medium text-center text-neutral-600 pb-4">
            Board actions
         </div>
         <PopoverClose asChild>
             <Button variant="ghost" className="h-auto w-auto pb-2 absolute top-2 right-2 text-neutral-600">
                <X className="h-4 w-4"/>
             </Button>
         </PopoverClose>
         <Button disabled={isLoading} variant="ghost" onClick={onDelete} 
         className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
            Delete this board
         </Button>
        </PopoverContent>
    </Popover>
  )
}

export default BoardOptions