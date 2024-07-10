import { useState } from 'react'
import Modal from './Modal/modal'
import { useDownloadReportsMutation } from './Api'
import { useRecoilValue } from 'recoil'
import { userState } from './Atoms/user'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { handleCsvExport, handleExcelExport, pdfExport } from './exports'

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

  const [downloadType, setDownloadType] =
    useState<(typeof downloadOptions)[number]>('excel')

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
            else if (downloadType === 'pdf') pdfExport(response)
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
        className="text-blue-500 cursor-pointer bg-white rounded-lg p-2 hover:bg-blue-500 hover:text-white text-base h-min"
      >
        {downloadLoading ? (
          <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          'Download'
        )}
      </button>

      {/* {renderPdfDownload.length > 0 ? (
        <div className="absolute top-2 left-2 h-full w-full z-[10000]">
          <PdfExport data={renderPdfDownload} />
        </div>
      ) : null} */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        type="absolute"
        modalStyle="absolute bg-white p-8 w-96 top-48 right-20 rounded-lg shadow-lg h-min p-4 flex flex-col gap-4 items-center bg-[#e8e8e8]"
      >
        <div className="w-full flex items-center justify-between">
          <div className="text-black text-base">Select Download type</div>
          <XMarkIcon
            onClick={() => setOpen(false)}
            className="h-8 w-8 text-black cursor-pointer"
          />
        </div>
        <select
          name="status"
          value={downloadType}
          onChange={(e) => setDownloadType(e.target.value as any)}
          className="w-full h-12 border bg-white border-none rounded-lg text-black"
        >
          {downloadOptions.map((val) => (
            <option key={val} value={val}>
              {val.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          onClick={onDownload}
          className="text-blue-500 cursor-pointer bg-white rounded-lg p-2 text-base px-6"
        >
          {downloadLoading ? (
            <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500">
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
