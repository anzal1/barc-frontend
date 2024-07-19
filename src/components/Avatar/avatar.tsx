import { userState } from '../Atoms/user'
import Modal from '../Modal/modal'
import HoverTooltip from '../hoverTooltip'
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

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
			className="relative mx-2 flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 hover:bg-black/20"
		>
			<HoverTooltip
				showOnHover="Admin actions"
				element={
					<div className="text-black">
						<p className="mb-0 pb-0 text-xl font-bold">{user?.name}</p>
						<p className="-mt-1 pt-0 text-sm text-white">{user?.role?.role_Name}</p>
					</div>
				}
			/>

			<UserCircleIcon className="h-12 w-12 font-bold" />

			<Modal open={open} onClose={() => setOpen(false)} type="absolute">
				<div className="border-1-[#1C9FF6] relative right-[200px] top-6 mt-4 flex w-[300px] flex-col gap-6 rounded-[10px] border-2 bg-white p-4 shadow-lg">
					<XMarkIcon
						className="absolute right-2 top-2 mb-2 h-8 w-8 cursor-pointer invert filter"
						onClick={() => setOpen(false)}
					/>

					<Link to="/employee-master" className="flex w-full cursor-pointer items-center gap-2">
						<UserGroupIcon className="h-9 w-9 font-bold text-black" />
						<p className="text-xl text-[#1C9FF6]">Employee Master</p>
					</Link>
					<div className="flex w-full flex-col gap-2">
						<button
							onClick={handleLogout}
							className="h-10 w-full rounded-[10px] border-2 border-[#1C9FF6] bg-white text-xl text-[#1C9FF6]"
						>
							Logout
						</button>
					</div>
				</div>
			</Modal>
		</div>
	)
}
