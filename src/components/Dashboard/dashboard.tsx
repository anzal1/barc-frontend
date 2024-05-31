import { Fragment, useEffect, useReducer, useState } from 'react'
import Modal from '../Modal/modal'
import {
  useGetDeviceMasterListQuery,
  useInsertAcknowledgementMutation
} from '../Api'

import circles from '../../assets/circles.png'
import server from '../../assets/server.png'
import greenDot from '../../assets/greenDot.svg'
import redDot from '../../assets/redDot.svg'
import orangeDot from '../../assets/orangeDot.svg'
import cancel from '../../assets/cancel.svg'
import minimize from '../../assets/minimize.svg'
import map from '../../assets/map.png'
import { InsertAcknowledgeBody } from '../Api/endpoints'
import { userState } from '../Atoms/user'
import { useRecoilValue } from 'recoil'
import toast from 'react-hot-toast'
import StreamingCamera from '../StreamingCamera/streamingCamera'

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
          if (state.currentPoint)
            allActivePoints = [...state.activePoints, state.currentPoint]
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
  const {
    mutate: insertAcknowledgementFn,
    isPending: isInsertAcknowledgementPending
  } = useInsertAcknowledgementMutation()

  const user: any = useRecoilValue(userState)

  const handleShowLiveActivity = () => {
    if (!state.currentPoint || !state.currentPoint.rtsp) return
    dispatch({ type: 'ADD_ACTIVE_POINT' })
  }

  const {
    data: deviceList,
    isLoading
  }: {
    data: any
    isLoading: boolean
  } = useGetDeviceMasterListQuery(user?.role?.roleID || '1234')

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

  return (
    <div className="flex justify-start items-start h-full w-full bg-white  px-6 py-8 gap-4">
      <div className="flex flex-col gap-4 items-start justify-start w-[calc(100%-1078px)] h-[80vh]">
        <div className="flex flex-col items-center justify-center py-2 bg-[#EEEEEE] shadow-lg w-full rounded-[20px] gap-8 max-h-[208px]">
          <h2 className="text-2xl font-semibold ">Server</h2>
          <div className="flex gap-4 w-full justify-center items-center relative">
            <img src={circles} alt="circles" className="w-32 h-32" />
            <img
              src={server}
              alt="server"
              className="absolute z-50 h-24 w-24"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start py-2 px-4 bg-[#EEEEEE] shadow-lg w-full rounded-[20px] gap-8 ">
          <h2 className="text-3xl font-semibold ">Device Information</h2>
          <div className="flex flex-col  gap-4 w-full justify-between items-center h-full ">
            <div className="flex flex-col items-start justify-start gap-4 w-full">
              <span className="text-2xl font-semibold">
                Device Name: {state.currentPoint?.deviceName}
              </span>
              <span className="text-2xl font-semibold">
                Location: {state.currentPoint?.location}
              </span>
              <span className="text-xl">
                Device IP: {state.currentPoint?.deviceIp}
              </span>
              <span className="text-xl">
                Port No: {state.currentPoint?.portNo}
              </span>
              <span className="text-xl ">
                Serial No: {state.currentPoint?.serialNo}
              </span>
              <span className="text-xl">
                Status: {state.currentPoint?.status || 'NA'}
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full">
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
                onClick={handleShowLiveActivity}
                disabled={!!state.currentPoint}
                className="bg-[#1C9FF6] text-white px-4 py-2 rounded-[10px] w-full text-xl h-16"
              >
                Show Live Activity
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="map"
        onClick={handleMapClick}
        className="h-[776px] w-[1078px] rounded-[20px] p-0 overflow-hidden relative"
        style={{
          background: `url('${map}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0px 1px 18px 0px #00000061'
        }}
      >
        {deviceList &&
          (deviceList || []).map((point: DeviceMasterType) => (
            <Fragment key={point.x_value}>
              <img
                onClick={() =>
                  dispatch({ type: 'SET_CURRENT_POINT', payload: point })
                }
                src={
                  colorStatusMapper[
                    point.status as keyof typeof colorStatusMapper
                  ] || greenDot
                }
                alt="circle"
                className={`absolute cursor-pointer ${
                  panicStatusBlink &&
                  point.status === 'panic' &&
                  'animate-pulse'
                } `}
                style={{
                  top: `${Number.parseFloat(point.y_value as string) - 10}px`,
                  left: `${Number.parseFloat(point.x_value as string) - 10}px`
                }}
              />
              <p
                className="absolute text-black text-xs font-semibold"
                style={{
                  top: `${Number.parseFloat(point.y_value as string) + 10}px`,
                  left: `${Number.parseFloat(point.x_value as string) + 10}px`
                }}
              >
                X : {point.x_value} , Y : {point.y_value}
              </p>
            </Fragment>
          ))}

        <Modal
          open={!!state.currentPoint}
          onClose={() => dispatch({ type: 'SET_CURRENT_POINT', payload: null })}
          type="absolute"
        >
          <div
            className="flex flex-col gap-6 max-w-xs relative bg-white border-1-[#1C9FF6] border-2 rounded-[10px] p-4 shadow-lg"
            style={{
              top: `${
                Number.parseFloat(state.currentPoint?.y_value as string) > 500
                  ? Number.parseFloat(state.currentPoint?.y_value as string) -
                    400
                  : Number.parseFloat(state.currentPoint?.y_value as string)
              }px`,
              left: `${
                Number.parseFloat(state.currentPoint?.x_value as string) > 700
                  ? Number.parseFloat(state.currentPoint?.x_value as string) -
                    400
                  : Number.parseFloat(state.currentPoint?.x_value as string)
              }px`
            }}
          >
            <img
              src={cancel}
              alt="close"
              className="absolute top-2 right-2 cursor-pointer w-6 h-6 filter invert"
              onClick={() =>
                dispatch({ type: 'SET_CURRENT_POINT', payload: null })
              }
            />
            <div>
              <p>Device Name: {state.currentPoint?.deviceName}</p>
              <p>Location: {state.currentPoint?.location}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button
                disabled={
                  isInsertAcknowledgementPending ||
                  !state.currentPoint?.deviceNumber
                }
                onClick={handleInsertAcknowledgement}
                className="bg-white text-[#1C9FF6]  rounded-[10px] w-full border-2 border-[#1C9FF6] text-xl h-10"
              >
                Acknowledge
              </button>
              <button
                className="bg-[#1C9FF6] text-white rounded-[10px] w-full text-xl h-10"
                onClick={handleShowLiveActivity}
              >
                Show Live Activity
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={coordinateOpen}
          onClose={() => setCoordinateOpen(false)}
          type="absolute"
        >
          <div
            className="flex flex-col gap-6 max-w-xs relative bg-white border-1-[#1C9FF6] border-2 rounded-[10px] p-4 shadow-lg"
            style={{
              top: `${
                state.mapClick?.y > 500
                  ? state.mapClick?.y - 400
                  : state.mapClick?.y
              }px`,
              left: `${
                state.mapClick?.x > 700
                  ? state.mapClick?.x - 400
                  : state.mapClick?.x
              }px`
            }}
          >
            <img
              src={cancel}
              alt="close"
              className="absolute top-2 right-2 cursor-pointer w-6 h-6 filter invert"
              onClick={() => setCoordinateOpen(false)}
            />
            <div className="flex flex-col gap-2 w-full font-bold">
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
        <div className=" mt-16 bg-gray-400 w-full max-w-screen-2xl  p-4 rounded-xl z-[9999]">
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

            <div className="absolute -top-8 -right-8">
              <img
                onClick={() => dispatch({ type: 'MINIMIZE_RTSP_MODAL' })}
                src={minimize}
                alt="cancel"
                className="cursor-pointer w-10 h-10 fill-current bg-[#1C9FF6] p-1 rounded-full text-white"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
