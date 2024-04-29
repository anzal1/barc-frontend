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

export const loginUser = ({
  User_Name,
  Password
}: {
  User_Name: string
  Password: string
}): Promise<unknown> =>
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
}: {
  User_Name: string
  Password: string
}): Promise<unknown> =>
  apiClient(
    '/api/login/JWTToken?User_Name=' + User_Name + '&Password=' + Password,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
