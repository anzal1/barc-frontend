import React, { useState } from 'react'
import { Dashboard } from '../components/Dashboard/dashboard'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const [showList, setShowList] = useState(false)
  const [showAvatar, setShowAvatar] = useState(false)

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
        <img
          className="cursor-pointer w-12 h-12"
          src="/assets/avatar.svg"
          onClick={() => setShowAvatar(!showAvatar)}
        />
      ]}
      footerContent={<p>© | Powered by DAccess Security Systems</p>}
    >
      <Dashboard />
    </Layout>
  )
}
