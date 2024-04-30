import { useNavigate } from 'react-router-dom'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import Table from '../components/Table'
import { NavType } from '../enums/navtype'

type EmployeeMasterType = {
  srNo: string
  fullName: string
  contactNumber: string
  email: string
  employeeRole: string
  workingStatus: string
  userName: string
  password: string
}

const data: EmployeeMasterType[] = [
  {
    srNo: '01',
    fullName: 'John Doe',
    contactNumber: '9876543210',
    email: 'User@u123',
    employeeRole: 'Admin',
    workingStatus: 'Active',
    userName: 'johndoe',
    password: 'password'
  },
  {
    srNo: '02',
    fullName: 'John Doe',
    contactNumber: '9876543210',
    email: 'User@u123',
    employeeRole: 'Admin',
    workingStatus: 'Active',
    userName: 'johndoe',
    password: 'password'
  },
  {
    srNo: '03',
    fullName: 'John Doe',
    contactNumber: '9876543210',
    email: 'User@u123',
    employeeRole: 'Admin',
    workingStatus: 'Active',
    userName: 'johndoe',
    password: 'password'
  },
  {
    srNo: '04',
    fullName: 'John Doe',
    contactNumber: '9876543210',
    email: 'User@u123',
    employeeRole: 'Admin',
    workingStatus: 'Active',
    userName: 'johndoe',
    password: 'password'
  },
  {
    srNo: '05',
    fullName: 'John Doe',
    contactNumber: '9876543210',
    email: 'User@u123',
    employeeRole: 'Admin',
    workingStatus: 'Active',
    userName: 'johndoe',
    password: 'password'
  },
  {
    srNo: '06',
    fullName: 'John Doe',
    contactNumber: '9876543210',
    email: 'User@u123',
    employeeRole: 'Admin',
    workingStatus: 'Active',
    userName: 'johndoe',
    password: 'password'
  }
]

export const EmployeeMasterListPage = () => {
  const handleEdit = (currentRow: EmployeeMasterType) => {
    console.log('handleEdit called', currentRow)
  }

  const handleDelete = (currentRow: EmployeeMasterType) => {
    console.log('handleDelete called', currentRow)
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
                <img
                  src="/assets/cancel.svg"
                  className="w-10 h-10 cursor-pointer"
                  alt="cancel"
                  onClick={() => navigate('/device-master')}
                />
              </div>
            </div>
          }
        >
          <Table<EmployeeMasterType>
            columns={[
              {
                key: 'srNo',
                title: 'Sr No.'
              },
              { key: 'fullName', title: 'Full Name' },
              { key: 'contactNumber', title: 'Contact Number' },
              { key: 'email', title: 'Email' },
              { key: 'employeeRole', title: 'Employee Role' },
              { key: 'workingStatus', title: 'Working Status' },
              { key: 'userName', title: 'User Name' },
              { key: 'password', title: 'Password' },
              {
                key: 'actions',
                title: 'Action',
                render: (currentRow) => (
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src="/assets/edit.svg"
                      className="cursor-pointer"
                      onClick={() => handleEdit(currentRow)}
                      alt="edit"
                    />
                    <img
                      className="cursor-pointer"
                      onClick={() => handleDelete(currentRow)}
                      src="/assets/delete.svg"
                      alt="delete"
                    />
                  </div>
                )
              }
            ]}
            data={data}
          />
        </CustomCard>
      </div>
    </Layout>
  )
}
