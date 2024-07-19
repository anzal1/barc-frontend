import list from '../assets/list.svg'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import DeviceMasterForm from '../components/deviceMaster/form'
import HeaderExtras from '../components/headerExtras'
import { NavType } from '../enums/navtype'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const DeviceMasterPage = () => {
	const navigate = useNavigate()

	return (
		<Layout navType={NavType.FILLED} extras={HeaderExtras}>
			<div className="h-full w-full items-center justify-center p-12">
				<CustomCard
					header={
						<div className="flex h-full w-full items-center justify-between">
							<h1>Device Master</h1>
							<div className="flex gap-6">
								<img
									src={list}
									alt="list"
									className="h-10 w-10 cursor-pointer"
									onClick={() => navigate('/device-master-list')}
								/>
								<XMarkIcon onClick={() => navigate('/')} className="h-10 w-10 cursor-pointer" />
							</div>
						</div>
					}
				>
					<DeviceMasterForm />
				</CustomCard>
			</div>
		</Layout>
	)
}
