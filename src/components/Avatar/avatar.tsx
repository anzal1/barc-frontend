import { useState } from 'react'
import Modal from '../Modal/modal'
import { useRecoilValue } from 'recoil'
import { userState } from '../Atoms/user'
import { Link } from 'react-router-dom'

import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import HoverTooltip from '../hoverTooltip'

export const AvatarTooltip = () => {
  const [open, setOpen] = useState(false)
  const user: any = useRecoilValue(userState)

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userToken')
    localStorage.removeItem('role')
    window.location.href = '/login'
  }

  return (
    <div
      onClick={() => setOpen(!open)}
      className="relative flex items-center justify-center gap-2 px-2 mx-2 py-1 hover:bg-black/20 rounded-md cursor-pointer"
    >
      <HoverTooltip
        showOnHover="Admin actions"
        element={
          <div className="text-black">
            <p className="text-xl font-bold mb-0 pb-0">{user?.name}</p>
            <p className="text-sm text-white -mt-1 pt-0">
              {user?.role?.role_Name}
            </p>
          </div>
        }
      />

      <UserCircleIcon className="h-12 w-12 font-bold" />

      <Modal open={open} onClose={() => setOpen(false)} type="absolute">
        <div className="mt-4 flex flex-col gap-6 w-[300px] right-[200px] top-6 relative bg-white border-1-[#1C9FF6] border-2 rounded-[10px] p-4 shadow-lg">
          <XMarkIcon
            className="absolute top-2 right-2 cursor-pointer w-8 h-8 filter invert mb-2"
            onClick={() => setOpen(false)}
          />

          <Link
            to="/device-reports"
            className="flex gap-2 items-center w-full cursor-pointer"
          >
            <ClipboardDocumentListIcon className="w-9 h-9 font-bold text-black" />
            <p className="text-[#1C9FF6] text-xl">Device Reports</p>
          </Link>

          <Link
            to="/employee-master"
            className="flex gap-2 items-center w-full cursor-pointer"
          >
            <UserGroupIcon className="w-9 h-9 font-bold text-black" />
            <p className="text-[#1C9FF6] text-xl">Employee Master</p>
          </Link>
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={handleLogout}
              className="bg-white text-[#1C9FF6]  rounded-[10px] w-full border-2 border-[#1C9FF6] text-xl h-10"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
