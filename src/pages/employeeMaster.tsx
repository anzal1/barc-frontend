import React, { useState } from 'react'
import { CustomCard } from '../components/Card/card'
import TextInput from '../components/Input'
import { NavType } from '../enums/navtype'
import Layout from '../components/Layout/layout'
import { twMerge } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom'

const EmployeeMasterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    )

    console.log(formData)
    // handle form data: send to api to register device
  }

  return (
    <Layout navType={NavType.FILLED}>
      <div className="h-full w-full p-12 justify-center items-center">
        <CustomCard
          header={
            <div className="flex  justify-between items-center h-full w-full ">
              <h1>Device Master</h1>
              <div className="flex gap-6">
                <img
                  src="/assets/list.svg"
                  className="w-10 h-10 cursor-pointer"
                  alt="list"
                  onClick={() => navigate('/employee-master-list')}
                />
                <img
                  src="/assets/cancel.svg"
                  className="w-10 h-10 cursor-pointer"
                  alt="cancel"
                  onClick={() => navigate('/')}
                />
              </div>
            </div>
          }
        >
          <form
            className="mx-auto grid grid-cols-2 gap-x-8 gap-y-8 max-w-4xl"
            onSubmit={handleSubmit}
          >
            <TextInput name="fullName" label="Full Name" required />
            <TextInput name="contactNumber" label="Contact Number" required />
            <TextInput name="email" label="Email" required />
            <TextInput name="employeeRole" label="Employee Role" required />

            <div className="flex flex-col gap-1">
              <label htmlFor="workingStatus">
                Working Status <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 items-center">
                <div className="flex items-center justify-center gap-1">
                  <input
                    id="active"
                    type="radio"
                    name="workingStatus"
                    value="active"
                  />
                  <label htmlFor="active">Active</label>
                </div>

                <div className="flex items-center justify-center gap-1">
                  <input
                    id="inactive"
                    type="radio"
                    name="workingStatus"
                    value="inactice"
                  />
                  <label htmlFor="inactive">Not Active</label>
                </div>
              </div>
            </div>
            <div />

            <TextInput
              placeholder="user1"
              name="username"
              label="Username"
              required
            />
            <div className="flex flex-col gap-1 items-start justify-start relative">
              <label htmlFor={'password'}>
                Password
                <span className="text-red-500"> *</span>
              </label>
              <input
                id={'password'}
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className={
                  'w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]'
                }
              />
              <img
                onClick={() => setShowPassword(!showPassword)}
                src="/assets/eye.svg"
                className="w-6 h-6  absolute top-10 right-2 cursor-pointer"
                alt="eye"
              />
            </div>
            <div className="flex gap-4 items-center mt-16">
              <button className="px-8 py-[10px] rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061]">
                Reset
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-[#1C9FF6] rounded-lg text-white font-bold shadow-md shadow-[#00000061]"
              >
                Save
              </button>
            </div>
          </form>
        </CustomCard>
      </div>
    </Layout>
  )
}

export default EmployeeMasterPage
