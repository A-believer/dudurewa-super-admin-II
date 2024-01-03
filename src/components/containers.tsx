import { Footer, Logo, NavBar, NavBarDesktop } from "./";
import { ModeToggle } from "./mode-toggle"
import ProtectedRouteWrapper from "./protected-routes";

export  function AdminContainer({ children, classname }: { children: React.ReactNode; classname: string}) {
  return (
    <ProtectedRouteWrapper>
      <main className={`relative min-h-screen h-full max-w-[1520px] xl:w-full w-[90%] mx-auto flex xl:flex-row flex-col ${classname}`}>
      <NavBarDesktop/>
      <section className="xl:w-[80%]">
        <NavBar />
        {children}
      </section>
      <Footer/>
      <div className='fixed right-5 bottom-5 opacity-50 hover:opacity-100 z-50'>
          <ModeToggle/>
      </div>
    </main>
    </ProtectedRouteWrapper>
    
  )
}

export function Container({ children, classname }: { children: React.ReactNode; classname: string}) {
  return (
    <main className={`relative min-h-screen h-full max-w-[1520px] w-[90%] mx-auto`}>

      <div className="sticky top-0 left-2 w-full mx-auto z-[50] bg-background pb-2">
        <Logo/>
      </div>

      <section className={`flex flex-col items-center justify-center h-full ${classname}`}>
      {children}
      </section>

      <div className="sticky bottom-0 left-0 w-full mx-auto z-[50] bg-background">
        <Footer/>
      </div>
      
      <div className='fixed right-5 bottom-5 opacity-50 hover:opacity-100 z-50'>
          <ModeToggle/>
      </div>
    </main>
  )
}
