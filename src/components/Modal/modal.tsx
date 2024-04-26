export default function Modal({
  open,
  onClose,
  children
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors w-full h-full
        ${open ? 'visible bg-black/70' : 'invisible'}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
         rounded-xl shadow p-6 transition-all h-full w-full py-24 px-12 
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
      >
        {children}
      </div>
    </div>
  )
}
