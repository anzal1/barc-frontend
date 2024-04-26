import React from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col  h-screen w-full bg-[#C1C1C1] relative ">
      <Navbar path="/" extras={[]} />
      {children}
      <Footer isPathVisible={true} />
    </main>
  )
}

export default Layout
