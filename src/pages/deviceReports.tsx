import React from 'react'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { CustomCard } from '../components/Card/card'
import { useNavigate } from 'react-router-dom'

import cancel from '../assets/cancel.svg'

export const DeviceReports = () => {
  const navigate = useNavigate()
  const [startDate, setStartDate] = React.useState<string>('')
  const [endDate, setEndDate] = React.useState<string>('')
  const [report, setReport] = React.useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Layout navType={NavType.FILLED}>
      <div className="h-full w-full p-12 justify-center items-center">
        <CustomCard
          header={
            <div className="flex  justify-between items-center h-full w-full ">
              <h1>Device Reports</h1>
              <div className="flex gap-6">
                <img
                  src={cancel}
                  className="w-10 h-10 cursor-pointer"
                  alt="cancel"
                  onClick={() => navigate('/')}
                />
              </div>
            </div>
          }
        >
          <form
            className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 max-w-sm "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 items-start">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value)
                }}
                className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]"
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label htmlFor="startDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]"
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label htmlFor="Select Report">Select Report</label>
              <select
                className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg shadow-md shadow-[#00000061]"
                value={report}
                onChange={(e) => setReport(e.target.value)}
              >
                <option value="">Select a report</option>
                <option value="inventory">Inventory</option>
                <option value="logs">Logs</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="flex gap-4 items-center">
              <button className="px-8 py-[10px] rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061]">
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-[#1C9FF6] rounded-lg text-white font-bold shadow-md shadow-[#00000061]"
              >
                View Report
              </button>
            </div>
          </form>
        </CustomCard>
      </div>
    </Layout>
  )
}
