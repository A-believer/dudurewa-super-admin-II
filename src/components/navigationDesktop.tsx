import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlignBottom, Calendar, Category, DollarSquare, Gift} from "iconsax-react";
import { usePathname } from "next/navigation";

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
  {id: 1, link: "/admin/dashboard", title: "Dashboard", icon: <Category/>},
  {id: 2, link: "/admin/expense", title: "Expenses", icon: <DollarSquare/>},
  {id: 3, link: "/admin/history", title: "History", icon: <AlignBottom/>},
  {id: 4, link: "/admin/order", title: "Orders", icon: <Gift/>},
  {id: 5, link: "/admin/todolist", title: "Todo List", icon:<Calendar/>},
]


const NavigationDesktop = () => {
    const router = usePathname()
    
    return(
  <motion.ul variants={variants} className="w-full flex flex-col items-center justify-center gap-y-10 text-center z-50 text-orange py-5">
    {navMenuItems.map((item) => (
        
      <motion.li
        className={`border-b-2 border-foreground py-2 px-7 mx-10 rounded-b-2xl hover:border-background hover:bg-orange hover:text-background ${router === item.link && "bg-orange text-background border-background"}`}
            key={item.id}
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
        <Link href={item.link} className={`w-full gap-x-4 flex items-center justify-center `}>
             <span>
                {item.icon}
            </span>
            <span>
                  {item.title}  
                </span>
                </Link>
    </motion.li>
    ))}
   
  </motion.ul>)
};

export default NavigationDesktop