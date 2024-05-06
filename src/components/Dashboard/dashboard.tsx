import React, { useState } from 'react'
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
import videoImage from '../../assets/image.png'
import map from '../../assets/map.png'
import { InsertAcknowledgeBody } from '../Api/endpoints'
import { userState } from '../Atoms/user'
import { useRecoilValue } from 'recoil'
import toast from 'react-hot-toast'

// const data = [
//   { x: 337, y: 513, color: 'red' },
//   { x: 78, y: 516, color: 'green' },
//   { x: 333, y: 6, color: 'red' },
//   { x: 56, y: 350, color: 'orange' },
//   { x: 440, y: 155, color: 'red' },
//   { x: 367, y: 526, color: 'orange' },
//   { x: 1018, y: 351, color: 'green' },
//   { x: 963, y: 583, color: 'orange' },
//   { x: 575, y: 324, color: 'orange' },
//   { x: 536, y: 447, color: 'green' },
//   { x: 427, y: 683, color: 'orange' },
//   { x: 929, y: 126, color: 'orange' },
//   { x: 755, y: 722, color: 'orange' },
//   { x: 334, y: 567, color: 'red' },
//   { x: 448, y: 335, color: 'orange' },
//   { x: 728, y: 157, color: 'green' },
//   { x: 639, y: 80, color: 'green' },
//   { x: 940, y: 7, color: 'green' },
//   { x: 579, y: 65, color: 'green' },
//   { x: 986, y: 183, color: 'orange' }
// ]

const colorStatusMapper = {
  online: greenDot,
  offline: orangeDot,
  panic: redDot
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
export const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [currentPoint, setCurrentPoint] = useState<DeviceMasterType>(
    {} as DeviceMasterType
  )
  const [mapClick, setMapClick] = useState({ x: 0, y: 0 })
  const [coordinateOpen, setCoordinateOpen] = useState(false)
  const {
    mutate: insertAcknowledgementFn,
    isPending: isInsertAcknowledgementPending
  } = useInsertAcknowledgementMutation()

  const user: any = useRecoilValue(userState)

  const {
    data: deviceList,
    isLoading
  }: {
    data: any
    isLoading: boolean
  } = useGetDeviceMasterListQuery()

  if (isLoading) return <div>Loading...</div>

  const handleMapClick = (event: any) => {
    const bounds: any = document?.getElementById('map')?.getBoundingClientRect()
    const x = event.clientX - bounds?.left
    const y = event.clientY - bounds?.top

    const isNear = deviceList?.some(
      (point: DeviceMasterType) =>
        Math.pow(Number.parseFloat(point.x_value as string) - x, 2) +
          Math.pow(Number.parseFloat(point.y_value as string) - y, 2) <
        160
    )

    if (isNear) return
    setMapClick({
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100
    })
    setCoordinateOpen(true)
  }

  const handleInsertAcknowledgement = () => {
    const body = {
      DeviceNumber: currentPoint?.deviceNumber,
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
                Device Name: {currentPoint?.deviceName}
              </span>
              <span className="text-2xl font-semibold">
                Location: {currentPoint?.location}
              </span>
              <span className="text-xl">
                Device IP: {currentPoint?.deviceIp}
              </span>
              <span className="text-xl">Port No: {currentPoint?.portNo}</span>
              <span className="text-xl ">
                Serial No: {currentPoint?.serialNo}
              </span>
              <span className="text-xl">Status: {currentPoint?.status}</span>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button
                disabled={
                  isInsertAcknowledgementPending || !currentPoint?.deviceNumber
                }
                onClick={handleInsertAcknowledgement}
                className="bg-white text-[#1C9FF6] px-4 py-2 rounded-[10px] w-full border-2 border-[#1C9FF6] text-xl h-16"
              >
                Acknowledge
              </button>
              <button
                className="bg-[#1C9FF6] text-white px-4 py-2 rounded-[10px] w-full text-xl h-16"
                onClick={() => {
                  setOpen(false)
                  setCurrentPoint(currentPoint)
                  setImageModal(true)
                }}
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
        className="h-[776px]  w-[1078px]  rounded-[20px] p-0 overflow-hidden relative"
        style={{
          background: `url('${map}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0px 1px 18px 0px #00000061'
        }}
      >
        {deviceList?.map((point: DeviceMasterType) => (
          <>
            <img
              key={point.x_value}
              onClick={() => {
                setCurrentPoint(point)
                setOpen(!open)
              }}
              src={
                colorStatusMapper[
                  point.status as keyof typeof colorStatusMapper
                ] || greenDot
              }
              alt="circle"
              className="absolute cursor-pointer"
              // this image should have its center at the x and y
              style={{
                top: `${Number.parseFloat(point.y_value as string) - 10}px`,
                left: `${Number.parseFloat(point.x_value as string) - 10}px`
              }}
            />
            <p
              key={point.x_value}
              className="absolute text-black text-xs font-semibold"
              style={{
                top: `${Number.parseFloat(point.y_value as string) + 10}px`,
                left: `${Number.parseFloat(point.x_value as string) + 10}px`
              }}
            >
              X : {point.x_value} , Y : {point.y_value}
            </p>
          </>
        ))}
        <Modal open={open} onClose={() => setOpen(false)} type="absolute">
          <div
            className="flex flex-col gap-6 max-w-xs relative bg-white border-1-[#1C9FF6] border-2 rounded-[10px] p-4 shadow-lg"
            style={{
              top: `${
                Number.parseFloat(currentPoint?.y_value as string) > 500
                  ? Number.parseFloat(currentPoint?.y_value as string) - 400
                  : Number.parseFloat(currentPoint?.y_value as string)
              }px`,
              left: `${
                Number.parseFloat(currentPoint?.x_value as string) > 700
                  ? Number.parseFloat(currentPoint?.x_value as string) - 400
                  : Number.parseFloat(currentPoint?.x_value as string)
              }px`
            }}
          >
            <img
              src={cancel}
              alt="close"
              className="absolute top-2 right-2 cursor-pointer w-6 h-6 filter invert"
              onClick={() => setOpen(false)}
            />
            <div>
              <p>Device Name: {currentPoint?.deviceName}</p>
              <p>Location: {currentPoint?.location}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button
                disabled={
                  isInsertAcknowledgementPending || !currentPoint?.deviceNumber
                }
                onClick={handleInsertAcknowledgement}
                className="bg-white text-[#1C9FF6]  rounded-[10px] w-full border-2 border-[#1C9FF6] text-xl h-10"
              >
                Acknowledge
              </button>
              <button
                className="bg-[#1C9FF6] text-white rounded-[10px] w-full text-xl h-10"
                onClick={() => {
                  setOpen(false)
                  setCurrentPoint(currentPoint)
                  setImageModal(true)
                }}
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
              top: `${mapClick?.y > 500 ? mapClick?.y - 400 : mapClick?.y}px`,
              left: `${mapClick?.x > 700 ? mapClick?.x - 400 : mapClick?.x}px`
            }}
          >
            <img
              src={cancel}
              alt="close"
              className="absolute top-2 right-2 cursor-pointer w-6 h-6 filter invert"
              onClick={() => setCoordinateOpen(false)}
            />
            <div className="flex flex-col gap-2 w-full font-bold">
              <p>X: {mapClick?.x}</p>
              <p>Y: {mapClick?.y}</p>
            </div>
          </div>
        </Modal>
      </div>
      <Modal
        open={imageModal}
        onClose={() => setImageModal}
        type="absolute"
        modalStyle="py-24 px-12"
      >
        <div className="grid grid-cols-5 gap-4  rounded-lg p-4 shadow-xl shadow-[#00000061] mt-16">
          {Array.from({ length: 15 }).map((_, index) => (
            <div className="relative z-[9999]">
              <img src={videoImage} alt="image" className="w-full h-full" />
              <div className="absolute -top-5 -right-5">
                <img
                  onClick={() => setImageModal(false)}
                  src={cancel}
                  alt="cancel"
                  className="cursor-pointer w-6 h-6 fill-current text-[#1C9FF6]"
                />
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
