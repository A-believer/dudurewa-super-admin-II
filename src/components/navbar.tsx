import { useRef } from "react";
import { motion, useCycle } from "framer-motion"
import { Logo } from './'
import { useDimensions } from '@/lib/use-dimensions';
import Navigation from './navigation';
import MenuToggle from './menu-toggle';
import { Link } from "react-router-dom";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export default function NavBar() {
     const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  return (
    <header className='sticky xl:hidden block top-0 left-0  max-w-full mx-auto h-full z-50 bg-background pb-2'>
      <div className="w-[95%] mx-auto xl:hidden flex justify-between items-center">
        <Link to={`/`}>
              <Logo />
      </Link>
      

          <motion.nav
                  className='xl:hidden flex z-50'
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className="absolute top-0 right-0 w-[300px] bg-background" variants={sidebar} />
              <MenuToggle toggle={() => toggleOpen()} />
              {isOpen && <Navigation toggle={() => toggleOpen()}/>}
    </motion.nav>
      </div>
          
    </header>
  )
}
