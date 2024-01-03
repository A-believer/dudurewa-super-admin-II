"use client"
import React from 'react'
import { motion, useCycle } from "framer-motion"
import { Footer, Logo } from './index'
import Link from 'next/link'
import NavigationDesktop from './navigationDesktop';
import { useAuth } from '@/lib/context/AuthContext'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Logout } from 'iconsax-react'


export default function NavBarDesktop() {
    const { user, logOut } = useAuth()
     const router = useRouter()

  const handleLogOut = async (e: any) => {
    e.preventDefault()
    try {
      await logOut()
      router.push(`/auth/login`)
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
      <header className=' xl:flex hidden flex-col justify-between items-center  max-w-[20%] w-full mx-auto z-50 bg-background border-r-2 h-screen pb-5'>
          <Link href={`/`}
          >
              <Logo />
      </Link>
      
          <motion.nav
              className='xl:flex flex-col hidden z-50'>
        
        <NavigationDesktop/>
          </motion.nav>

          <hr  className='mx-4 text-orange border-0 h-2'/>

          <div className='flex flex-col gap-y-5'>
               {user &&
          
            <Button
              variant={"outline"} 
              className="w-full px-5 text-foreground border-4 border-orange hover:bg-orange hover:text-background hover:scale-105 transition-all duration-500 rounded-md flex items-center gap-x-4"
                        onClick={handleLogOut}>
                        <Logout/>Logout
            </Button>}
 
              
               <h2 className='w-full mx-auto text-center '>Made with 💜 by <br />  <Link target='_blank' href={`https://davidabolade-portfolio.vercel.app/`} className='text-orange'>`<span className='underline underline-offset-4'>Nimi</span></Link></h2>
          </div>

        
         
    </header>
  )
}
