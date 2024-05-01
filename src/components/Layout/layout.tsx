import React from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { NavType } from '../../enums/navtype'

const Layout = ({
  children,
  navType,
  extras = [],
  navPath = '',
  footerContent = <></>
}: {
  children: React.ReactNode
  navType: NavType
  extras?: React.ReactNode[]
  navPath?: string
  footerContent?: React.ReactNode
}) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar navType={navType} path={navPath} extras={extras} />

      <main className="flex-1 bg-[#C1C1C1]">{children}</main>
      <Footer footerContent={footerContent} />
    </div>
  )
}

export default Layout
