import React, { FC, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

import TextInput from '../Input'
import { userState } from '../Atoms/user'
import { CreateDeviceMasterBody } from '../Api/endpoints'
import { useCreateOrEditDeviceMasterMutation } from '../Api'

export type DeviceMasterFormProps = {
  editData?: CreateDeviceMasterBody
  extraButton?: ReactNode
  onSuccess?: () => void
}

const DeviceMasterForm: FC<DeviceMasterFormProps> = (props) => {
  const navigate = useNavigate()
  const { mutate: createEditDeviceMasterFn, isPending } =
    useCreateOrEditDeviceMasterMutation()

  const user: any = useRecoilValue(userState)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    )
    // if (
    //   formData.status &&
    //   (formData.status as string).toUpperCase() !== 'Y' &&
    //   (formData.status as string).toUpperCase() !== 'N'
    // ) {
    //   toast.error('Invalid device status! Device Status is either Y or N')
    //   return
    // }

    // sanitinzation of DeviceIp
    const deviceIp = formData.DeviceIp as string
    if (!deviceIp) {
      toast.error('Device IP is required!')
      return
    }

    const ipParts = deviceIp.split('.')
    if (ipParts.length !== 4) {
      toast.error('Please enter valid Device IP!')
      return
    }

    const macAddress = formData.MacID as string
    const x = parseFloat(formData.X_Value as any)
    const y = parseFloat(formData.Y_Value as any)
    if (isNaN(x) || isNaN(y)) {
      toast.error('X and Y have invalid values')
      return
    }

    const macAddressRegexCheck1 = new RegExp(
      '^([0-9a-fA-F][0-9a-fA-F]-){5}([0-9a-fA-F][0-9a-fA-F])$'
    )
    const macAddressRegexCheck2 = new RegExp(
      '^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$'
    )

    if (
      !macAddressRegexCheck1.test(macAddress) &&
      !macAddressRegexCheck2.test(macAddress)
    ) {
      toast.error('Invalid Format for Mac Address')
      return
    }

    for (const part of ipParts) {
      const partNum = parseInt(part)
      if (isNaN(partNum) || partNum < 0 || partNum > 255) {
        toast.error('Please enter valid Device IP!')
        return
      }
    }

    if (isNaN(parseFloat(formData.X_Value as string))) {
      toast.error('Invalid X Value! Must be a floating point number')
      return
    }

    if (isNaN(parseFloat(formData.Y_Value as string))) {
      toast.error('Invalid Y Value! Must be a floating point number')
      return
    }

    const data = {
      ...formData,
      DeviceID: parseInt((formData.DeviceID || 0) as string),
      BranchID: 1,
      UserID: user?.role?.roleID.toString() || '2',
      X_Value: parseFloat(formData.X_Value as string),
      Y_Value: parseFloat(formData.Y_Value as string),
      ...(formData.status
        ? { status: (formData.status as string).toUpperCase() }
        : { status: null })
    } as CreateDeviceMasterBody

    createEditDeviceMasterFn(
      { data, isEdit: !!props.editData },
      {
        onSuccess() {
          toast.success(
            props.editData
              ? 'Device master updated successfully!'
              : 'Device master created successfully!'
          )
          navigate('/device-master-list')
          if (props.onSuccess) props.onSuccess()
        },
        onError() {
          toast.error('An error occured!')
        }
      }
    )
  }

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    ;(e.target as HTMLButtonElement).form?.reset()
  }

  return (
    <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-4">
        {props.editData ? (
          <TextInput
            type="number"
            disabled={isPending}
            defaultValue={props.editData?.DeviceID || 0}
            required
            name="DeviceID"
            label="Device ID"
          />
        ) : null}
        {/* <TextInput
          disabled={isPending}
          defaultValue={props.editData?.DeviceNumber}
          required
          name="DeviceNumber"
          label="Device Serial Number"
        /> */}
        <TextInput
          disabled={isPending}
          defaultValue={props.editData?.DeviceName}
          required
          name="DeviceName"
          label="Device Name"
        />
        <TextInput
          disabled={isPending}
          defaultValue={props.editData?.Location}
          required
          name="Location"
          label="Device Location"
        />
        {/* <TextInput
          type="number"
          disabled={isPending}
          value={props.editData?.BranchID}
          required
          name="BranchID"
          label="Branch ID"
        /> */}
        <TextInput
          disabled={isPending}
          defaultValue={props.editData?.DeviceIp}
          required
          name="DeviceIp"
          label="Device IP"
        />
        <TextInput
          type="number"
          disabled={isPending}
          defaultValue={props.editData?.SerialNo}
          required
          name="SerialNo"
          label="Serial Number"
        />
        <TextInput
          type="number"
          disabled={isPending}
          defaultValue={props.editData?.PortNo}
          required
          name="PortNo"
          label="Port Number"
        />
        <TextInput
          disabled={isPending}
          defaultValue={props.editData?.MacID}
          required
          name="MacID"
          label="Mac ID"
        />
        {/* <TextInput
          disabled={isPending}
          value={props.editData?.UserID}
          required
          name="UserID"
          label="User ID"
        /> */}
        <TextInput
          type="text"
          disabled={isPending}
          defaultValue={props.editData?.RTSP}
          required
          name="RTSP"
          label="RTSP"
        />
        {props.editData && (
          <TextInput
            disabled={isPending}
            defaultValue={props.editData?.status}
            required
            name="status"
            label="Device Status"
          />
        )}

        <div className="flex flex-col  gap-1">
          <label htmlFor="Set Image Location">
            Set Image Location <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              required
              type="text"
              defaultValue={props.editData?.X_Value}
              id="X_Value"
              name="X_Value"
              placeholder="X Value"
              className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]"
            />
            <input
              required
              type="text"
              defaultValue={props.editData?.Y_Value}
              id="Y_Value"
              name="Y_Value"
              placeholder="Y Value"
              className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]"
            />
          </div>
        </div>
      </div>

      <br />

      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <button
            disabled={isPending}
            className="px-8 py-[10px] rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061] cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            disabled={isPending}
            type="submit"
            className="px-8 py-3 bg-[#1C9FF6] rounded-lg text-white font-bold shadow-md shadow-[#00000061] cursor-pointer"
          >
            {props.editData ? 'Update' : 'Save'}
          </button>
        </div>

        <div className="flex gap-4 items-center">{props.extraButton}</div>
      </div>
    </form>
  )
}

export default DeviceMasterForm
