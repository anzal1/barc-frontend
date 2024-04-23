import React from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <Navbar path="/" extras={[]} />
      {children}
      <Footer isPathVisible={true} />
    </main>
  )
}

export default Layout
