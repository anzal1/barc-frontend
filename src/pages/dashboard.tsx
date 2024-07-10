import { Dashboard } from '../components/Dashboard/dashboard'
import Layout from '../components/Layout/layout'
import { NavType } from '../enums/navtype'
import { Link } from 'react-router-dom'
import { AvatarTooltip } from '../components/Avatar/avatar'
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import ListBulletIcon from '@heroicons/react/24/outline/ListBulletIcon'
import HoverTooltip from '../components/hoverTooltip'

export const DashboardPage = () => {
  return (
    <Layout
      navType={NavType.FILLED}
      navPath="Device Live Dashboard"
      extras={[
        <HoverTooltip
          showOnHover="Device Master"
          element={
            <Link to="/device-master">
              <ListBulletIcon className="w-9 h-9 text-white font-bold" />
            </Link>
          }
        />,
        <HoverTooltip
          showOnHover="Device Reports"
          element={
            <Link to="/device-reports">
              <ClipboardDocumentListIcon className="w-9 h-9 text-white font-bold" />
            </Link>
          }
        />,
        <AvatarTooltip />
      ]}
    >
      <Dashboard />
    </Layout>
  )
}
