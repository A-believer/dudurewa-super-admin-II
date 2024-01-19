/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { useFirestore } from "@/lib/context/FirestoreContext"
import { orderFormSchema } from "@/lib/schemas/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CloseCircle } from "iconsax-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"



type OrderValues = z.infer<typeof orderFormSchema>

export default function Form({close }: {close: () => void}) {
    const { addNewOrderHandler, getOrderList } = useFirestore()
     const form = useForm<OrderValues>({
    resolver: zodResolver(orderFormSchema),
     })
     
    const { register, handleSubmit, reset, formState: { errors } } = form
    
    const onSubmit = async ({
        customerName,
        shawarmaType,
        noOfWrap,
        location,
        customerContact,
        riderName,
        deliveryFee,
        deliveryOption,
        message
    }: OrderValues) => {
        try {
          await addNewOrderHandler(
            customerName,
        shawarmaType,
        noOfWrap,
        location,
        customerContact,
        riderName,
        deliveryFee,
        deliveryOption,
            message)
          
            console.log({
        customerName,
        shawarmaType,
        noOfWrap,
        location,
        customerContact,
        riderName,
        deliveryFee,
        deliveryOption,
        message
    })
        reset()
        close()
        getOrderList()
        toast.success("order created!!")
        } catch (error: any) {
            toast.error(error.message)
            console.log(error.message)
        }
        
    }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-[600px] w-full h-fit flex flex-col items-center justify-center gap-y-7 bg-background border border-foreground/50 p-5 rounded-2xl text-sm'>
          <CloseCircle className="absolute right-2 top-2" onClick={close}/>
           <h1 className="text-center text-[28px] leading-8 text-orange font-semibold">New Order</h1>
          
          {/* Customer Name  */}
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="customerName" className="text-sm font-bold">Customer Name</label>
              <input
                  type="text"
                  id="customerName"
                  {...register("customerName")}
                  className="p-2 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4"/>
              {errors.customerName && <span className="text-red-600">
                  {errors.customerName.message}
              </span>}
          </div>

          <div className="flex items-center justify-between gap-x-10 w-full">
              
            {/* shawarma type  */}
            <div className="flex flex-col gap-y-2 w-[50%]">
            <label htmlFor="shawarmaType" className="text-sm font-bold">Shawarma Type</label>
            <select
                className="bg-transparent p-2 outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4 rounded-xl"
                {...register("shawarmaType")}>
                <option 
                value="lite" className="bg-transparent text-background text-xs">
                 Lite
                </option>
                <option value="regular" className="bg-transparent text-background text-xs">
                 Regular
                </option>
                <option value="pro" className="bg-transparent text-background text-xs">
                 Pro
                </option>
            </select>
              {errors.shawarmaType && <span className="text-red-600">
                  {errors.shawarmaType.message}
              </span>}
              </div>

          {/* noOfWrap */}
          <div className="flex flex-col gap-y-2 w-[40%]">
          <label htmlFor="noOfWrap" className="text-sm font-bold">
            No of wraps
          </label>
              <input
                type="text"
                id="noOfWrap"
                {...register("noOfWrap")}
                className="p-2 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4 remove-arrow"/>
              {errors.noOfWrap && <span className="text-red-600">
                  {errors.noOfWrap.message}
              </span>}
            </div>
          </div>

          {/* location  */}
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="location" className="text-sm font-bold">Location</label>
              <textarea
                  rows={2}
                  id="location"
                  {...register("location")}
                  className="p-2 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4 resize-none"></textarea>
              {errors.location && <span className="text-red-600">
                  {errors.location.message}
              </span>}
          </div>

          {/* customer contact  */}
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="customerContact" className="text-sm font-bold">Customer Contact</label>
              <input
                  type="text"
                  id="customerContact"
                  {...register("customerContact")}
                  className="p-2 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4"/>
             {errors.customerContact &&  <span className="text-red-600">
                  {errors.customerContact.message}
              </span>}
          </div>

          {/* Delivery Option  */}
            <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="deliveryOption" className="text-sm font-bold">Delivery Option</label>
            <select
                className="bg-transparent p-2 outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4 rounded-xl"
                {...register("deliveryOption")}>
                <option 
                value="Drop Off" className="bg-transparent text-background text-xs">
                 Drop Off
                </option>
                <option value="Pick Up" className="bg-transparent text-background text-xs">
                 Pick Up
                </option>
            </select>
              {errors.deliveryOption && <span className="text-red-600">
                  {errors.deliveryOption.message}
              </span>}
              </div>

          <div className="flex items-center justify-between gap-x-10 w-full">
              
              {/* Rider Name  */}
              <div className="flex flex-col gap-y-2 w-[50%]">
            <label htmlFor="riderName" className="text-sm font-bold">Rider Name</label>
              <input
                  type="text"
                  id="riderName"
                  {...register("riderName")}
                  className="p-2 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4"/>
              {errors.riderName && <span className="text-red-600">
                  {errors.riderName.message}
              </span>}
              </div>
              

              {/* Delivery Fee  */}
              <div className="flex flex-col gap-y-2 w-[35%]">
                <label htmlFor="deliveryFee" className="text-sm font-bold">Delivery Fee</label>
                  <input
                  type="text"
                  id="deliveryFee"
                  {...register("deliveryFee")}
                  className="p-2 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4 remove-arrow"/>
              {errors.deliveryFee && <span className="text-red-600">
                  {errors.deliveryFee.message}
              </span>}
              </div>
              
          </div>

          {/* message  */}
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="location" className="text-sm font-bold">Message</label>
              <textarea
                  rows={2}
                  id="message"
                  {...register("message")}
                  className="p-2 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4 resize-none"></textarea>
              {errors.message && <span className="text-red-600">
                  {errors.message.message}
              </span>}
          </div>



          <Button variant={'outline'} type="submit" className="md:text-lg text-sm border-[3px] border-orange py-5 px-4 w-fit mx-auto rounded-xl hover:bg-orange">Create order</Button>
    </form>
  )
}
