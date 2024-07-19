import { AvatarTooltip } from './Avatar/avatar'
import HoverTooltip from './hoverTooltip'
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import ListBulletIcon from '@heroicons/react/24/outline/ListBulletIcon'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const HeaderExtras: ReactNode[] = [
	<HoverTooltip
		showOnHover="Device Master"
		element={
			<Link to="/device-master">
				<ListBulletIcon className="h-9 w-9 font-bold text-white" />
			</Link>
		}
	/>,
	<HoverTooltip
		showOnHover="Device Reports"
		element={
			<Link to="/device-reports">
				<ClipboardDocumentListIcon className="h-9 w-9 font-bold text-white" />
			</Link>
		}
	/>,
	<AvatarTooltip />
]

export default HeaderExtras
