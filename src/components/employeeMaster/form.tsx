import React, { useState } from 'react'
import TextInput from '../Input'
import { CreateOrEditEmployeeMasterBody } from '../Api/endpoints'
import { useNavigate } from 'react-router-dom'
import {
  useCreateOrEditEmployeeMasterMutation,
  useGetRoleDetailsQuery
} from '../Api'
import toast from 'react-hot-toast'

import eye from '../../assets/eye.svg'
import { useRecoilValue } from 'recoil'
import { userState } from '../Atoms/user'

export type EmployeeMasterFormProps = {
  editData?: CreateOrEditEmployeeMasterBody
  extraButton?: React.ReactNode
}

const EmployeeMasterForm: React.FC<EmployeeMasterFormProps> = (props) => {
  const navigate = useNavigate()
  const { mutate: createOrEditMutationFn, isPending } =
    useCreateOrEditEmployeeMasterMutation()
  const [showPassword, setShowPassword] = useState(false)
  const user: any = useRecoilValue(userState)
  const {
    data: roleDetails,
    isLoading: isGetRoleDetailsLoading
  }: {
    data: any
    isLoading: boolean
  } = useGetRoleDetailsQuery(user?.role?.roleID || 5)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    )

    if (!formData.contactNumber || formData.contactNumber.length !== 10) {
      toast.error('Please enter a valid contact number')
      return
    }

    const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/)
    if (!formData.email || !emailRegex.test(formData.email as string)) {
      toast.error('Please enter a valid email')
      return
    }

    const data = {
      ...formData,
      status: formData.workingStatus === 'active' ? 1 : 0
    } as unknown as CreateOrEditEmployeeMasterBody

    createOrEditMutationFn(
      { data, isEdit: !!props.editData },
      {
        onSuccess() {
          toast.success('Employee Master created successfully!')
          navigate('/employee-master-list')
        },
        onError() {
          toast.error('An error occured!')
        }
      }
    )
  }

  return (
    <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-4">
        <TextInput
          disabled={isPending}
          name="fullName"
          label="Full Name"
          required
          defaultValue={props.editData?.Emp_Name}
        />
        <TextInput
          disabled={isPending}
          name="contactNumber"
          label="Contact Number"
          required
          defaultValue={props.editData?.ContactNo}
        />
        <TextInput
          disabled={isPending}
          name="email"
          label="Email"
          required
          defaultValue={props.editData?.Email}
        />

        {/* <TextInput
          disabled={isPending}
          name="employeeRole"
          label="Employee Role"
          required
        /> */}

        <div className="flex flex-col gap-1 items-start justify-start">
          <label htmlFor="Select Role">Select Role</label>
          <select
            required
            disabled={isPending || isGetRoleDetailsLoading}
            name="employeeRole"
            className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg shadow-md shadow-[#00000061]"
            defaultValue={
              roleDetails?.find(
                (role: any) => role.roleID === props.editData?.Role_id
              )?.role_Name
            }
          >
            <option value="">Select Role</option>
            {roleDetails &&
              roleDetails?.map((role: any) => (
                <option key={role.role_ID} value={role.role_Name}>
                  {role.role_Name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="workingStatus">
            Working Status <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 items-center">
            <div className="flex items-center justify-center gap-1">
              <input
                id="active"
                type="radio"
                value="active"
                name="workingStatus"
                disabled={isPending}
                defaultChecked={props.editData?.Status === 1}
              />
              <label htmlFor="active">Active</label>
            </div>

            <div className="flex items-center justify-center gap-1">
              <input
                id="inactive"
                type="radio"
                value="inactice"
                name="workingStatus"
                disabled={isPending}
                defaultChecked={props.editData?.Status === 0}
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
          disabled={isPending}
          defaultValue={props.editData?.User_Name}
        />
        <div className="flex flex-col gap-1 items-start justify-start relative">
          <label htmlFor="password">
            Password
            <span className="text-red-500"> *</span>
          </label>
          <input
            disabled={isPending}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            className={
              'w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]'
            }
          />
          <img
            onClick={() => setShowPassword(!showPassword)}
            src={eye}
            className="w-6 h-6  absolute top-10 right-2 cursor-pointer"
            alt="eye"
          />
        </div>
      </div>

      <br />

      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <button
            disabled={isPending}
            className="px-8 py-[10px] rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061]"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              ;(e.target as HTMLButtonElement).form?.reset()
            }}
          >
            Reset
          </button>
          <button
            disabled={isPending}
            type="submit"
            className="px-8 py-3 bg-[#1C9FF6] rounded-lg text-white font-bold shadow-md shadow-[#00000061]"
          >
            Save
          </button>
        </div>

        <div className="flex gap-4 items-center">{props.extraButton}</div>
      </div>
    </form>
  )
}

export default EmployeeMasterForm
