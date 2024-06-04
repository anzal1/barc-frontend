import React from 'react'
import { NavType } from '../../enums/navtype'
import { Link } from 'react-router-dom'
import emblem from '../../assets/emblem.svg'

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
      className="flex justify-between items-center h-[80px] p-2 text-white sticky  top-0 z-[999]"
      style={{
        background:
          navType === NavType.FADED
            ? 'linear-gradient(90.34deg, #FFFFFF -0.16%, #468CCC 102.8%)'
            : 'linear-gradient(90.34deg, #75CDFF -0.16%, #468CCC 102.8%)'
      }}
    >
      <div className="flex items-center gap-4 cursor-pointer">
        <Link to={'/'}>
          <img src={emblem} className="w-60 h-16" alt="logo" />
        </Link>
        {path && (
          <>
            <div className=" h-16  border-l-4 border-white" />
            <div className="text-2xl">{path}</div>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        {extras.map((extra, index) => (
          <div key={index} className="inline-block mx-2">
            {extra}
          </div>
        ))}
      </div>
    </header>
  )
}
