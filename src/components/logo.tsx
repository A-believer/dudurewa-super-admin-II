import {motion} from "framer-motion"
import { logo } from "public/pngs"

export default function Logo() {
  return (
      <motion.div
      whileHover={{
    scale: 1.1
  }}
       className='bg-yellow rounded-b-full w-fit flex items-end justify-center border-2 border-orange'>
          <img src={logo} alt='dudurewa logo' className='md:w-[150px] w-[100px] h-[100px] object-cover'/>
    </motion.div>
  )
}
