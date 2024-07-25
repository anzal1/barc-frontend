import { useGetReportMutation } from '../components/Api'
import { CustomCard } from '../components/Card/card'
import { DeviceReportsForm } from '../components/DeviceReports/deviceReportsForm'
import Layout from '../components/Layout/layout'
import Table from '../components/Table'
import DownloadReportButton from '../components/downloadReports'
import HeaderExtraRight from '../components/headerExtras'
import { NavType } from '../enums/navtype'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export const DeviceReports = () => {
	const navigate = useNavigate()
	const [reports, setReports] = useState<any[] | null>(null)
	const [header, setHeader] = useState<any>({
		reportName: '',
		startDate: '',
		endDate: ''
	})
	const [totalPages, setTotalPages] = useState(0)
	// const [totalRecords, setTotalRecords] = React.useState(0)
	const [pageNumber, setPageNumber] = useState(1)
	const { mutate: getReportFn, isPending } = useGetReportMutation()

	const handleGetReports = (data: any) => {
		getReportFn(data, {
			onSuccess: (response: any) => {
				setHeader({
					reportName: data.status,
					startDate: data.startDate,
					endDate: data.endDate
				})
				setReports(response[0].report)
				setTotalPages(Number(response[0].pageCount))
				// setTotalRecords(response[0].totalRecord)
			},
			onError: (error) => {
				console.log('Error fetching report', error)
			}
		})
	}

	useEffect(() => {
		window.scrollTo(0, 0)
		handleGetReports({
			startDate: header.startDate,
			endDate: header.endDate,
			status: header.reportName,
			pageNumber
		})
	}, [pageNumber])

	return (
		<Layout navType={NavType.FILLED} extras={<HeaderExtraRight />}>
			{reports ? (
				<div className="h-full w-full items-center justify-center p-12 print:p-0">
					<CustomCard
						header={
							<div className="flex h-full w-full items-center justify-between">
								<div className="flex flex-col items-start gap-1 py-4 print:py-0">
									<h1 className="text-2xl">
										{`${
											header?.reportName?.[0].toUpperCase() + header?.reportName?.slice(1)
										} Reports`}
									</h1>
									<p className="text-base font-normal">
										{`From ${dayjs(header?.startDate).format(
											'DD/MM/YYYY'
										)} to ${dayjs(header?.endDate).format('DD/MM/YYYY')}`}
									</p>
								</div>
								<div className="flex items-center justify-center gap-2">
									{/* //add pagination here */}
									<button
										disabled={pageNumber === 1}
										onClick={() => setPageNumber((prev) => (prev <= 1 ? 1 : prev - 1))}
										className={twMerge(
											'rounded-lg border-[#1C9FF6] px-4 py-2 text-base font-bold shadow-md shadow-[#00000061]',
											pageNumber === 1 ? 'bg-black' : 'text-white'
										)}
									>
										Previous
									</button>
									<button
										disabled={pageNumber === totalPages}
										onClick={() => setPageNumber((prev) => (prev >= totalPages ? prev : prev + 1))}
										className={twMerge(
											'rounded-lg border-[#1C9FF6] px-4 py-2 text-base font-bold shadow-md shadow-[#00000061]',
											pageNumber === totalPages ? 'bg-black' : 'text-white'
										)}
									>
										Next
									</button>

									<select
										name="pageNumber"
										value={pageNumber}
										onChange={(e) => setPageNumber(Number(e.target.value))}
										className="h-10 rounded-lg border border-none bg-white text-blue-500 shadow-md"
									>
										{Array.from({ length: totalPages }).map((_, index) => (
											<option key={index} value={index + 1}>
												Page {index + 1}
											</option>
										))}
									</select>

									<p className="cursor-pointer rounded-lg bg-white p-2 text-base text-blue-500">
										Total {totalPages} pages
									</p>
								</div>
								<div className="flex items-center justify-center gap-2">
									<DownloadReportButton
										endDate={header.endDate}
										reportName={header.reportName}
										startDate={header.startDate}
									/>
									<p
										onClick={() => setReports(null)}
										className="m-0 cursor-pointer rounded-lg bg-white p-2 text-base text-blue-500 hover:bg-blue-500 hover:text-white"
									>
										Back to form
									</p>
								</div>
							</div>
						}
					>
						{isPending ? (
							<p>Loading...</p>
						) : (
							<Table
								title="Log Reports"
								data={reports}
								rootClassName="w-full max-w-[calc(100vw-48px)] m-[12px] p-2 rounded-lg bg-white shadow-md print:shadow-none print:p-0 print:m-0 print:w-full print:max-w-full print:overflow-x-auto"
								columns={[
									{
										key: 'logID',
										title: 'Sr. No.',
										render: (_, __, index) => (pageNumber - 1) * 100 + index + 1
									},
									{
										key: 'log_Discription',
										title: 'Description',
										className: 'text-left items-start justify-start',
										render: ({ log_Discription }) => (
											<p
												title={log_Discription}
												className="flex w-full max-w-[700px] flex-col justify-start overflow-hidden overflow-ellipsis break-words text-left print:max-w-[500px]"
											>
												{log_Discription}
											</p>
										)
									},
									{ key: 'user_name', title: 'By Whom' },
									{ key: 'activity', title: 'Activity' },
									{ key: 'device_Location', title: 'Device Location' },
									{
										key: 'entryDate',
										title: 'Activity Date',
										render: ({ entryDate }) => dayjs(entryDate).format('DD/MM/YYYY HH:mm:ss A')
									}
								]}
							/>
						)}
					</CustomCard>
				</div>
			) : (
				<div className="h-full w-full items-center justify-center p-12">
					<CustomCard
						header={
							<div className="flex h-full w-full items-center justify-between">
								<h1>Device Reports</h1>
								<div className="flex gap-6">
									<XMarkIcon className="h-10 w-10 cursor-pointer" onClick={() => navigate('/')} />
								</div>
							</div>
						}
					>
						<DeviceReportsForm handleGetReports={handleGetReports} isPending={isPending} />
					</CustomCard>
				</div>
			)}
		</Layout>
	)
}
