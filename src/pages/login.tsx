import React from 'react'
import { Login } from '../components/Login/login'

export const LoginPage = () => {
  return (
    <div
      style={{ backgroundImage: `url('/assets/homeBg.svg')` }}
      className="flex justify-between items-center px-4 md:px-24 bg-no-repeat bg-cover w-full bg-center  h-[calc(100vh-176px)] -z-100 relative"
    >
      <img
        alt="logo"
        src="/assets/logo.svg"
        className="w-[395px] h-[403px] hidden md:flex"
      />
      <Login />
    </div>
  )
}