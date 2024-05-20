import React from 'react'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { CustomCard } from '../components/Card/card'
import { useNavigate } from 'react-router-dom'

import cancel from '../assets/cancel.svg'
import { DeviceReportsForm } from '../components/DeviceReports/deviceReportsForm'
import Table from '../components/Table'
import dayjs from 'dayjs'

export const DeviceReports = () => {
  const navigate = useNavigate()
  const [reports, setReports] = React.useState<any[] | null>(null)
  const [header, setHeader] = React.useState<any[] | null>(null)
  return (
    <Layout navType={NavType.FILLED}>
      {reports ? (
        <div className="h-full w-full p-12 justify-center items-center">
          <CustomCard
            header={
              <div className="flex  justify-between items-center h-full w-full ">
                <h1>{header?.[0].toUpperCase() + header?.slice(1)} Reports</h1>
                <div className="flex gap-2">
                  <p
                    className="text-blue-500 cursor-pointer bg-white rounded-lg p-2 hover:bg-blue-500 hover:text-white m-2"
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
                    className="text-blue-500 cursor-pointer bg-white rounded-lg p-2 hover:bg-blue-500 hover:text-white m-2"
                    onClick={() => setReports(null)}
                  >
                    Back to form
                  </p>
                </div>
              </div>
            }
          >
            <Table
              title="Log Reports"
              data={reports}
              rootClassName="w-full max-w-[calc(100vw-48px)] m-[12px] p-2 rounded-lg bg-white shadow-md"
              columns={[
                {
                  key: 'logID',
                  title: 'Sl. No.',
                  render: (_, __, index) => index + 1
                },
                {
                  key: 'log_Discription',
                  title: 'Description',
                  className: 'text-left items-start justify-start',
                  render: ({ log_Discription }) => (
                    <p
                      className="break-words w-full max-w-[700px] flex flex-col justify-start
                  overflow-ellipsis overflow-hidden text-left
                  "
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
                    dayjs(entryDate).format('DD/MM/YYYY')
                }
              ]}
            />
          </CustomCard>
        </div>
      ) : (
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
            <DeviceReportsForm setHeader={setHeader} setReports={setReports} />
          </CustomCard>
        </div>
      )}
    </Layout>
  )
}
