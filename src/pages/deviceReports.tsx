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
  const [reports, setReports] = React.useState<any[]>([])

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
          {reports.length > 0 ? (
            <div className="flex flex-col gap-4 items-start h-full">
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() => setReports([])}
              >
                Back to form
              </p>

              <Table
                data={reports.reverse()}
                rootClassName="w-full max-w-[calc(100vw-160px)]"
                columns={[
                  { key: 'logID', title: 'Log ID' },
                  {
                    key: 'entryDate',
                    title: 'Entry Date',
                    render: ({ entryDate }) =>
                      dayjs(entryDate).format('DD-MM-YYYY HH:mm:ss A')
                  },
                  { key: 'user_name', title: 'User Name' },
                  { key: 'activity', title: 'Activity' },
                  {
                    key: 'log_Discription',
                    title: 'Log Description',
                    render: ({ log_Discription }) => (
                      <p className="w-full break-words">{log_Discription}</p>
                    )
                  }
                ]}
              />
            </div>
          ) : (
            <DeviceReportsForm setReports={setReports} />
          )}
        </CustomCard>
      </div>
    </Layout>
  )
}
