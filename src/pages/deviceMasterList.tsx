import { useDeleteDeviceMasterMutation, useGetDeviceMasterListQuery } from '../components/Api'
import { CreateDeviceMasterBody } from '../components/Api/endpoints'
import { userState } from '../components/Atoms/user'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import Modal from '../components/Modal/modal'
import Table from '../components/Table'
import DeviceMasterForm from '../components/deviceMaster/form'
import HeaderExtraRight from '../components/headerExtras'
import { NavType } from '../enums/navtype'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

type DeviceMasterType = {
	branchID: number
	branchName: string
	deviceID: number
	deviceIp: string
	deviceName: string
	deviceNumber: string
	location: string
	macID: string
	portNo: string
	rtsp: any
	serialNo: any
	status: any
	userID: any
	x_value: string | number
	y_value: string | number
	camereIp: string
	deviceType: string
}

const DeviceMasterList = () => {
	const navigate = useNavigate()
	const user: any = useRecoilValue(userState)
	const {
		data,
		refetch: refetchDevices,
		isPending: getDeviceMasterPending
	} = useGetDeviceMasterListQuery(user?.role?.roleID)
	const { isPending: isDeleteDevicePending, mutate: deleteDeviceFn } =
		useDeleteDeviceMasterMutation()
	const [deleteDeviceId, setDeleteDeviceId] = useState<number | null>(null)
	const [editData, setEditData] = React.useState<CreateDeviceMasterBody | null>(null)

	const handleEdit = (currentRow: DeviceMasterType) => {
		const _editData: CreateDeviceMasterBody = {
			BranchID: currentRow.branchID,
			BranchName: currentRow.branchName,
			DeviceID: currentRow.deviceID,
			DeviceIp: currentRow.deviceIp,
			DeviceName: currentRow.deviceName,
			DeviceNumber: currentRow.deviceNumber,
			Location: currentRow.location,
			MacID: currentRow.macID,
			PortNo: currentRow.portNo,
			RTSP: currentRow.rtsp,
			SerialNo: currentRow.serialNo,
			status: currentRow.status,
			UserID: currentRow.userID,
			X_Value: String(currentRow.x_value) as any,
			Y_Value: String(currentRow.y_value) as any,
			camereIp: String(currentRow.camereIp) as any,
			deviceType: currentRow.deviceType as any
		}
		setEditData(_editData)
	}

	const handleDeleteDevice = (deviceId: number | null) => {
		if (!deviceId) {
			toast.error('No device selected')
			return
		}

		deleteDeviceFn(
			{ deviceId, userID: String(user?.role.empsrno) },
			{
				onSuccess: (data) => {
					if (data == -1) {
						toast.error('Could not delete device')
						return
					}
					refetchDevices()
					toast.success('Device deleted successfully')
				},
				onError: () => toast.error('Failed to delete device'),
				onSettled: () => setDeleteDeviceId(null)
			}
		)
	}

	if (!user.role || (user.role as any).role_Name !== 'BranchAdmin') {
		return <Navigate to="/" replace={true} />
	}

	return (
		<Layout navType={NavType.FILLED} extras={<HeaderExtraRight />}>
			<div className="h-full w-full items-center justify-center px-6 py-4">
				<CustomCard
					header={
						<div className="flex h-full w-full items-center justify-between">
							<h1>Device Master List</h1>
							<div className="flex gap-6">
								<XMarkIcon
									className="h-10 w-10 cursor-pointer"
									onClick={() => navigate('/device-master')}
								/>
							</div>
						</div>
					}
				>
					<Modal
						type="fixed"
						open={!!deleteDeviceId}
						modalStyle="w-[500px] h-auto"
						onClose={() => setDeleteDeviceId(null)}
					>
						<div className="border-1-[#1C9FF6] flex w-full flex-col rounded-[10px] border-2 bg-white p-4 shadow-lg">
							<h3 className="text-lg font-bold">
								Are you sure, you want to delete&nbsp;
								{data?.find((d) => d.deviceID === deleteDeviceId)?.deviceName || deleteDeviceId}
							</h3>

							<div className="mt-8 flex items-center justify-between">
								<button
									disabled={isDeleteDevicePending}
									onClick={() => setDeleteDeviceId(null)}
									className="cursor-pointer rounded-lg border-2 border-[#1C9FF6] px-6 py-2 font-bold shadow-md shadow-[#00000061]"
								>
									Cancel
								</button>
								<button
									disabled={isDeleteDevicePending}
									onClick={() => handleDeleteDevice(deleteDeviceId)}
									className="cursor-pointer rounded-lg bg-red-500 px-6 py-2 font-bold shadow-md shadow-[#00000061]"
								>
									Delete
								</button>
							</div>
						</div>
					</Modal>

					{!getDeviceMasterPending ? (
						editData ? (
							<DeviceMasterForm
								editData={editData}
								onSuccess={() => setEditData(null)}
								extraButton={
									<button
										onClick={() => setEditData(null)}
										className="cursor-pointer rounded-lg border-2 border-[#1C9FF6] px-8 py-[10px] font-bold shadow-md shadow-[#00000061]"
									>
										Cancel
									</button>
								}
							/>
						) : (
							<Table<DeviceMasterType>
								columns={[
									{
										key: 'Sl.No.',
										title: 'ID',
										render: (_, __, t) => `${t + 1}`
									},
									{ key: 'deviceName', title: 'Device Name' },
									{ key: 'location', title: 'Device Location' },
									{ key: 'rtsp', title: 'RSTP Link' },
									{
										key: 'status',
										title: 'Device Status',
										render: (currentRow) => currentRow.status || 'NA'
									},
									{ key: 'x_value', title: 'X Value', render: (d) => d.x_value?.toFixed(2) || '' },
									{ key: 'y_value', title: 'Y Value', render: (d) => d.y_value?.toFixed(2) || '' },
									{
										key: 'actions',
										title: 'Action',
										render: (currentRow) => (
											<div className="flex items-center justify-center gap-4 px-4">
												<PencilSquareIcon
													className="h-10 w-10 cursor-pointer rounded-full bg-[#1C9FF6] p-2 text-white"
													onClick={() => handleEdit(currentRow)}
												/>
												<TrashIcon
													className="h-10 w-10 cursor-pointer rounded-full bg-[#1C9FF6] p-2 text-white"
													onClick={() => setDeleteDeviceId(currentRow.deviceID)}
												/>
											</div>
										)
									}
								]}
								data={data as any}
							/>
						)
					) : (
						<div className="flex items-center justify-center">Loading ...</div>
					)}
				</CustomCard>
			</div>
		</Layout>
	)
}

export default DeviceMasterList
