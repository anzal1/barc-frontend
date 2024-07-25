import emblem from '../../assets/emblem.svg'
import { NavType } from '../../enums/navtype'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const Navbar = (props: { extras: ReactNode; path: string; navType: NavType }) => {
	return (
		<header
			className="relative top-0 z-[999] flex h-[80px] items-center justify-center p-2 text-white print:hidden"
			style={{
				background:
					props.navType === NavType.FADED
						? 'linear-gradient(90.34deg, #FFFFFF -0.16%, #468CCC 102.8%)'
						: 'linear-gradient(90.34deg, #75CDFF -0.16%, #468CCC 102.8%)'
			}}
		>
			{props.path && (
				<div className="absolute left-2 top-0 my-3 flex h-14 items-center justify-center border-l-4 border-white pl-2">
					<div className="text-2xl">{props.path}</div>
				</div>
			)}

			<Link to="/">
				<img src={emblem} className="h-16 w-60" alt="logo" />
			</Link>

			<div className="absolute right-0 top-0 flex h-[80px] items-center justify-center gap-2">
				{props.extras}
			</div>
		</header>
	)
}
