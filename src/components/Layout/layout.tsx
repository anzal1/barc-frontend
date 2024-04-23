import React from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col  min-h-screen w-full">
      <Navbar path="/" extras={[]} />
      {children}
      <Footer isPathVisible={true} />
    </main>
  )
}

export default Layout
