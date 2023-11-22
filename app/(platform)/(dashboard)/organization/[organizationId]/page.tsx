import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'
import { db } from '@/lib/db'

const OrganizationIdPage = async () => {

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS!")
    },
    onError: (error) => {
      console.error(error)
    } 
  })

  const onSubmit = (formdata: FormData) => {
    const title = formdata.get("title") as string

    execute({ title })
  }

  return (
   <form action="">
     
   </form>
  )
}

export default OrganizationIdPage