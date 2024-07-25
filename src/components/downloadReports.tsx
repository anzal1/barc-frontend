import { useDownloadReportsMutation } from './Api'
import { userState } from './Atoms/user'
import Modal from './Modal/modal'
import { handleCsvExport, handleExcelExport, pdfExport } from './exports'
import { XMarkIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

type DownloadReportProps = {
	startDate: string
	endDate: string
	reportName: string
}

const downloadOptions = ['excel', 'csv', 'pdf'] as const
function DownloadReportButton(props: DownloadReportProps) {
	const { role } = useRecoilValue(userState)
	const [open, setOpen] = useState(false)
	// const [renderPdfDownload, setRenderPdfDownload] = useState<any[]>([])
	const [downloadLoading, setDownloadLoading] = useState(false)

	const [downloadType, setDownloadType] = useState<(typeof downloadOptions)[number]>('excel')

	const { mutate: getDataForDownload } = useDownloadReportsMutation()

	const onDownload = async () => {
		setDownloadLoading(true)
		getDataForDownload(
			{
				startDate: props.startDate,
				endDate: props.endDate,
				status: props.reportName,
				userID: (role as any).roleID
			},
			{
				onSuccess: (response: any) => {
					try {
						if (downloadType === 'csv') handleCsvExport(response)
						else if (downloadType === 'excel') handleExcelExport(response)
						else if (downloadType === 'pdf') {
							const heading = `${props.reportName.toUpperCase()} reports: ${dayjs(props.startDate).format('DD/MM/YYYY')} - ${dayjs(props.endDate).format('DD/MM/YYYY')}`
							pdfExport(response, heading)
						}
					} catch (err) {
						console.log(err)
					} finally {
						setOpen(false)
						setDownloadLoading(false)
					}
				}
			}
		)
	}

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="h-min cursor-pointer rounded-lg bg-white p-2 text-base text-blue-500 hover:bg-blue-500 hover:text-white"
			>
				{downloadLoading ? (
					<div className="inline-block size-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500">
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					'Download'
				)}
			</button>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				type="absolute"
				modalStyle="absolute bg-white p-8 w-96 top-48 right-20 rounded-lg shadow-lg h-min p-4 flex flex-col gap-4 items-center bg-[#e8e8e8]"
			>
				<div className="flex w-full items-center justify-between">
					<div className="text-base text-black">Select Download type</div>
					<XMarkIcon onClick={() => setOpen(false)} className="h-8 w-8 cursor-pointer text-black" />
				</div>
				<select
					name="status"
					value={downloadType}
					onChange={(e) => setDownloadType(e.target.value as any)}
					className="h-12 w-full rounded-lg border border-none bg-white text-black"
				>
					{downloadOptions.map((val) => (
						<option key={val} value={val}>
							{val.toUpperCase()}
						</option>
					))}
				</select>
				<button
					onClick={onDownload}
					className="cursor-pointer rounded-lg bg-white p-2 px-6 text-base text-blue-500"
				>
					{downloadLoading ? (
						<div className="inline-block size-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500">
							<span className="sr-only">Loading...</span>
						</div>
					) : (
						'Download'
					)}
				</button>
			</Modal>
		</>
	)
}

export default DownloadReportButton
