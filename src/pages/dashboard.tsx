import React from 'react'
import { Dashboard } from '../components/Dashboard/dashboard'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { useNavigate } from 'react-router-dom'
import { AvatarTooltip } from '../components/Avatar/avatar'

import navList from '../assets/navList.svg'

export const DashboardPage = () => {
  const navigate = useNavigate()

  return (
    <Layout
      navType={NavType.FILLED}
      navPath="Device Live Dashboard"
      extras={[
        <img
          className="cursor-pointer w-12 h-12"
          src={navList}
          onClick={() => navigate('/device-master')}
        />,
        <AvatarTooltip />
      ]}
      footerContent={<p>© | Powered by DAccess Security Systems</p>}
    >
      <Dashboard />
    </Layout>
  )
}
