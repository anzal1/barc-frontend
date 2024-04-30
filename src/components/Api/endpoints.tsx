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
  deviceName?: string
  serialNumber?: string
  deviceIp?: string
  deviceLocation?: string
  rstpLink?: string
  devicePort?: string
  deviceStatus?: string
  xValue?: string
  yValue?: string
}
export const createDeviceMaster = (
  body: CreateDeviceMasterBody
): Promise<unknown> =>
  apiClient('/api/DeviceMaster/SaveDeviceMaster', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
