/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NewOrderProps, useFirestore } from "@/lib/context/FirestoreContext"
import { useEffect, useState } from "react"
import Form from "./components/order-form"
import { AddCircle, Trash } from "iconsax-react"
import { Button } from "@/components/ui/button"
import { getDailyTotal, getShawarmaPrice } from "@/lib/helpers/orders"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase-config"
import toast from "react-hot-toast"

export default function Order() {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const { order, getOrderList, loadingOrder } = useFirestore()
  
  useEffect(() => {
getOrderList()
  }, [])

  const handleOrderDelete = async (orderId: string) => {
  
    // Delete order from "dailyOrders" collection
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const dailyOrdersRef = doc(db, "OrderHistory", dateString);

    try {
      const dailyOrdersDoc = await getDoc(dailyOrdersRef);

      if (dailyOrdersDoc.exists()) {
      
      const updatedOrders = dailyOrdersDoc.data().orders.filter((order: NewOrderProps) => order.id !== orderId);
      await updateDoc(dailyOrdersRef, { orders: updatedOrders });
      }
      getOrderList()
      toast.error("order deleted")
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div className='w-full flex flex-col gap-y-5 py-4 relative h-full min-h-[40vh]'>
     
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
          <AddCircle size={16}/>
          new order
        </Button>
      </div>

      <ul className="flex justify-between items-center border rounded-b-xl w-full px-2">
        <li>
          <Button variant={"ghost"} className="text-sm">all</Button>
        </li>
        <li><Button variant={"ghost"} className="text-sm">pending</Button></li>
        <li><Button variant={"ghost"} className="text-sm">completed</Button></li>
      </ul>

      <ul className="text-center border rounded-t-xl">
        <li className="flex items-center justify-between border-b-2 pb-1 pt-3 px-2 bg-foreground text-background rounded-t-xl">
          <span className="flex items-center gap-x-2">
            <i>S/N</i>
            <i>Name</i></span>
          <span><i>Package(unit)</i></span>
          <span className="flex items-center gap-x-2"><i>Price</i>  <Trash size={12}/></span>
        </li>

         {loadingOrder && 
          <li className='flex justify-center items-center text-3xl h-[30vh]'>
            Loading orders...
            </li>}
        {order.length > 0 && order?.map((item) => (
          <li key={item.id}>
            {item.orders.length > 0 ? item.orders.map((item: NewOrderProps, index: number) => (
              <div key={item.id} className={`flex items-center justify-between px-2 py-2 ${(index + 1) % 2 === 0 ? "bg-foreground/10" : ""}`}>
                <span className="flex items-center gap-x-4"><b>{index + 1}.</b> <b>{item.customerName}</b> </span>
                <span className="capitalize">{item.shawarmaType}({item.noOfWrap})</span>
                <span className="text-sm tracking-tighter flex items-center gap-x-2">{getShawarmaPrice(item.shawarmaType, Number(item.noOfWrap))} <Trash className="cursor-pointer" onClick={() => handleOrderDelete(item.id)} size={10} /></span>

              </div>  
            ))
              
          : 
              <div className={`flex justify-center items-center text-3xl h-[30vh]`}>No Order for Today</div>}
            
            {item.orders.length > 0 && 
              <div className="w-full flex items-center justify-end gap-x-3 px-2 pt-1 pb-2 border-t-4">
                <span className="text-2xl">Total:</span>
                <span className="underline decoration-double underline-offset-2 font-black text-lg">{getDailyTotal(item.orders)}</span>
            </div>
            }
          </li>
        )) }
      </ul>
    </div>
  )
}
