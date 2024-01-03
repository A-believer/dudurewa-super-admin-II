import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const navMenuItems = [
  {id: 1, link: "/admin/dashboard", title: "Dashboard"},
  {id: 2, link: "/admin/expense", title: "Expenses"},
  {id: 3, link: "/admin/history", title: "History"},
  {id: 4, link: "/admin/order", title: "Orders"},
  {id: 5, link: "/admin/todolist", title: "Todo List"},
]


const Navigation = ({ toggle }: {toggle: () => void}) => {
  const { user, logOut } = useAuth()
  const router = useRouter()
    const routerLink = usePathname()


  const handleLogOut = async (e: any) => {
    e.preventDefault()
    try {
      await logOut()
     toggle
      router.push(`/auth/login`)
    } catch (error: any) {
      alert(error.message)
    }
  }
    
    return(
  <motion.ul variants={variants} className="absolute top-[108px] left-0 w-full bg-background flex flex-col items-stretch justify-center gap-y-10 text-center border border-foreground min-h-[75vh] rounded-2xl z-50 text-orange py-7 overflow-scroll">
    {navMenuItems.map((item) => (
        
      <motion.li
        className={`border-b-2 border-foreground py-2 px-4 mx-10 text-lg rounded-b-2xl hover:border-background hover:bg-orange hover:text-background ${routerLink === item.link && "bg-orange text-background border-background"}`}
        key={item.id}
            onClick={toggle}
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
        <Link href={item.link} className={`w-full gap-x-4 flex items-center justify-center`}>{item.title}</Link>
    </motion.li>
    ))}
    {user &&
          <motion.li
            onClick={toggle}
            variants={itemVariants}
          whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit mx-auto">
            <Button
              variant={"outline"} 
              className="w-full px-5 text-foreground border-4 border-orange hover:bg-orange hover:text-background hover:scale-105 transition-all duration-500 rounded-md"
              onClick={handleLogOut}>
              Logout
            </Button>
          </motion.li>}
        
    {!user &&
          <motion.li variants={itemVariants}
          whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }} className="w-fit mx-auto">
            <Link href={`/auth/login`} className="w-full px-5 text-foreground border-4 border-orange hover:bg-orange hover:text-background hover:scale-105 transition-all duration-500 rounded-md">Login</Link>
        </motion.li>}
  </motion.ul>)
};

export default Navigation