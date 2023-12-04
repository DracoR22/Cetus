'use client'

import { Plus, X } from "lucide-react"
import ListWrapper from "./ListWrapper"
import { ElementRef, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import FormInput from "../form/FormInput"
import { useParams, useRouter } from "next/navigation"
import FormSubmit from "../form/FormSubmit"
import { Button } from "../ui/button"
import { useAction } from "@/hooks/use-action"
import { createList } from "@/actions/create-list"
import { toast } from "sonner"

const ListForm = () => {

   const params = useParams()
   const router = useRouter()

   const formRef = useRef<ElementRef<"form">>(null)
   const inputRef = useRef<ElementRef<"input">>(null)

   const [isEditing, setIsEditing] = useState(false)

   const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
        inputRef.current?.focus()
    })
   }

   const disableEditing = () => {
     setIsEditing(false)
   }

   const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`)
      disableEditing()
      router.refresh()
    },
    onError(error) {
      toast.error(error)
    },
   })

   // DISABLE EDITING WHEN ESCAPE KEY IS PRESSED
   const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
        disableEditing()
    }
   }

   useEventListener("keydown", onKeyDown)
   useOnClickOutside(formRef, disableEditing)

   const onSubmit = async (formData: FormData) => {
     const title = formData.get("title") as string
     const boardId = formData.get("boardId") as string

     execute({
      title,
      // WE GET BOARDID FROM THE INPUT WITH THE PARAMS
      boardId
     })
   }

   if (isEditing) {
    return (
        <ListWrapper>
            <form action={onSubmit} ref={formRef} className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
              <FormInput errors={fieldErrors} ref={inputRef} id="title"className="text-sm px-3 py-1 h-7 font-medium
              border-transparent hover:border-input focus:border-input transition"
              placeholder="Enter list title..."/>
              <input onChange={() => {}}
               hidden value={params.boardId} name="boardId"/>
              <div className="flex items-center gap-x-1">
                <FormSubmit variant="cetus" >
                    Add list
                </FormSubmit>
                <Button onClick={disableEditing} size="sm" variant="ghost">
                    <X className="h-5 w-5"/>
                </Button>
              </div>
            </form>
        </ListWrapper>
    )
   }

  return (
    <ListWrapper>
          <button onClick={enableEditing} className="w-full rounded-md bg-white/80 hover:bg-white/50 transition 
          p-3 flex items-center font-medium text-sm">
            <Plus className="h-4 w-4 mr-2"/>
            Add a list
          </button>
    </ListWrapper>
  )
}

export default ListForm