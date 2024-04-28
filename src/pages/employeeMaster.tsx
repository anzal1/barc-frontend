import React from 'react'
import { CustomCard } from '../components/Card/card'
import TextInput from '../components/Input'

const EmployeeMasterPage = () => {
  return (
    <div className="h-full w-full p-12 justify-center items-center">
      <CustomCard
        header={
          <div className="flex  justify-between items-center h-full w-full ">
            <h1>Device Master</h1>
            <div className="flex gap-6">
              {/* <img
                src="/assets/list.svg"
                className="w-10 h-10 cursor-pointer"
                alt="list"
                onClick={handleShowList}
              />
              <img
                src="/assets/cancel.svg"
                className="w-10 h-10 cursor-pointer"
                alt="cancel"
                onClick={handleCancel}
              /> */}
            </div>
          </div>
        }
      >
        <form className="mx-auto grid grid-cols-2 gap-x-8 gap-y-8 max-w-4xl">
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

          <TextInput name="username" label="Username" required />
          <TextInput name="password" label="Password" required />
        </form>
      </CustomCard>
    </div>
  )
}

export default EmployeeMasterPage
