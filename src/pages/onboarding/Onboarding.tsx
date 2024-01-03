

// Photos from https://citizenofnowhe.re/lines-of-the-city
import {
  Variants,
  motion} from "framer-motion";
import { onboardingCardData } from "../../lib/data";
import { Link } from "react-router-dom";

const cardVariants: Variants = {
  offscreen: {
    y: 450,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};
    


export default function Onboarding() {

  function Card({ src, tag, info, description, key }: { src: string; tag: string; info: string; description: string; key: number;  index: number}) {  
  return (
       <motion.div
             initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className="relative overflow-hidden xl:w-[500px] w-full h-[450px] mx-auto my-5 rounded-xl z-10"
            key={key}>
      
          <img src={src} alt="image" className="w-full h-full object-cover object-center z-10"/>
      <motion.div
        variants={cardVariants}
        className="absolute top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center text-white text-center bg-black/10">
            <div className="bg-black/50 w-full h-full relative flex flex-col items-center justify-center gap-y-4 text-center">
              <h2 className="absolute top-9 right-9 text-4xl font-black tracking-wider">{tag}</h2>
            <p className="text-orange text-3xl font-black w-[95%] italic hover:underline underline-offset-4transition-all duration-500 tracking-wider capitalize">{info}</p>
            <p className="w-[90%] tracking-wider">{description}</p>
            </div>
            
          </motion.div>
    </motion.div>
  )
}

  return (
    <div className="xl:py-10 py-5 space-y-10 pb-10 w-fit  overflow-scroll no-scrollbar relative max-w-[1520px] mx-auto min-h-screen h-full selection:text-orange selection:bg-foreground flex flex-col">
        {onboardingCardData?.map((item, i) => (
            <Card
                key={item.id}
                index={i}
            src={item?.imageSrc}
            tag={item?.tag}
            info={item?.info}
            description={item?.description} />
      ))}

      <p className="w-full text-center flex items-center justify-center gap-x-4 text-2xl underline underline-offset-4"><span>Ready for the fun? Let`s go!😊</span></p>

      <div className="flex flex-col gap-y-5 items-center justify-center w-full">
        <Link to={`/auth/login`} className='text-2xl border-4 border-orange py-3 px-4 w-fit mx-auto rounded-2xl flex items-center gap-x-3'>Click here to Login</Link>
        <p className="flex gap-x-4 items-center justify-center text-2xl">OR</p>
        <Link to={`/auth/register`} className='text-2xl border-4 border-orange py-3 px-4 w-fit mx-auto rounded-2xl flex items-center gap-x-3'>Click here to Register</Link>
      </div>
      
    </div>
  );
}
