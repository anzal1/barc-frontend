import { Login } from '../components/Login/login'
import { NavType } from '../enums/navtype'
import Layout from '../components/Layout/layout'

import logo from '../assets/logo.svg'
import background from '../assets/homeBg.svg'
export const LoginPage = () => {
  return (
    <Layout navType={NavType.FADED}>
      <div
        style={{ backgroundImage: `url('${background}')` }}
        className="flex flex-col md:flex-row gap-4 justify-between items-center px-4 md:px-24 bg-no-repeat bg-cover w-full bg-center  h-[calc(100vh-176px)] -z-100 relative"
      >
        <img
          alt="logo"
          src={logo}
          className="hidden w-[395px] h-[403px] md:flex"
        />
        <Login />
      </div>
    </Layout>
  )
}
