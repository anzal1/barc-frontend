import circles from '../../assets/circles.png'
import greenDot from '../../assets/greenDot.svg'
import map from '../../assets/map.png'
import minimize from '../../assets/minimize.svg'
import orangeDot from '../../assets/orangeDot.svg'
import redDot from '../../assets/redDot.svg'
import server from '../../assets/server.png'
import { useGetDeviceMasterListQuery, useInsertAcknowledgementMutation } from '../Api'
import { InsertAcknowledgeBody } from '../Api/endpoints'
import { userState } from '../Atoms/user'
import Modal from '../Modal/modal'
import StreamingCamera from '../StreamingCamera/streamingCamera'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { Fragment, useEffect, useReducer, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

const colorStatusMapper = {
	online: greenDot,
	offline: orangeDot,
	panic: redDot,
	acknowledge: greenDot
}

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
}

type ReducerState = {
	currentPoint: DeviceMasterType | null
	activePoints: Array<DeviceMasterType>
	mapClick: any
	imageModalVisible: boolean
	rtspModalOpen: boolean
}

export const Dashboard = () => {
	const user: any = useRecoilValue(userState)
	const [state, dispatch] = useReducer(
		(state: ReducerState, action: any): any => {
			switch (action.type) {
				case 'MINIMIZE_RTSP_MODAL':
					return { ...state, rtspModalOpen: false }
				case 'SET_CURRENT_POINT':
					return { ...state, currentPoint: action.payload }
				case 'EMPTY_ACTIVE_POINTS':
					return {
						...state,
						activePoints: [],
						imageModalVisible: false,
						rtspModalOpen: true
					}
				case 'REMOVE_POINT_FROM_ACTIVE':
					return {
						...state,
						activePoints: state.activePoints.filter(
							(point) => point.deviceID !== action.payload.deviceID
						)
					}
				case 'ADD_ACTIVE_POINT':
					let allActivePoints: Array<DeviceMasterType> = []
					if (state.currentPoint) allActivePoints = [...state.activePoints, state.currentPoint]
					else allActivePoints = [...state.activePoints, action.payload]

					const deviceMap = new Map<number, boolean>()
					const uniquePoints = allActivePoints.filter((point) => {
						if (deviceMap.has(point.deviceID)) return false
						deviceMap.set(point.deviceID, true)
						return true
					})

					return {
						...state,
						rtspModalOpen: true,
						imageModalVisible: false,
						activePoints: uniquePoints
					}
				case 'SET_MAP_CLICK':
					return { ...state, mapClick: action.payload }
				default:
					return { ...state }
			}
		},
		{
			currentPoint: null,
			activePoints: [],
			mapClick: { x: 0, y: 0 },
			imageModalVisible: false,
			rtspModalOpen: false
		} satisfies ReducerState
	)

	const [coordinateOpen, setCoordinateOpen] = useState(false)
	const [panicStatusBlink, setPanicStatusBlink] = useState(true)
	const { mutate: insertAcknowledgementFn, isPending: isInsertAcknowledgementPending } =
		useInsertAcknowledgementMutation()

	const handleShowLiveActivity = () => {
		if (!state.currentPoint || !state.currentPoint.rtsp) return
		dispatch({ type: 'ADD_ACTIVE_POINT' })
	}

	const { data: deviceList, refetch } = useGetDeviceMasterListQuery(user?.role?.roleID || '1234')

	useEffect(() => {
		refetch()
	}, [user?.role])

	useEffect(() => {
		if (!deviceList) return
		const isAcknowledged = deviceList.some(
			(point: DeviceMasterType) => point.status === 'acknowledge'
		)
		if (isAcknowledged) setPanicStatusBlink(false)
		else setPanicStatusBlink(true)
	}, [deviceList])

	const handleMapClick = (event: any) => {
		const bounds: any = document?.getElementById('map')?.getBoundingClientRect()
		const x = event.clientX - bounds?.left
		const y = event.clientY - bounds?.top

		const isNear = deviceList?.some(
			(point: DeviceMasterType) =>
				Math.pow(Number.parseFloat(point.x_value as string) - x, 2) +
					Math.pow(Number.parseFloat(point.y_value as string) - y, 2) <
				180
		)

		if (isNear) return
		dispatch({
			type: 'SET_MAP_CLICK',
			payload: { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 }
		})
		setCoordinateOpen(true)
	}

	const handleInsertAcknowledgement = () => {
		const body = {
			DeviceNumber: state.currentPoint?.deviceNumber,
			status: 'online',
			UserID: user?.role?.roleID.toString()
		} as InsertAcknowledgeBody
		insertAcknowledgementFn(body, {
			onSuccess: (data: any) => {
				if (data > 0) toast.success('Acknowledgement inserted')
				else toast.error('Error inserting acknowledgement')
			},
			onError: () => {
				toast.error('Error inserting acknowledgement')
			}
		})
	}

	console.log(state.currentPoint)

	return (
		<div className="flex h-full w-full items-start justify-start gap-4 bg-white px-3 py-2">
			<div className="flex w-[calc(100%-1200px)] flex-col items-start justify-start gap-4">
				<div className="flex max-h-[calc(100%-1200px)] w-full flex-col items-center justify-center gap-4 rounded-[20px] bg-[#EEEEEE] py-4 shadow-lg">
					<h2 className="text-2xl font-semibold">Server</h2>
					<div className="relative flex w-full items-center justify-center gap-4">
						<img src={circles} alt="circles" className="h-32 w-32" />
						<img src={server} alt="server" className="absolute z-50 h-24 w-24" />
					</div>
				</div>

				<div className="flex w-full flex-col items-center justify-start gap-8 rounded-[20px] bg-[#EEEEEE] px-4 py-2 shadow-lg">
					<h2 className="text-2xl font-semibold">Device Information</h2>
					<div className="flex h-full w-full flex-col items-center justify-between gap-4">
						<div className="flex w-full flex-col items-start justify-start gap-4">
							<table className="mx-auto table-auto border-separate border-spacing-1 font-semibold">
								<tr className="space-y-2 text-xl">
									<td>Device Name</td>
									<td>{state.currentPoint?.deviceName || 'N/A'}</td>
								</tr>
								<tr>
									<td>Location</td>
									<td>{state.currentPoint?.location || 'N/A'}</td>
								</tr>
								<tr>
									<td>Device IP</td>
									<td>{state.currentPoint?.deviceIp || 'N/A'}</td>
								</tr>
								<tr>
									<td>Port No</td>
									<td>{state.currentPoint?.portNo || 'N/A'}</td>
								</tr>
								<tr>
									<td>Serial No</td>
									<td>{state.currentPoint?.serialNo || 'N/A'}</td>
								</tr>
								<tr>
									<td>Status</td>
									<td>{state.currentPoint?.status || 'N/A'}</td>
								</tr>
							</table>
						</div>
						{/* <div className="flex flex-col gap-2 w-full">
              <button
                disabled={
                  isInsertAcknowledgementPending ||
                  !state.currentPoint?.deviceNumber
                }
                onClick={handleInsertAcknowledgement}
                className="bg-white text-[#1C9FF6] px-4 py-2 rounded-[10px] w-full border-2 border-[#1C9FF6] text-xl h-16"
              >
                Acknowledge
              </button>
              <button
                disabled={!state.currentPoint}
                onClick={handleShowLiveActivity}
                className="bg-[#1C9FF6] text-white px-4 py-2 rounded-[10px] w-full text-xl h-16 cursor-pointer z-[99]"
              >
                Show Live Activity
              </button>
            </div> */}
					</div>
				</div>
			</div>

			<div
				id="map"
				onClick={handleMapClick}
				// 581 x 1170
				className="relative h-[700px] w-[1200px] overflow-hidden rounded-2xl bg-stone-200 bg-no-repeat p-0"
				style={{ boxShadow: '0px 1px 18px 0px #00000061' }}
			>
				<img src={map} className="absolute bottom-0 top-0 my-auto h-auto w-full overflow-hidden" />
				{deviceList &&
					(deviceList || []).map((point: DeviceMasterType) => (
						<Fragment key={point.x_value}>
							<img
								onClick={() => dispatch({ type: 'SET_CURRENT_POINT', payload: point })}
								src={colorStatusMapper[point.status as keyof typeof colorStatusMapper] || greenDot}
								alt="circle"
								className={`absolute cursor-pointer ${
									panicStatusBlink && point.status === 'panic' && 'animate-pulse'
								} `}
								style={{
									top: `${Number.parseFloat(point.y_value as string) - 10}px`,
									left: `${Number.parseFloat(point.x_value as string) - 10}px`
								}}
							/>
							<p
								className="absolute rounded-sm bg-white px-2 py-0.5 text-xs font-semibold text-black shadow-sm"
								style={{
									top: `${Number.parseFloat(point.y_value as string) + 10}px`,
									left: `${Number.parseFloat(point.x_value as string) + 10}px`
								}}
							>
								X : {(point.x_value as any)?.toFixed(2)} , Y : {(point.y_value as any)?.toFixed(2)}
							</p>
						</Fragment>
					))}

				<Modal
					open={!!state.currentPoint}
					onClose={() => dispatch({ type: 'SET_CURRENT_POINT', payload: null })}
					type="absolute"
				>
					<div
						className="border-1-[#1C9FF6] relative flex max-w-xs flex-col gap-6 rounded-[10px] border-2 bg-white p-4 shadow-lg"
						style={{
							top: `${
								Number.parseFloat(state.currentPoint?.y_value as string) > 500
									? Number.parseFloat(state.currentPoint?.y_value as string) - 400
									: Number.parseFloat(state.currentPoint?.y_value as string)
							}px`,
							left: `${
								Number.parseFloat(state.currentPoint?.x_value as string) > 700
									? Number.parseFloat(state.currentPoint?.x_value as string) - 400
									: Number.parseFloat(state.currentPoint?.x_value as string)
							}px`
						}}
					>
						<XMarkIcon
							className="absolute right-2 top-2 h-6 w-6 cursor-pointer filter"
							onClick={() => dispatch({ type: 'SET_CURRENT_POINT', payload: null })}
						/>

						<div>
							<p>Device Name: {state.currentPoint?.deviceName}</p>
							<p>Location: {state.currentPoint?.location}</p>
						</div>

						{user.role?.role_Name === 'BranchAdmin' ||
						(user.role?.role_Name === 'Security' &&
							(state.currentPoint?.status === 'offline' ||
								state.currentPoint?.status === 'panic')) ? (
							<div className="flex w-full flex-col gap-2">
								<button
									disabled={isInsertAcknowledgementPending || !state.currentPoint?.deviceNumber}
									onClick={handleInsertAcknowledgement}
									className="h-10 w-full rounded-[10px] border-2 border-[#1C9FF6] bg-white text-xl text-[#1C9FF6]"
								>
									Acknowledge
								</button>
								<button
									className="h-10 w-full rounded-[10px] bg-[#1C9FF6] text-xl text-white"
									onClick={handleShowLiveActivity}
								>
									Show Live Activity
								</button>
							</div>
						) : null}
					</div>
				</Modal>

				<Modal open={coordinateOpen} onClose={() => setCoordinateOpen(false)} type="absolute">
					<div
						className="border-1-[#1C9FF6] relative flex max-w-xs flex-col gap-6 rounded-[10px] border-2 bg-white p-4 shadow-lg"
						style={{
							top: `${state.mapClick?.y > 500 ? state.mapClick?.y - 400 : state.mapClick?.y}px`,
							left: `${state.mapClick?.x > 700 ? state.mapClick?.x - 400 : state.mapClick?.x}px`
						}}
					>
						<XMarkIcon
							className="absolute right-2 top-2 h-6 w-6 cursor-pointer filter"
							onClick={() => setCoordinateOpen(false)}
						/>
						<div className="flex w-full flex-col gap-2 font-bold">
							<p>X: {state.mapClick?.x}</p>
							<p>Y: {state.mapClick?.y}</p>
						</div>
					</div>
				</Modal>
			</div>

			<Modal
				type="absolute"
				modalStyle="py-24 px-12"
				open={state.rtspModalOpen}
				onClose={() => dispatch({ type: 'MINIMIZE_RTSP_MODAL' })}
			>
				<div className="z-[9999] mt-16 w-full max-w-screen-2xl rounded-xl bg-gray-400 p-4">
					<div className="relative z-[9999] flex flex-wrap gap-4">
						{state.activePoints.length > 0
							? state.activePoints.map((point: DeviceMasterType) => {
									return point.rtsp ? (
										<StreamingCamera
											url={point.rtsp}
											onRemove={() => {
												dispatch({
													type: 'REMOVE_POINT_FROM_ACTIVE',
													payload: { deviceID: point.deviceID }
												})
											}}
										/>
									) : null
								})
							: null}

						<div className="absolute -right-8 -top-8">
							<img
								onClick={() => dispatch({ type: 'MINIMIZE_RTSP_MODAL' })}
								src={minimize}
								alt="cancel"
								className="h-10 w-10 cursor-pointer rounded-full bg-[#1C9FF6] fill-current p-1 text-white"
							/>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	)
}
