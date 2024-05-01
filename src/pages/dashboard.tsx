import React from 'react'
import { Dashboard } from '../components/Dashboard/dashboard'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { useNavigate } from 'react-router-dom'
import { AvatarTooltip } from '../components/Avatar/avatar'

export const DashboardPage = () => {
  const navigate = useNavigate()

  return (
    <Layout
      navType={NavType.FILLED}
      navPath="Device Live Dashboard"
      extras={[
        <img
          className="cursor-pointer w-12 h-12"
          src="/assets/navList.svg"
          onClick={() => navigate('/device-master-list')}
        />,
        <AvatarTooltip />
      ]}
      footerContent={<p>© | Powered by DAccess Security Systems</p>}
    >
      <Dashboard />
    </Layout>
  )
}
