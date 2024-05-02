import { useState } from 'react'
import Modal from '../Modal/modal'
import { useRecoilValue } from 'recoil'
import { userState } from '../Atoms/user'
import { Link } from 'react-router-dom'

import avatar from '../../assets/avatar.svg'
import cancel from '../../assets/cancel.svg'
import report from '../../assets/report.svg'
import employee from '../../assets/employee.svg'

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
    <div className="relative">
      <img
        className="cursor-pointer w-12 h-12"
        src={avatar}
        onClick={() => setOpen(!open)}
      />
      <Modal open={open} onClose={() => setOpen(false)} type="absolute">
        <div className="flex flex-col gap-6 w-[300px] right-[300px] top-9 relative bg-white border-1-[#1C9FF6] border-2 rounded-[10px] p-4 shadow-lg">
          <img
            src={cancel}
            alt="close"
            className="absolute top-2 right-2 cursor-pointer w-6 h-6 filter invert"
            onClick={() => setOpen(false)}
          />
          <div className="text-black">
            <p className="text-xl font-bold">{user?.name}</p>
            <p className="text-sm text-[#1C9FF6]">{user?.role?.role_Name}</p>
          </div>
          {/* add routes here */}
          <Link
            to="/device-reports"
            className="flex gap-2 items-center w-full cursor-pointer"
          >
            <img src={report} alt="device-reports" />
            <p className="text-[#1C9FF6] text-xl">Device Reports</p>
          </Link>

          <Link
            to="/employee-master"
            className="flex gap-2 items-center w-full cursor-pointer"
          >
            <img src={employee} alt="employee-master" />
            <p className="text-[#1C9FF6] text-xl">Employee Master</p>
          </Link>
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={handleLogout}
              className="bg-white text-[#1C9FF6]  rounded-[10px] w-full border-2 border-[#1C9FF6] text-xl h-10"
            >
              Logout
            </button>
            {/* <button className="bg-[#1C9FF6] text-white rounded-[10px] w-full text-xl h-10">
              Show Live Activity
            </button> */}
          </div>
        </div>
      </Modal>
    </div>
  )
}
