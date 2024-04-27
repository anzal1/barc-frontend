import React from 'react'

export const Footer = ({
  footerContent
}: {
  footerContent: React.ReactNode
}) => {
  return (
    <footer className="flex justify-center items-center h-20 text-white bg-gradient-to-r from-[#75CDFF] to-[#466BCC]">
      {footerContent}
      <div className="flex justify-center items-center h-20 text-white bg-gradient-to-r from-[#75CDFF] to-[#466BCC] w-full"></div>
    </footer>
  )
}
