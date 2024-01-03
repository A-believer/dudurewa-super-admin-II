/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import Form from './components/todo-form'
import { Button } from '@/components/ui/button'
import { AddCircle, ClipboardText, ClipboardTick, Trash } from 'iconsax-react'
import { useAuth } from '@/lib/context/AuthContext'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase-config'
import toast from 'react-hot-toast'


export default function Todolist() {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const {todo, getTodoList} = useAuth() 

  const deleteTodo = async(id: string) => {
    try {
      await deleteDoc(doc(db, "Todos", id))
      getTodoList()

    } catch (error: any) {
      console.log(error.message)
    }
  }

  const updateTodoStatus = async (id: string) => {
    const todoRef = doc(db, "Todos", id)
    try {
      await updateDoc(todoRef, {
        status: true
      })
      getTodoList()
      toast.success("task completed!")
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className='w-full flex flex-col gap-y-5 py-6 relative'>
      
      <p className='text-3xl underline underline-offset-4'>My Todo List</p>
     
      {openForm && <Form close={() => setOpenForm(false)} />}

      <div className='border border-foreground/50 p-5 flex flex-col justify-center items-center gap-y-10 w-full rounded-2xl relative mt-5'>
        <Button
          variant={'outline'}
         className="flex items-center gap-x-2 text-lg border-[3px] border-orange py-5 px-4 w-fit ml-auto rounded-xl hover:bg-orange place-self-end"
          onClick={() => setOpenForm(prev => !prev)}>
          <AddCircle />
          <span>New Todo</span>
        </Button> 
        <div className='w-full space-y-5 min-h-[30vh]'>
          {todo.length > 0  ? todo?.map((item) => (
            <div key={item.id} className='flex items-center justify-between w-full p-3 bg-foreground/5 rounded-2xl'>
              <p>{item?.title}</p>

              <div className='flex items-center gap-x-2'>
                <Button variant={'ghost'} className='px-0' onClick={() => updateTodoStatus(item.id)}>{!item.status ? <ClipboardText className='text-gray-800'/> : <ClipboardTick className='text-green-500'/>}</Button>
                <Button variant={'ghost'} className='px-0' onClick={() => deleteTodo(item.id)}><Trash className='text-red-800 font-bold'/></Button>
              </div>
          </div>
          )) :
          <div className='flex justify-center items-center text-3xl h-[30vh]'>
            No tasks
        </div>
        }
        </div>  
      </div>

    </div>
  )
}
