import list from '../assets/list.svg'
import { userState } from '../components/Atoms/user'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import EmployeeMasterForm from '../components/employeeMaster/form'
import { NavType } from '../enums/navtype'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { Navigate, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const EmployeeMasterPage = () => {
	const navigate = useNavigate()
	const user = useRecoilValue(userState)

	if (!user.role || (user.role as any).role_Name !== 'BranchAdmin') {
		return <Navigate to="/" replace={true} />
	}

	return (
		<Layout navType={NavType.FILLED}>
			<div className="h-full w-full items-center justify-center p-12">
				<CustomCard
					header={
						<div className="flex h-full w-full items-center justify-between">
							<h1>Employee Master</h1>
							<div className="flex gap-6">
								<img
									src={list}
									className="h-10 w-10 cursor-pointer"
									alt="list"
									onClick={() => navigate('/employee-master-list')}
								/>
								<XMarkIcon className="h-10 w-10 cursor-pointer" onClick={() => navigate('/')} />
							</div>
						</div>
					}
				>
					<EmployeeMasterForm />
				</CustomCard>
			</div>
		</Layout>
	)
}

export default EmployeeMasterPage
