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

  return (
    <Layout navType={NavType.FILLED}>
      {reports ? (
        <div className="flex flex-col gap-4 items-start h-full">
          <p
            className="text-blue-500 cursor-pointer bg-white rounded-lg p-2 hover:bg-blue-500 hover:text-white m-4 -mb-2 px-8 "
            onClick={() => setReports(null)}
          >
            Back to form
          </p>

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
                className: 'text-left',
                render: ({ log_Discription }) => (
                  <p className="w-full break-words">{log_Discription}</p>
                )
              },
              { key: 'user_name', title: 'By Whom' },
              { key: 'activity', title: 'Activity' },
              {
                key: 'entryDate',
                title: 'Activity Date',
                render: ({ entryDate }) => dayjs(entryDate).format('DD/MM/YYYY')
              }
            ]}
          />
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
            <DeviceReportsForm setReports={setReports} />
          </CustomCard>
        </div>
      )}
    </Layout>
  )
}
