import React from 'react'

import TextInput from '../components/Input'

import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { useNavigate } from 'react-router-dom'

export const DeviceMasterPage = () => {
  const navigate = useNavigate()

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
    <Layout navType={NavType.FILLED}>
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
                  onClick={() => navigate('/device-master-list')}
                />
                <img
                  src="/assets/cancel.svg"
                  className="w-10 h-10 cursor-pointer"
                  alt="cancel"
                  onClick={() => navigate('/')}
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
      </div>
    </Layout>
  )
}
