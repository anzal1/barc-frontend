import React from 'react'

export const Footer = ({
  footerContent
}: {
  footerContent: React.ReactNode
}) => {
  return (
    <footer>
      <div className="bg-gradient-to-r from-[#75CDFF] to-[#466BCC] flex justify-end items-center px-10 h-12 text-bold text-xl text-white w-full">
        {footerContent}
      </div>
    </footer>
  )
}
