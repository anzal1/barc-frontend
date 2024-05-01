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
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

export const createJWT = ({
  User_Name,
  Password
}: LoginBody): Promise<unknown> =>
  apiClient(
    '/api/login/JWTToken?Username=' + User_Name + '&Password=' + Password,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body.data)
    }
  )

export const deleteDeviceMaster = (
  deviceId: string | number
): Promise<unknown> =>
  apiClient('/api/Device/DeleteDeviceEntry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ DeviceID: deviceId })
  })

export const getDeviceMasterList = (): Promise<unknown> =>
  apiClient(`/api/Device/GetDeviceDetails?branchid=1`, { method: 'GET' })
