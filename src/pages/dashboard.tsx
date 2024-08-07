import { Dashboard } from '../components/Dashboard/dashboard'
import Layout from '../components/Layout/layout'
import HeaderExtraRight from '../components/headerExtras'
import HoverTooltip from '../components/hoverTooltip'
import { NavType } from '../enums/navtype'

export const DashboardPage = () => {
	return (
		<Layout navType={NavType.FILLED} navPath="Device Live Dashboard" extras={<HeaderExtraRight />}>
			<Dashboard />
		</Layout>
	)
}
