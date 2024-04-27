import React from 'react'
import { NavType } from '../../enums/navtype'

export const Navbar = ({
  extras,
  path,
  navType
}: {
  extras: React.ReactNode[]
  path: string
  navType: NavType
}) => {
  return (
    <header
      className="flex justify-between items-center h-28 p-5 text-white sticky  top-0 z-[999]"
      style={{
        background:
          navType === NavType.FADED
            ? 'linear-gradient(90.34deg, #FFFFFF -0.16%, #468CCC 102.8%)'
            : 'linear-gradient(90.34deg, #75CDFF -0.16%, #468CCC 102.8%)'
      }}
    >
      <img src="/assets/emblem.svg" className="w-60 h-16" alt="logo" />
      <div>
        {extras.map((extra, index) => (
          <div key={index} className="inline-block mx-2">
            {extra}
          </div>
        ))}
      </div>
    </header>
  )
}
