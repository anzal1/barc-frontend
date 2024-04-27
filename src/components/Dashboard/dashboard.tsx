import React from 'react'

export const Dashboard = () => {
  const generateRandomData = (n: number) => {
    const data = []
    for (let i = 0; i < n; i++) {
      data.push({
        id: i,
        x: Math.floor(Math.random() * 1030),
        y: Math.floor(Math.random() * 720),
        color: Math.floor(Math.random() * 255)
      })
    }
    return data
  }

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
              <button className="bg-[#1C9FF6] text-white px-4 py-2 rounded-[10px] w-full text-xl h-16">
                Show Live Activity
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-[776px]  w-[1078px]  rounded-[20px] p-0 relative"
        style={{
          background: `url('/assets/map.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0px 1px 18px 0px #00000061'
        }}
      >
        {generateRandomData(10).map((point) => (
          <div
            key={point.id}
            className="absolute"
            style={{
              left: point.x,
              top: 776 - point.y,
              width: '25px',
              height: '25px',
              background: `rgb(0,0,${point.color})`,
              borderRadius: '50%'
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
