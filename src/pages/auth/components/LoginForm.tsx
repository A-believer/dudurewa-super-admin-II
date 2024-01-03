/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { loginFormSchema } from "../../../lib/schemas/formSchema";
import {yupResolver} from "@hookform/resolvers/yup"
import { useAuth } from "../../../lib/context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormData {
    email: string;
    password: string
}

export default function Form() {
    const { logIn } = useAuth()
    const navigate = useNavigate()
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
    resolver: yupResolver(loginFormSchema),
  })
    const onSubmit = async ({email, password}: FormData) => {
        try {
            await logIn(email, password);
            reset()
            navigate('/dashboard')
            toast.success("You're logged in!")
        } catch (error: any) {
            console.log({error})
        } 
    }
  return (
      <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full flex flex-col items-center justify-center gap-y-7'>
          <h1 className="text-center text-[28px] leading-8 text-orange font-semibold">Log In to your Super Admin</h1>
          
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="email" className="text-lg">Your Email</label>
              <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="py-4 pl-4 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 focus:border-4"/>
              <span className="text-red-600">
                  {errors.email && errors.email.message}
              </span>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="pasword">Your Password</label>
              <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="py-4 pl-4 rounded-xl bg-transparent outline-none focus:bg-transparent active:bg-transparent border-4 active:border-4"
              />
              <span className="text-red-600">{errors.password && errors.password.message}</span>
          </div>
          <Button variant={'outline'} type="submit" className="text-2xl border-4 border-orange py-5 px-4 w-fit mx-auto rounded-xl hover:bg-orange">Login</Button>
      </form>
  )
}
