import { Link } from "react-router-dom";
import { Container } from "./components/containers";
import { ArrowRight } from "iconsax-react";


export default function App() {
  return (
    <Container classname="h-[80vh] w-full">
        <h1 className='text-[35px]'>Hello <span className='text-orange'>Dudurewa 👋</span>,</h1>
      <p className='text-3xl text-center py-10'>Welcome to your <br /><span className='text-orange'>Super Admin</span></p>

    <Link to={`/onboarding`} className='text-2xl border-4 border-orange py-3 px-4 w-fit mx-auto rounded-2xl flex items-center gap-x-3'>
      Get started 😊 <ArrowRight size="32" color='#e15514'/> 
    </Link>
    </Container>
  )
}
