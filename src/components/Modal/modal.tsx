import { twMerge } from 'tailwind-merge'

export default function Modal({
  open,
  type = 'fixed',
  onClose,
  children,
  modalStyle = ''
}: {
  type: 'fixed' | 'absolute' | 'relative'
  open: boolean
  onClose: () => void
  children: React.ReactNode
  modalStyle?: string
}) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      className={twMerge(`
        ${type} inset-0 flex justify-center items-center transition-colors w-full h-full rounded-xl bg-black/50
      `)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge(`
         rounded-xl shadow p-6 transition-all h-full w-full 
          ${modalStyle}
        `)}
      >
        {children}
      </div>
    </div>
  )
}
