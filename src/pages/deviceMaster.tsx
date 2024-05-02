import React from 'react'

import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { useNavigate } from 'react-router-dom'
import DeviceMasterForm from '../components/deviceMaster/form'

import list from '../assets/list.svg'
import cancel from '../assets/cancel.svg'

export const DeviceMasterPage = () => {
  const navigate = useNavigate()

  return (
    <Layout navType={NavType.FILLED}>
      <div className="h-full w-full p-12 justify-center items-center">
        <CustomCard
          header={
            <div className="flex  justify-between items-center h-full w-full ">
              <h1>Device Master</h1>
              <div className="flex gap-6">
                <img
                  src={list}
                  className="w-10 h-10 cursor-pointer"
                  alt="list"
                  onClick={() => navigate('/device-master-list')}
                />
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
          <DeviceMasterForm />
        </CustomCard>
      </div>
    </Layout>
  )
}
