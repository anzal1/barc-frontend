import React from 'react'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { CustomCard } from '../components/Card/card'
import { useNavigate } from 'react-router-dom'

import cancel from '../assets/cancel.svg'
import { DeviceReportsForm } from '../components/DeviceReports/deviceReportsForm'
import Table from '../components/Table'
import dayjs from 'dayjs'
import { useGetReportMutation } from '../components/Api'
import { twMerge } from 'tailwind-merge'

export const DeviceReports = () => {
  const navigate = useNavigate()
  const [reports, setReports] = React.useState<any[] | null>(null)
  const [header, setHeader] = React.useState<any>({
    reportName: '',
    startDate: '',
    endDate: ''
  })
  const [totalPages, setTotalPages] = React.useState(0)
  const [pageNumber, setPageNumber] = React.useState(1)
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
        setTotalPages(response[0].totalRecord)
      },
      onError: (error) => {
        console.log('Error fetching report', error)
      }
    })
  }

  const handleNextAndPrevious = (operation: number) => {
    setPageNumber((pageNumber) =>
      pageNumber + operation < 0
        ? 1
        : pageNumber + operation > totalPages
        ? totalPages
        : pageNumber + operation
    )
    handleGetReports({
      startDate: header.startDate,
      endDate: header.endDate,
      status: header.reportName,
      pageNumber:
        pageNumber + operation < 0
          ? 1
          : pageNumber + operation > totalPages
          ? totalPages
          : pageNumber + operation
    })
  }

  return (
    <Layout navType={NavType.FILLED}>
      {reports ? (
        <div className="h-full w-full p-12 justify-center items-center print:p-0">
          <CustomCard
            header={
              <div className="flex justify-between items-center h-full w-full">
                <div className="flex flex-col gap-1 items-start py-4 print:py-0">
                  <h1 className="text-2xl">
                    {`${
                      header?.reportName?.[0].toUpperCase() +
                      header?.reportName?.slice(1)
                    } Reports`}
                  </h1>
                  <p className="text-base font-normal">
                    {`From ${dayjs(header?.startDate).format(
                      'DD/MM/YYYY'
                    )} to ${dayjs(header?.endDate).format('DD/MM/YYYY')}`}
                  </p>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  {/* //add pagination here */}
                  <button
                    disabled={pageNumber === 1}
                    onClick={() => handleNextAndPrevious(-1)}
                    className={twMerge(
                      'px-4 py-2 rounded-lg font-bold  border-[#1C9FF6] shadow-md shadow-[#00000061] text-base',
                      pageNumber === 1 ? 'bg-black' : 'text-white'
                    )}
                  >
                    Previous
                  </button>
                  <button
                    disabled={pageNumber === totalPages}
                    onClick={() => handleNextAndPrevious(1)}
                    className={twMerge(
                      'px-4 py-2 rounded-lg font-bold border-[#1C9FF6] shadow-md shadow-[#00000061] text-base',
                      pageNumber === totalPages ? 'bg-black' : 'text-white'
                    )}
                  >
                    Next
                  </button>
                  <p className="text-blue-500 cursor-pointer bg-white rounded-lg p-2 hover:bg-blue-500 hover:text-white text-base">
                    Page {pageNumber} of {totalPages}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p
                    className="text-blue-500 cursor-pointer bg-white rounded-lg p-2 hover:bg-blue-500 hover:text-white text-base"
                    onClick={() =>
                      window.open(
                        `data:text/csv;charset=utf-8,${encodeURIComponent(
                          reports.reduce((acc, report) => {
                            return (
                              acc +
                              Object.values(report)
                                .map((value) => `"${value}"`)
                                .join(',') +
                              '\n'
                            )
                          }, 'LogID,Description,By Whom,Activity,Activity Date\n')
                        )}`,
                        '_blank'
                      )
                    }
                  >
                    Download
                  </p>
                  <p
                    onClick={() => setReports(null)}
                    className="text-blue-500 cursor-pointer bg-white rounded-lg p-2 hover:bg-blue-500 hover:text-white m-0 text-base"
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
                        className="break-words w-full max-w-[700px] flex flex-col justify-start overflow-ellipsis overflow-hidden text-left print:max-w-[500px]"
                      >
                        {log_Discription}
                      </p>
                    )
                  },
                  { key: 'user_name', title: 'By Whom' },
                  { key: 'activity', title: 'Activity' },
                  {
                    key: 'entryDate',
                    title: 'Activity Date',
                    render: ({ entryDate }) =>
                      dayjs(entryDate).format('DD/MM/YYYY HH:mm:ss A')
                  }
                ]}
              />
            )}
          </CustomCard>
        </div>
      ) : (
        <div className="h-full w-full p-12 justify-center items-center">
          <CustomCard
            header={
              <div className="flex justify-between items-center h-full w-full ">
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
            <DeviceReportsForm
              handleGetReports={handleGetReports}
              isPending={isPending}
            />
          </CustomCard>
        </div>
      )}
    </Layout>
  )
}
