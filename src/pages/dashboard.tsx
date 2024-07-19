import { Dashboard } from '../components/Dashboard/dashboard'
import Layout from '../components/Layout/layout'
import HeaderExtras from '../components/headerExtras'
import { NavType } from '../enums/navtype'

export const DashboardPage = () => {
	return (
		<Layout navType={NavType.FILLED} navPath="Device Live Dashboard" extras={HeaderExtras}>
			<Dashboard />
		</Layout>
	)
}
