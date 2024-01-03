
export  function AuthContainer({children} : {children: React.ReactNode}) {
  return (
    <main>
      {children}
    </main>
  )
}

export  function AdminContainer({children} : {children: React.ReactNode}) {
  return (
    <main className="mon-h-screen">
      {children}
    </main>
  )
}

export  function Container({children} : {children: React.ReactNode}) {
  return (
    <main className="min-h-screen max-w-[1520px] w-[90%] flex flex-col gap-y-10 items-center justify-center mx-auto">
      {children}
    </main>
  )
}
