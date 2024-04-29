import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../Atoms/user'
export const PrivateRoutes = () => {
  const user = useRecoilValue(userState)
  const auth = localStorage.getItem('userToken') || user.token
  return auth ? <Outlet /> : <Navigate to="/login" />
}
