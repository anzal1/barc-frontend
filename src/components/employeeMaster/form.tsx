import React, { useState } from 'react'
import TextInput from '../Input'
import { CreateOrEditEmployeeMasterBody } from '../Api/endpoints'
import { useNavigate } from 'react-router-dom'
import { useCreateOrEditEmployeeMasterMutation } from '../Api'
import toast from 'react-hot-toast'

export type EmployeeMasterFormProps = {
  editData?: CreateOrEditEmployeeMasterBody
  extraButton?: React.ReactNode
}

const EmployeeMasterForm: React.FC<EmployeeMasterFormProps> = (props) => {
  const navigate = useNavigate()
  const { mutate: createOrEditMutationFn, isPending } =
    useCreateOrEditEmployeeMasterMutation()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    )

    // TODO: handle data validation and sanitization here
    const data = {
      ...formData
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
        />
        <TextInput
          disabled={isPending}
          name="contactNumber"
          label="Contact Number"
          required
        />
        <TextInput disabled={isPending} name="email" label="Email" required />
        <TextInput
          disabled={isPending}
          name="employeeRole"
          label="Employee Role"
          required
        />

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
            src="/assets/eye.svg"
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