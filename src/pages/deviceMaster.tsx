import React, { useState } from 'react'

import TextInput from '../components/Input'
import Modal from '../components/Modal/modal'
import { CustomCard } from '../components/Card/card'

export const DeviceMasterPage = () => {
  const [showList, setShowList] = useState(true)
  const [open, setOpen] = useState(false)
  // const {} =

  const handleCancel = () => {
    console.log('cancel')
  }

  const handleShowList = () => {
    setShowList(!showList)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    )

    console.log(formData)
    // handle form data: send to api to register device
  }

  return (
    <div className="h-full w-full p-12 justify-center items-center">
      <CustomCard
        header={
          <div className="flex  justify-between items-center h-full w-full ">
            <h1>Device Master</h1>
            <div className="flex gap-6">
              <img
                src="/assets/list.svg"
                className="w-10 h-10 cursor-pointer"
                alt="list"
                onClick={handleShowList}
              />
              <img
                src="/assets/cancel.svg"
                className="w-10 h-10 cursor-pointer"
                alt="cancel"
                onClick={handleCancel}
              />
            </div>
          </div>
        }
      >
        <form
          className="mx-auto grid grid-cols-2 gap-x-8 gap-y-8 max-w-4xl"
          onSubmit={handleSubmit}
        >
          <TextInput name="deviceName" label="Device Name" />
          <TextInput name="serialNumber" label="Serial Number" />
          <TextInput name="deviceIp" label="Device IP" />
          <TextInput name="deviceLocation" label="Device Location" />
          <TextInput name="rstpLink" label="RSTP Link" />
          <TextInput name="devicePort" label="Device Port" />
          <TextInput name="deviceStatus" label="Device Status" />

          <div className="flex flex-col  gap-1">
            <label htmlFor="Set Image Location">Set Image Location</label>
            <div className="flex  gap-4">
              <input
                type="text"
                id="xValue"
                name="xValue"
                placeholder="X Value"
                className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]"
              />
              <input
                type="text"
                id="yValue"
                name="yValue"
                placeholder="Y Value"
                className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]"
              />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button className="px-8 py-[10px] rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061]">
              Reset
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#1C9FF6] rounded-lg text-white font-bold shadow-md shadow-[#00000061]"
            >
              Save
            </button>
          </div>
        </form>
      </CustomCard>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="grid grid-cols-5 gap-4  rounded-lg p-4 shadow-xl shadow-[#00000061]">
          {Array.from({ length: 15 }).map((_, index) => (
            <div className="relative">
              <img
                src="/assets/image.png"
                alt="image"
                className="w-full h-full"
              />
              <div className="absolute -top-5 -right-5">
                <img src="/assets/cancel.svg" alt="cancel" />
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
