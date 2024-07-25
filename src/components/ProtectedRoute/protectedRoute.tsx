import { useRecoilValue } from 'recoil'
import { Navigate, Outlet } from 'react-router-dom'

import { userState } from '../Atoms/user'

export const PrivateRoutes = () => {
  const user = useRecoilValue(userState)
  const auth = localStorage.getItem('userToken') || user.token

  return auth ? <Outlet /> : <Navigate to="/login" />
}
