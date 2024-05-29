import React, { useState } from 'react'
import TextInput from '../Input'
import { CreateOrEditEmployeeMasterBody } from '../Api/endpoints'
import { useNavigate } from 'react-router-dom'
import {
  useGetRoleDetailsQuery,
  useCreateOrEditEmployeeMasterMutation
} from '../Api'
import toast from 'react-hot-toast'

import eye from '../../assets/eye.svg'
import { useRecoilValue } from 'recoil'
import { userState } from '../Atoms/user'

export type EmployeeMasterFormProps = {
  editData?: CreateOrEditEmployeeMasterBody
  extraButton?: React.ReactNode
  onSuccess?: () => void
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

  if (isGetRoleDetailsLoading) {
    return <div>Loading...</div>
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    )

    try {
      if (!formData.employeeRole) {
        toast.error('Please select a role')
        return
      }

      if (!formData.ContactNo || formData.ContactNo.length !== 10) {
        throw new Error()
      }
      parseInt(formData.ContactNo as string, 10)
    } catch (err) {
      toast.error('Please enter a valid contact number')
      return
    }

    const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/)
    if (!formData.Email || !emailRegex.test(formData.Email as string)) {
      toast.error('Please enter a valid email')
      return
    }

    const data = {
      ...(props.editData || {}),
      ...formData,
      Command: props.editData ? 'Update' : 'Insert',
      Role_id: roleDetails?.find(
        (role: any) => role.role_Name === formData.employeeRole
      )?.roleID,
      ValidityDate: '1997-06-27',
      ContactNo: parseInt(formData.ContactNo as string, 10),
      UserID: String(user?.role.roleID),
      EMPSRNO: props.editData?.EmpSrNo,
      status: formData.workingStatus === 'active' ? 1 : 0
    } as unknown as CreateOrEditEmployeeMasterBody

    delete (data as any).employeeRole

    createOrEditMutationFn(
      { data, isEdit: !!props.editData },
      {
        onSuccess(data) {
          if (data == 0) {
            toast.error('Username already exists')
            return
          }
          toast.success(
            props.editData
              ? 'Employee Master updated successfully!'
              : 'Employee Master created successfully!'
          )
          navigate('/employee-master-list')
          if (props.onSuccess) props.onSuccess()
        },
        onError(err: any) {
          console.log({ err })
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
          name="Emp_Name"
          label="Full Name"
          required
          defaultValue={props.editData?.Emp_Name}
        />
        <TextInput
          disabled={isPending}
          name="ContactNo"
          label="Contact Number"
          required
          defaultValue={props.editData?.ContactNo}
        />
        <TextInput
          disabled={isPending}
          name="Email"
          label="Email"
          required
          defaultValue={props.editData?.Email}
        />

        <div className="flex flex-col gap-1 items-start justify-start">
          <label htmlFor="Select Role">Select Role</label>
          <select
            disabled={isPending || isGetRoleDetailsLoading}
            name="employeeRole" // handle before submit
            className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg shadow-md shadow-[#00000061]"
            defaultValue={
              (roleDetails || []).find(
                (d: any) => d.roleID === props.editData?.Role_id
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

        {props.editData ? (
          <>
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
          </>
        ) : null}

        <TextInput
          placeholder="user1"
          name="User_Name"
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
            name="Password"
            required={!props.editData}
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
