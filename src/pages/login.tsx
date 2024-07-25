import background from '../assets/homeBg.svg'
import logo from '../assets/logo.svg'
import { userState } from '../components/Atoms/user'
import Layout from '../components/Layout/layout'
import { Login } from '../components/Login/login'
import { NavType } from '../enums/navtype'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

export const LoginPage = () => {
	const user = useRecoilValue(userState)

	if (!!user && user.email) {
		console.log(user)
		return <Navigate to="/" replace />
	}

	return (
		<Layout navType={NavType.FADED}>
			<div
				style={{ backgroundImage: `url('${background}')` }}
				className="-z-100 relative flex h-[calc(100vh-176px)] w-full flex-col items-center justify-between gap-4 bg-cover bg-center bg-no-repeat px-4 md:flex-row md:px-24"
			>
				<img alt="logo" src={logo} className="hidden h-[60%] md:flex" />
				<Login />
			</div>
		</Layout>
	)
}
