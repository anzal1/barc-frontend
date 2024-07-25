import { useGetDeviceMasterListQuery } from './Api'
import { userState } from './Atoms/user'
import { AvatarTooltip } from './Avatar/avatar'
import Modal from './Modal/modal'
import Table from './Table'
import HoverTooltip from './hoverTooltip'
import CameraIcon from '@heroicons/react/24/outline/CameraIcon'
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import ListBulletIcon from '@heroicons/react/24/outline/ListBulletIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { MouseEventHandler, ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const ShowCamera = () => {
	const [open, setOpen] = useState(false)
	const user = useRecoilValue(userState)
	const { data } = useGetDeviceMasterListQuery((user?.role as any)?.roleID)

	if (!user.role || (user.role as any).role_Name !== 'BranchAdmin') return null
	return (
		<>
			<HoverTooltip
				showOnHover="Camera Status"
				element={
					<div className="cursor-pointer" onClick={() => setOpen(true)}>
						<CameraIcon className="h-8 w-8 font-bold text-white" />
					</div>
				}
			/>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				type="relative"
				modalStyle="absolute bg-white p-3 top-8 w-[500px] -right-64 rounded-lg shadow-lg h-min max-h-[500px] overflow-y-auto"
			>
				<div className="flex w-full items-center justify-between">
					<div className="text-base font-semibold text-black">Camera Status</div>
					<XMarkIcon onClick={() => setOpen(false)} className="h-8 w-8 cursor-pointer text-black" />
				</div>

				{!data ? (
					<div className="flex h-64 items-center justify-center text-black">Loading...</div>
				) : (
					<Table
						compact
						data={data as any}
						rootClassName="p-0 px-0 py-0 min-h-64"
						columns={[
							{ key: 'deviceName', title: 'deviceName' },
							{ key: 'location', title: 'location' },
							{ key: 'camereIp', title: 'camereIp' },
							{ key: 'status', title: 'status' }
						]}
					/>
				)}
			</Modal>
		</>
	)
}

const HeaderExtraRight = () => {
	const user = useRecoilValue(userState)

	return (
		<div className="flex items-center gap-2">
			<ShowCamera />

			{user.role && (user.role as any).role_Name === 'BranchAdmin' ? (
				<HoverTooltip
					showOnHover="Device Master"
					element={
						<Link to="/device-master">
							<ListBulletIcon className="h-9 w-9 font-bold text-white" />
						</Link>
					}
				/>
			) : null}

			{user.role && (user.role as any).role_Name === 'BranchAdmin' ? (
				<HoverTooltip
					showOnHover="Device Reports"
					element={
						<Link to="/device-reports">
							<ClipboardDocumentListIcon className="h-9 w-9 font-bold text-white" />
						</Link>
					}
				/>
			) : null}

			<AvatarTooltip />
		</div>
	)
}

export default HeaderExtraRight
