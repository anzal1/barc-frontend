import { apiClient } from '../../lib/ApiConfig'

/*
1. 0 means user name  already exists

2. >0 means save successfully 
3. - 1 server side error 
For employee save and update

1. 1 means save successfully
2. - 1 means sever side error
For device master
*/

export type LoginBody = {
  User_Name: string
  Password: string
}

export const loginUser = ({
  User_Name,
  Password
}: LoginBody): Promise<unknown> =>
  apiClient(
    '/api/login/CheckUsercredentials?User_Name=' +
      User_Name +
      '&Password=' +
      Password,
    { method: 'POST' }
  )

export const createJWT = ({
  User_Name,
  Password
}: LoginBody): Promise<unknown> =>
  apiClient(
    '/api/login/JWTToken?Username=' + User_Name + '&Password=' + Password,
    { method: 'POST' }
  )

export type CreateDeviceMasterBody = {
  DeviceID: number
  DeviceNumber: string
  DeviceName: string
  Location: string
  BranchID: number
  DeviceIp: string
  SerialNo: string
  PortNo: string
  MacID: string
  UserID: string
  BranchName: string
  RTSP: string
  status: string
  X_Value: number
  Y_Value: number
}

export const createOrEditDeviceMaster = (body: {
  data: CreateDeviceMasterBody
  isEdit: boolean
}): Promise<unknown> =>
  apiClient(
    body.isEdit
      ? '/api/Device/UpdateDeviceEntry'
      : '/api/Device/InsertDeviceEntry',
    {
      method: 'POST',
      body: JSON.stringify(body.data)
    }
  )

export const deleteDeviceMaster = (props: {
  deviceId: string | number
  userID: string
}): Promise<unknown> =>
  apiClient('/api/Device/DeleteDeviceEntry', {
    method: 'POST',
    body: JSON.stringify({ DeviceID: props.deviceId, UserID: props.userID })
  })

export const getDeviceMasterList = (UserID: string): Promise<unknown> =>
  apiClient(`/api/Device/GetDeviceDetails?branchid=1&UserID=${UserID}`, {
    method: 'GET'
  })

export const getEmployeeMasterList = (UserID: string): Promise<unknown> =>
  apiClient(`/api/Employee/GetEmployeeDeatils?UserID=${UserID}`, {
    method: 'GET'
  })

export const deleteEmployee = (data: any): Promise<unknown> => {
  return apiClient('/api/Employee/RemoveEmployee', {
    method: 'POST',
    body: JSON.stringify({ ...data, Command: 'Delete' })
  })
}

export type CreateOrEditEmployeeMasterBody = {
  Command: string
  Emp_Name: string
  ContactNo: number
  Email: string
  DeptID: number
  DesigID: number
  BranchID: number
  Role_id: number
  User_Name: string
  Password: string
  Emptype: string
  EmptypID: number
  ContrcatID: number
  ApprovedAuth: number
  EmpID: string
  FingerID: number
  ValidityDate: string
  Status: number
  EmpSrNo: number
}

export const createOrEditEmployeeMaster = (body: {
  data: CreateOrEditEmployeeMasterBody
  isEdit: boolean
}): Promise<unknown> => {
  return apiClient(
    body.isEdit
      ? '/api/Employee/UpdateEmployeeDetails'
      : '/api/Employee/InsertEmployeeEntry',
    { method: 'POST', body: JSON.stringify(body.data) }
  )
}

export const getRoleDetails = (UserID: string): Promise<unknown> =>
  apiClient(`/api/Employee/GetRoleDeatils?UserID=${UserID}`, { method: 'GET' })

export const getRoleList = (): Promise<unknown> =>
  apiClient(`/api/login/GetRoleList`, { method: 'GET' })

export type getReportBody = {
  startDate: string
  endDate: string
  status: string
  userID: string
}

export const getReports = (params: getReportBody): Promise<unknown> =>
  apiClient(
    `/api/Appointment/LogReport?fromd=${params.startDate}&tod=${params.endDate}&Status=${params.status}&UserID=${params.userID}`,
    { method: 'GET' }
  )

export type InsertAcknowledgeBody = {
  DeviceNumber: string
  status: string
  UserID: string
}

export const insertAcknowledgement = (
  body: InsertAcknowledgeBody
): Promise<unknown> =>
  apiClient('/api/Device/acknowledgementInsertDeviceStatus', {
    method: 'POST',
    body: JSON.stringify(body)
  })
