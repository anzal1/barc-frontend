import React from 'react'

export const Footer = ({
  footerContent
}: {
  footerContent: React.ReactNode
}) => {
  return (
    <footer>
      <div className="bg-gradient-to-r from-[#75CDFF] to-[#466BCC] flex justify-end items-center px-10 h-20 text-bold text-xl  w-full">
        {footerContent}
      </div>
    </footer>
  )
}
