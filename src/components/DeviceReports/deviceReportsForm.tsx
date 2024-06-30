import { useRecoilValue } from 'recoil'
import { userState } from '../Atoms/user'
import { getReportBody } from '../Api/endpoints'
import { FormEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const DeviceReportsForm = ({
  handleGetReports,
  isPending
}: {
  handleGetReports: (data: any) => void
  isPending: boolean
}) => {
  const user: any = useRecoilValue(userState)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    handleGetReports({
      startDate,
      endDate,
      status,
      userID: user?.role?.roleID || 2,
      pageNumber: 1
    } as getReportBody)
  }

  return (
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
          onChange={(e) => setStartDate(e.target.value)}
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
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg shadow-md shadow-[#00000061]"
        >
          <option value="">Select a report</option>
          {/* Panic,Acknowledged,Log */}
          <option value="panic">Panic</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="log">Log</option>
        </select>
      </div>
      <div className="flex gap-4 items-center">
        <button
          disabled={isPending}
          className="px-8 py-[10px] rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061]"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            ;(e.target as HTMLButtonElement).form?.reset()
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!startDate || !endDate || !status}
          className={twMerge(
            'px-8 py-3 bg-[#1C9FF6] rounded-lg text-white font-bold shadow-md shadow-[#00000061]',
            !startDate || !endDate || !status
              ? 'cursor-not-allowed bg-gray-400'
              : ''
          )}
        >
          View Report
        </button>
      </div>
    </form>
  )
}
