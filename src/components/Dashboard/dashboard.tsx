import React, { useState } from 'react'
import Modal from '../Modal/modal'

const colors = ['red', 'orange', 'green']
const data = [
  { x: 337, y: 513, color: 'red' },
  { x: 78, y: 516, color: 'green' },
  { x: 333, y: 6, color: 'red' },
  { x: 56, y: 350, color: 'orange' },
  { x: 440, y: 155, color: 'red' },
  { x: 367, y: 526, color: 'orange' },
  { x: 1018, y: 351, color: 'green' },
  { x: 963, y: 583, color: 'orange' },
  { x: 575, y: 324, color: 'orange' },
  { x: 536, y: 447, color: 'green' },
  { x: 427, y: 683, color: 'orange' },
  { x: 929, y: 126, color: 'orange' },
  { x: 755, y: 722, color: 'orange' },
  { x: 334, y: 567, color: 'red' },
  { x: 448, y: 335, color: 'orange' },
  { x: 728, y: 157, color: 'green' },
  { x: 639, y: 80, color: 'green' },
  { x: 940, y: 7, color: 'green' },
  { x: 579, y: 65, color: 'green' },
  { x: 986, y: 183, color: 'orange' }
]
export const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [currentPoint, setCurrentPoint] = useState({ x: 0, y: 0, color: '' })

  return (
    <div className="flex justify-start items-start h-full w-full bg-white  px-6 py-8 gap-4">
      <div className="flex flex-col gap-4 items-start justify-start w-[calc(100%-1078px)] h-[80vh]">
        <div className="flex flex-col items-center justify-center py-2 bg-[#EEEEEE] shadow-lg w-full rounded-[20px] gap-8 max-h-[208px]">
          <h2 className="text-2xl font-semibold ">Server</h2>
          <div className="flex gap-4 w-full justify-center items-center relative">
            <img
              src="/assets/circles.png"
              alt="circles"
              className="w-32 h-32"
            />
            <img
              src="/assets/server.png"
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
                Device Name: Device Name
              </span>
              <p className="text-lg">Device Name: Device Name</p>
              <p className="">Device Name: Device Name</p>
              <p className="">Device Name: Device Name</p>
              <p className="">Device Name: Device Name</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button className="bg-white text-[#1C9FF6] px-4 py-2 rounded-[10px] w-full border-2 border-[#1C9FF6] text-xl h-16">
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
        className="h-[776px]  w-[1078px]  rounded-[20px] p-0 overflow-hidden relative"
        style={{
          background: `url('/assets/map.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0px 1px 18px 0px #00000061'
        }}
      >
        {data?.map((point) => (
          <img
            key={point.x}
            onClick={() => {
              console.log(point)
              setCurrentPoint(point)
              setOpen(!open)
            }}
            src={`/assets/${point?.color}Dot.svg`}
            alt="circle"
            className="absolute cursor-pointer animate-pulse"
            style={{
              top: `${point.y}px`,
              left: `${point.x}px`
            }}
          />
        ))}
        <Modal open={open} onClose={() => setOpen(false)} type="absolute">
          <div
            className="flex flex-col gap-6 max-w-xs relative bg-white border-1-[#1C9FF6] border-2 rounded-[10px] p-4 shadow-lg"
            style={{
              top: `${
                currentPoint.y > 500 ? currentPoint.y - 225 : currentPoint.y
              }px`,
              left: `${
                currentPoint.x > 700 ? currentPoint.x - 300 : currentPoint.x
              }px`
            }}
          >
            <img
              src="/assets/cancel.svg"
              alt="close"
              className="absolute top-2 right-2 cursor-pointer w-6 h-6 filter invert"
              onClick={() => setOpen(false)}
            />
            <div>
              <p>Device Name: Device Name</p>
              <p>Location: Device Location</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button className="bg-white text-[#1C9FF6]  rounded-[10px] w-full border-2 border-[#1C9FF6] text-xl h-10">
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
              <img
                src="/assets/image.png"
                alt="image"
                className="w-full h-full"
              />
              <div className="absolute -top-5 -right-5">
                <img
                  onClick={() => setImageModal(false)}
                  src="/assets/cancel.svg"
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
