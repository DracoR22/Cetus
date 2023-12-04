'use client'

import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react"
import { Button } from "../ui/button"
import { Plus, X } from "lucide-react"
import FormTextarea from "../form/FormTextarea"
import FormSubmit from "../form/FormSubmit"
import { useParams } from "next/navigation"
import { useAction } from "@/hooks/use-action"
import { createCard } from "@/actions/create-card"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { toast } from "sonner"

interface CardFormProps {
    listId: string
    enableEditing: () => void
    disableEditing: () => void
    isEditing: boolean 
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({ listId, enableEditing, disableEditing, isEditing }, ref) => {

  const params = useParams()
  const formRef = useRef<ElementRef<"form">>(null)

  // GET THE ACTION FROM OUR SERVER ACTION
  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" created`)
      formRef.current?.reset()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  // CLOSE EDITING MODAL IF WE TYPE ESCAPE
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing()
    }
  }

  // CLOSE EDITING MODAL IF WE CLICK OUTSIDE
  useOnClickOutside(formRef, disableEditing)
  useEventListener("keydown", onKeyDown)

  // SUBMIT IF WE PRESS ENTER AND DONT SUMBIT IF WE HOLD THE SHIFT KEY
  const onTextAreakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  // SUBMIT THE FORM TO CREATE A CARD
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    const listId = formData.get("listId") as string
    const boardId = params.boardId as string

    execute({ title, listId, boardId })
  }

  // EDITING MODAL
  if (isEditing) {
    return (
        <form ref={formRef} action={onSubmit} className="m-1 py-0.5 px-1 space-y-4">
           <FormTextarea id="title" onKeyDown={onTextAreakeyDown} ref={ref} placeholder="Enter a title for this card..."
           errors={fieldErrors}/>
           <input onChange={() => {}} hidden id="listId" name="listId" value={listId}/>
           <div className="flex items-center gap-x-1">
             <FormSubmit variant="cetus">
                Add card
             </FormSubmit>
             <Button onClick={disableEditing} size="sm" variant="ghost">
                <X className="h-5 w-5"/>
             </Button>
           </div>
        </form>
    )
  }

  return (
    <div className="pt-2 px-2">
      <Button onClick={enableEditing} className="h-auto px-2 py-1.5 w-full justify-start
       text-muted-foreground text-sm" size="sm" variant="ghost">
        <Plus className="h-4 w-4 mr-2"/>
        Add a card
      </Button>
    </div>
  )
})

CardForm.displayName = "CardForm"

export default CardForm