import { useDeleteEmployeeMutation, useGetEmployeeMasterListQuery } from '../components/Api'
import { CreateOrEditEmployeeMasterBody } from '../components/Api/endpoints'
import { userState } from '../components/Atoms/user'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import Modal from '../components/Modal/modal'
import Table from '../components/Table'
import EmployeeMasterForm from '../components/employeeMaster/form'
import { NavType } from '../enums/navtype'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

type EmployeeMasterType = {
	command: any
	empsrno: number
	role_id: number
	emp_Name: string
	user_Name: string
	contactNo: number
	email: string
	deptID: number
	deptName: any
	desigID: number
	designame: any
	branchID: number
	branchName: any
	roleID: number
	status: number
	password: any
	emptype: any
	emptypID: any
	contrcatID: any
	approvedAuth: any
	empID: any
	fingerID: any
	validityDate: any
}

export const EmployeeMasterListPage = () => {
	const user: any = useRecoilValue(userState)
	const {
		data,
		refetch: refetchEmployees,
		isPending: employeeListPending
	} = useGetEmployeeMasterListQuery(user?.role?.roleID || '5')
	const { isPending: employeeDeletePending, mutate: deleteEmployeeFn } = useDeleteEmployeeMutation()

	const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null)
	const [editData, setEditData] = useState<CreateOrEditEmployeeMasterBody | null>(null)

	const handleEdit = (currentRow: EmployeeMasterType) => {
		const _editData: CreateOrEditEmployeeMasterBody = {
			ApprovedAuth: currentRow.approvedAuth,
			BranchID: currentRow.branchID,
			Command: currentRow.command,
			ContactNo: currentRow.contactNo,
			ContrcatID: currentRow.contrcatID,
			DeptID: currentRow.deptID,
			DesigID: currentRow.desigID,
			Email: currentRow.email,
			Emp_Name: currentRow.emp_Name,
			EmpID: currentRow.empID,
			Emptype: currentRow.emptype,
			EmptypID: currentRow.emptypID,
			FingerID: currentRow.fingerID,
			Password: currentRow.password,
			Role_id: currentRow.roleID,
			User_Name: currentRow.user_Name,
			ValidityDate: currentRow.validityDate,
			Status: currentRow.status,
			EmpSrNo: currentRow.empsrno
		}
		setEditData(_editData)
	}

	const handleDeleteEmployee = (employeeSrno: number | null) => {
		if (!employeeSrno) {
			toast.error('No employee selected')
			return
		}

		deleteEmployeeFn(
			{
				EMPSRNO: employeeSrno,
				Emp_Name: user.name,
				Email: user.email,
				Role_id: user.role.roleID,
				User_Name: user.role.user_Name,
				UserID: String(user.role.empsrno)
			},
			{
				onSuccess() {
					refetchEmployees()
					toast.success('Employee deleted successfully')
				},
				onError() {
					toast.error('Failed to delete employee')
				},
				onSettled() {
					setDeleteEmployeeId(null)
				}
			}
		)
	}

	const navigate = useNavigate()

	return (
		<Layout navType={NavType.FILLED}>
			<div className="h-full w-full items-center justify-center px-6 py-4">
				<CustomCard
					header={
						<div className="flex h-full w-full items-center justify-between">
							<h1>Employee Master List</h1>
							<div className="flex gap-6">
								<XMarkIcon
									className="h-10 w-10 cursor-pointer"
									onClick={() => navigate('/employee-master')}
								/>
							</div>
						</div>
					}
				>
					<Modal
						type="fixed"
						open={!!deleteEmployeeId}
						modalStyle="w-[500px] h-auto"
						onClose={() => setDeleteEmployeeId(null)}
					>
						<div className="border-1-[#1C9FF6] flex w-full flex-col rounded-[10px] border-2 bg-white p-4 shadow-lg">
							<h3 className="text-lg font-bold">
								Are you sure, you want to delete this Employee&nbsp;
								{deleteEmployeeId}
							</h3>

							<div className="mt-8 flex items-center justify-between">
								<button
									disabled={employeeDeletePending}
									onClick={() => setDeleteEmployeeId(null)}
									className="cursor-pointer rounded-lg border-2 border-[#1C9FF6] px-6 py-2 font-bold shadow-md shadow-[#00000061]"
								>
									Cancel
								</button>
								<button
									disabled={employeeDeletePending}
									onClick={() => handleDeleteEmployee(deleteEmployeeId)}
									className="cursor-pointer rounded-lg bg-red-500 px-6 py-2 font-bold shadow-md shadow-[#00000061]"
								>
									Delete
								</button>
							</div>
						</div>
					</Modal>

					{!employeeListPending ? (
						editData ? (
							<EmployeeMasterForm
								editData={editData}
								onSuccess={() => setEditData(null)}
								extraButton={
									<button
										onClick={() => setEditData(null)}
										className="cursor-pointer rounded-lg border-2 border-[#1C9FF6] px-8 py-[10px] font-bold shadow-md shadow-[#00000061]"
									>
										Cancel
									</button>
								}
							/>
						) : (
							<Table<EmployeeMasterType>
								columns={[
									{ key: 'empsrno', title: 'Employee srno' },
									{ key: 'emp_Name', title: 'Full Name' },
									{ key: 'contactNo', title: 'Contact Number' },
									{ key: 'email', title: 'Email' },
									{ key: 'roleName', title: 'Employee Role' },
									{ key: 'user_Name', title: 'User name' },
									{
										key: 'actions',
										title: 'Action',
										render: (currentRow) => (
											<div className="flex items-center justify-center gap-4">
												<PencilSquareIcon
													className="h-10 w-10 cursor-pointer rounded-full bg-[#1C9FF6] p-2 text-white"
													onClick={() => handleEdit(currentRow)}
												/>
												<TrashIcon
													className="h-10 w-10 cursor-pointer rounded-full bg-[#1C9FF6] p-2 text-white"
													onClick={() => setDeleteEmployeeId(currentRow.empsrno)}
												/>
											</div>
										)
									}
								]}
								data={data as any}
							/>
						)
					) : (
						<div className="flex items-center justify-center">Loading ...</div>
					)}
				</CustomCard>
			</div>
		</Layout>
	)
}
