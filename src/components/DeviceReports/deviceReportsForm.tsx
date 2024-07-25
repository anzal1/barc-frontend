import { getReportBody } from '../Api/endpoints'
import { userState } from '../Atoms/user'
import { FormEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'
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
		<form className="mx-auto grid max-w-sm grid-cols-1 gap-x-8 gap-y-8" onSubmit={handleSubmit}>
			<div className="flex flex-col items-start gap-2">
				<label htmlFor="startDate">Start Date</label>
				<input
					type="date"
					id="startDate"
					name="startDate"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					className="h-12 w-full rounded-lg border border-none bg-[#e8e8e8] p-4 shadow-md shadow-[#00000061]"
				/>
			</div>
			<div className="flex flex-col items-start gap-2">
				<label htmlFor="startDate">End Date</label>
				<input
					type="date"
					id="endDate"
					name="endDate"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					className="h-12 w-full rounded-lg border border-none bg-[#e8e8e8] p-4 shadow-md shadow-[#00000061]"
				/>
			</div>
			<div className="flex flex-col items-start gap-2">
				<label htmlFor="Select Report">Select Report</label>
				<select
					name="status"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					className="h-12 w-full rounded-lg border border-none bg-[#e8e8e8] shadow-md shadow-[#00000061]"
				>
					<option value="">Select a report</option>
					<option value="panic">Panic</option>
					<option value="acknowledged">Acknowledged</option>
					<option value="log">Log</option>
				</select>
			</div>

			<div className="flex items-center gap-4">
				<button
					disabled={isPending}
					className="rounded-lg border-2 border-[#1C9FF6] px-8 py-[10px] font-bold shadow-md shadow-[#00000061]"
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
						'rounded-lg bg-[#1C9FF6] px-8 py-3 font-bold text-white shadow-md shadow-[#00000061]',
						!startDate || !endDate || !status ? 'cursor-not-allowed bg-gray-400' : ''
					)}
				>
					View Report
				</button>
			</div>
		</form>
	)
}
