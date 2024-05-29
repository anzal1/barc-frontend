import React, { useEffect } from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { NavType } from '../../enums/navtype'
import { useGetRoleListMutation } from '../Api'
import { userState } from '../Atoms/user'
import { useSetRecoilState } from 'recoil'

const Layout = ({
  children,
  navType,
  extras = [],
  navPath = '',
  footerContent = <></>
}: {
  children: React.ReactNode
  navType: NavType
  extras?: React.ReactNode[]
  navPath?: string
  footerContent?: React.ReactNode
}) => {
  const { mutate: getRoleListFn } = useGetRoleListMutation()
  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as any)
    if (user != null) {
      getRoleListFn(void 0, {
        onSuccess: (roleList: any) => {
          const role =
            roleList &&
            roleList.find((role: any) => role.user_Name === user.username)
          localStorage.setItem('role', JSON.stringify(role))
          setUser((prev) => ({ ...prev, name: user.username, role: role }))
        },
        onError: (error: any) => {
          console.log('Error fetching role list', error)
        }
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen h-full w-screen overflow-x-hidden overflow-y-auto">
      <Navbar navType={navType} path={navPath} extras={extras} />

      <main className="flex-1 flex-grow bg-[#C1C1C1]">{children}</main>
      <Footer footerContent={footerContent} />
    </div>
  )
}

export default Layout
