/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { todoFormSchema } from "@/lib/schemas/formSchema";
import {zodResolver} from "@hookform/resolvers/zod"
import toast from "react-hot-toast";
import { CloseCircle } from "iconsax-react";
import { useFirestore } from "@/lib/context/FirestoreContext";
import { z } from "zod";

type TodoValues = z.infer<typeof todoFormSchema>

export default function Form({close }: {close: () => void}) {
    const {addTodoHandler, getTodoList} = useFirestore()
    const {register, handleSubmit,reset, formState: {errors}} = useForm<TodoValues>({
    resolver: zodResolver(todoFormSchema),
  })
    const onSubmit = async ({title, description}: TodoValues) => {
        try {
            if (title !== "" && description !== "") {
               await addTodoHandler(title, description)
            getTodoList()
                reset()
                close()
            toast.success("todo added") 
            }
            
        } catch (error: any) {
            console.log({error})
        } 
    }
  return (
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-[600px] w-full h-fit flex flex-col items-center justify-center gap-y-7 absolute left-0 bg-background border border-foreground/50 p-5 rounded-2xl z-30 text-sm'> 
          <CloseCircle className="absolute right-2 top-2" onClick={close}/>
          <h1 className="text-center text-2xl leading-8 text-orange font-semibold">New Todo</h1>
          
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="title" className="text-lg">Title</label>
              <input
                  type="text"
                  id="title"
                  {...register("title")}
                  className="py-4 pl-4 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4 capitalize"/>
              <span className="text-red-600">
                  {errors.title && errors.title.message}
              </span>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="description">Description</label>
              <textarea
                  id="description"
              rows={4}
                  {...register("description")}
                  className="py-4 px-4 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 active:border-4 resize-none"
              ></textarea>
              <span className="text-red-600">{errors.description && errors.description.message}</span>
          </div>
          <Button variant={'outline'} type="submit" className="text-lg border-4 border-orange py-5 px-4 w-fit mx-auto rounded-xl hover:bg-orange">Add </Button>
      </form>
  )
}
