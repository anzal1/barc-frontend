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
      className="flex justify-center items-center h-[80px] p-2 text-white relative top-0 z-[999] print:hidden"
      style={{
        background:
          navType === NavType.FADED
            ? 'linear-gradient(90.34deg, #FFFFFF -0.16%, #468CCC 102.8%)'
            : 'linear-gradient(90.34deg, #75CDFF -0.16%, #468CCC 102.8%)'
      }}
    >
      {path && (
        <div className="absolute top-0 left-2 h-14 my-3 flex items-center justify-center border-l-4 border-white pl-2">
          <div className="text-2xl">{path}</div>
        </div>
      )}

      <Link to="/">
        <img src={emblem} className="w-60 h-16" alt="logo" />
      </Link>

      <div className="absolute flex items-center gap-2 right-0 top-0 justify-center h-[80px]">
        {extras.map((extra, index) => (
          <div key={index} className="inline-block">
            {extra}
          </div>
        ))}
      </div>
    </header>
  )
}
