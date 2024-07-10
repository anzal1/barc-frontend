import { useNavigate } from 'react-router-dom'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import Table from '../components/Table'
import { NavType } from '../enums/navtype'
import {
  useDeleteEmployeeMutation,
  useGetEmployeeMasterListQuery
} from '../components/Api'
import { useState } from 'react'
import Modal from '../components/Modal/modal'
import toast from 'react-hot-toast'
import { CreateOrEditEmployeeMasterBody } from '../components/Api/endpoints'
import EmployeeMasterForm from '../components/employeeMaster/form'

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useRecoilValue } from 'recoil'
import { userState } from '../components/Atoms/user'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'

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
  const { isPending: employeeDeletePending, mutate: deleteEmployeeFn } =
    useDeleteEmployeeMutation()

  const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null)
  const [editData, setEditData] =
    useState<CreateOrEditEmployeeMasterBody | null>(null)

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
      <div className="h-full w-full px-6 py-4 justify-center items-center">
        <CustomCard
          header={
            <div className="flex  justify-between items-center h-full w-full ">
              <h1>Employee Master List</h1>
              <div className="flex gap-6">
                <XMarkIcon
                  className="w-10 h-10 cursor-pointer"
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
            <div className="flex w-full flex-col bg-white border-1-[#1C9FF6] border-2 rounded-[10px] p-4 shadow-lg">
              <h3 className="font-bold text-lg">
                Are you sure, you want to delete this Employee&nbsp;
                {deleteEmployeeId}
              </h3>

              <div className="flex items-center justify-between mt-8">
                <button
                  disabled={employeeDeletePending}
                  onClick={() => setDeleteEmployeeId(null)}
                  className="px-6 py-2 rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={employeeDeletePending}
                  onClick={() => handleDeleteEmployee(deleteEmployeeId)}
                  className="px-6 py-2 rounded-lg font-bold bg-red-500 shadow-md shadow-[#00000061] cursor-pointer"
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
                    className="px-8 py-[10px] rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061] cursor-pointer"
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
                  { key: 'roleID', title: 'Employee Role' },
                  { key: 'user_Name', title: 'User name' },
                  {
                    key: 'actions',
                    title: 'Action',
                    render: (currentRow) => (
                      <div className="flex items-center justify-center gap-4">
                        <PencilSquareIcon
                          className="cursor-pointer bg-[#1C9FF6] text-white h-10 w-10 p-2 rounded-full"
                          onClick={() => handleEdit(currentRow)}
                        />
                        <TrashIcon
                          className="cursor-pointer bg-[#1C9FF6] text-white h-10 w-10 p-2 rounded-full"
                          onClick={() =>
                            setDeleteEmployeeId(currentRow.empsrno)
                          }
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
