import React from 'react'

export const CustomCard = ({
  header,
  children
}: {
  header: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-3xl overflow-hidden gap-4 h-full w-full print:shadow-none print:gap-0">
      <div className="p-6 text-2xl font-bold text-white bg-[#1C9FF6] h-20 print:hidden">
        {header}
      </div>
      <div className="p-6 justify-center items-center w-full h-full print:p-0">
        {children}
      </div>
    </div>
  )
}
