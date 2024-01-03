import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
      <footer className='xl:w-fit w-[95%] mx-auto xl:hidden flex flex-col items-center text-center italic text-xl md:py-5 py-3 md:px-10 px-0 font-bold rounded-2xl text-foreground/50 my-5'>
          <h2 className='animate-pulse'>Made with 💜 by <Link target='_blank' href={`https://davidabolade-portfolio.vercel.app/`} className='text-orange'>`<span className='underline underline-offset-4'>Nimi</span></Link></h2>
          <p className='text-base animate-pulse'>In partial fufillment of easing your life!✌️</p>
    </footer>
  )
}
