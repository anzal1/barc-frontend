import React from 'react'

export const Navbar = ({
  extras,
  path
}: {
  extras: React.ReactNode[]
  path: string
}) => {
  return (
    <div className="flex justify-between items-center h-28 p-5 text-white bg-gradient-to-r from-white to-[#468CCC]">
      <img src="/assets/emblem.svg" className="w-60 h-16" alt="logo" />
      <div>
        {extras.map((extra, index) => (
          <div key={index} className="inline-block mx-2">
            {extra}
          </div>
        ))}
      </div>
    </div>
  )
}
