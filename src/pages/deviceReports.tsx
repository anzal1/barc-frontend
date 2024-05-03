import React from 'react'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { CustomCard } from '../components/Card/card'
import { useNavigate } from 'react-router-dom'

import cancel from '../assets/cancel.svg'
import { DeviceReportsForm } from '../components/DeviceReports/deviceReportsForm'

export const DeviceReports = () => {
  const navigate = useNavigate()
  const [reports, setReports] = React.useState(null)

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
          {reports ? (
            <div className="flex flex-col gap-4 items-start w-full h-full">
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() => setReports(null)}
              >
                Back to form
              </p>
              <pre className="w-full h-[50vh] overflow-y-scroll">
                {JSON.stringify(reports, null, 2)}
              </pre>
            </div>
          ) : (
            <DeviceReportsForm setReports={setReports} />
          )}
        </CustomCard>
      </div>
    </Layout>
  )
}
