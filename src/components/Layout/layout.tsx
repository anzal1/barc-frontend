import { NavType } from '../../enums/navtype'
import { useGetRoleListMutation } from '../Api'
import { userState } from '../Atoms/user'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { ReactNode, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

const Layout = ({
	children,
	navType,
	extras = [],
	navPath = '',
	footerContent = <p>&copy; | Powered by DAccess Security Systems</p>
}: {
	children: ReactNode
	navType: NavType
	extras?: ReactNode
	navPath?: string
	footerContent?: ReactNode
}) => {
	const { mutate: getRoleListFn } = useGetRoleListMutation()
	const setUser = useSetRecoilState(userState)

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user') as any)
		if (user != null) {
			getRoleListFn(void 0, {
				onSuccess: (roleList: any) => {
					const role = roleList && roleList.find((role: any) => role.user_Name === user.username)
					localStorage.setItem('role', JSON.stringify(role))
					setUser((prev) => ({ ...prev, name: user.username, role: role }))
				},
				onError: (error: any) => {
					console.log('Error fetching role list', error)
				}
			})
		}
	}, [])

	return (
		<div className="flex h-full min-h-screen w-screen flex-col overflow-y-auto overflow-x-hidden">
			<Navbar navType={navType} path={navPath} extras={extras} />

			<main className="flex-1 flex-grow bg-[#C1C1C1]">{children}</main>
			<Footer footerContent={footerContent} />
		</div>
	)
}

export default Layout
