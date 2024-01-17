/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Form from './components/todo-form'
import { Button } from '@/components/ui/button'
import { AddCircle, ClipboardText, ClipboardTick, Trash } from 'iconsax-react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase-config'
import toast from 'react-hot-toast'
import { useFirestore } from '@/lib/context/FirestoreContext'


export default function Todolist() {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const {todo, getTodoList, loadingTodo} = useFirestore() 

  const deleteTodo = async(id: string) => {
    try {
      await deleteDoc(doc(db, "Todos", id))
      toast.error('todo deleted')
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
      
      toast.success("todo completed!")
      getTodoList()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getTodoList()
  }, [])

  return (
    <div className='w-full flex flex-col gap-y-5 py-6 relative justify-center '>
      
      <p className='text-xl font-black uppercase'>My Todo List</p>
     
      {openForm &&
        <div className='absolute top-0 left-0 bg-black/10 flex items-center justify-center w-full h-full'>
          <Form close={() => setOpenForm(false)} />
        </div>
        }

      <div className='max-w-[600px] mx-auto border border-foreground/50 p-5 flex flex-col justify-center items-center gap-y-10 w-full rounded-2xl relative mt-5'>
        <Button
          variant={'outline'}
         className="flex items-center gap-x-2 md:text-lg text-sm border-[3px] border-orange py-5 px-4 w-fit ml-auto rounded-xl hover:bg-orange place-self-end"
          onClick={() => setOpenForm(prev => !prev)}>
          <AddCircle />
          <span>New Todo</span>
        </Button> 


        <div className='w-full space-y-5 min-h-[30vh]'>

          {loadingTodo && 
          <div className='flex justify-center items-center text-3xl h-[30vh]'>
            Loading Todos...
            </div>}
          
          {todo.length > 0 &&
            todo?.map((item) => (
              <div key={item.id} className='w-full flex items-center justify-between gap-x-10 p-3 bg-foreground/5 rounded-2xl'>
                
              <p className='text-foreground/90 w-[80%] text-wrap' >
                    {item?.todo}
              </p>
                  
               <div className='flex items-center gap-x-2 self-start'>
                <Button variant={'ghost'} className='px-0' onClick={() => updateTodoStatus(item.id)}>{!item.status ? <ClipboardText className='text-gray-500' /> : <ClipboardTick className='text-green-500' />}</Button>
                <Button variant={'ghost'} className='px-0' onClick={() => deleteTodo(item.id)}><Trash className='text-red-800 font-bold' /></Button>
              
              </div>

              
            </div>
          ))}
          {todo?.length === 0 &&
            <div className={`flex justify-center items-center text-3xl h-[30vh] ${loadingTodo && 'hidden'}`}>
            No tasks
        </div>
        }
        </div>  
      </div>

    </div>
  )
}
