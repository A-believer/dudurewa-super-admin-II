/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFirestore } from "@/lib/context/FirestoreContext"
import { useEffect, useState } from "react"
import Form from "./components/order-form"
import { AddCircle } from "iconsax-react"
import { Button } from "@/components/ui/button"

export default function Order() {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const { order, getOrderList } = useFirestore()
  
  useEffect(() => {
getOrderList()
  }, [])

  return (
    <div className='w-full flex flex-col gap-y-5 py-4 relative h-full'>
     
      {openForm &&
        <div className="absolute xl:top-40 left-0 w-full flex justify-center items-center z-30">
          <Form close={() => setOpenForm(false)} />
          </div>}
      
      <div className="flex items-center justify-between">
         <p className='text-xl font-black uppercase'>My Orders</p>
        <Button
          variant={'outline'}
         className="flex items-center gap-x-2 md:text-base text-sm border-[3px] border-orange py-3 px-2 w-fit ml-auto rounded-xl hover:bg-orange"
          onClick={() => setOpenForm(prev => !prev)}>
          <AddCircle size={20}/>
          <span>New Order</span>
        </Button>
      </div>

      <ul className="flex justify-between items-center ">
        <li>
          <Button variant={"ghost"} className="text-lg font-bold uppercase rounded-xl underline decoration-4 underline-offset-4">All</Button>
        </li>
        <li>Pending</li>
        <li>Completed</li>
      </ul>

      <ul>
        {order?.map((item) => (
          <li key={item.id}>
            Hello
          </li>
        ))}
      </ul>
    </div>
  )
}
