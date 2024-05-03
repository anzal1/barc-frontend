import React from 'react'
import toast from 'react-hot-toast'
import TextInput from '../Input'
import { CreateDeviceMasterBody } from '../Api/endpoints'
import { useCreateOrEditDeviceMasterMutation } from '../Api'
import { useNavigate } from 'react-router-dom'

export type DeviceMasterFormProps = {
  editData?: CreateDeviceMasterBody
  extraButton?: React.ReactNode
}

const DeviceMasterForm: React.FC<DeviceMasterFormProps> = (props) => {
  const navigate = useNavigate()
  const { mutate: createEditDeviceMasterFn, isPending } =
    useCreateOrEditDeviceMasterMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    )

    // sanitinzation of DeviceIp
    const deviceIp = formData.DeviceIp as string
    if (!deviceIp) {
      toast.error('Device IP is required!')
      return
    }

    const ipParts = deviceIp.split('.')
    if (ipParts.length !== 4) {
      toast.error('Invalid IP address!')
      return
    }

    for (const part of ipParts) {
      const partNum = parseInt(part)
      if (isNaN(partNum) || partNum < 0 || partNum > 255) {
        toast.error('Invalid IP address!')
        return
      }
    }

    const data = {
      ...formData,
      BranchID: parseInt(formData.BranchID as string),
      X_Value: parseFloat(formData.X_Value as string),
      Y_Value: parseFloat(formData.Y_Value as string),
      DeviceID: 0
    } as CreateDeviceMasterBody

    createEditDeviceMasterFn(
      { data, isEdit: !!props.editData },
      {
        onSuccess() {
          toast.success('Device Master created successfully!')
          navigate('/device-master-list')
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
            value={props.editData?.DeviceID}
            required
            name="DeviceID"
            label="Device ID"
          />
        ) : null}
        <TextInput
          disabled={isPending}
          value={props.editData?.DeviceNumber}
          required
          name="DeviceNumber"
          label="Device Serial Number"
        />
        <TextInput
          disabled={isPending}
          value={props.editData?.DeviceName}
          required
          name="DeviceName"
          label="Device Name"
        />
        <TextInput
          disabled={isPending}
          value={props.editData?.Location}
          required
          name="Location"
          label="Device Location"
        />
        <TextInput
          type="number"
          disabled={isPending}
          value={props.editData?.BranchID}
          required
          name="BranchID"
          label="Branch ID"
        />
        <TextInput
          disabled={isPending}
          value={props.editData?.DeviceIp}
          required
          name="DeviceIp"
          label="Device IP"
        />
        <TextInput
          type="number"
          disabled={isPending}
          value={props.editData?.SerialNo}
          required
          name="SerialNo"
          label="Serial Number"
        />
        <TextInput
          type="number"
          disabled={isPending}
          value={props.editData?.PortNo}
          required
          name="PortNo"
          label="Port Number"
        />
        <TextInput
          type="number"
          disabled={isPending}
          value={props.editData?.MacID}
          required
          name="MacID"
          label="Mac ID"
        />
        <TextInput
          disabled={isPending}
          value={props.editData?.UserID}
          required
          name="UserID"
          label="User ID"
        />
        <TextInput
          type="number"
          disabled={isPending}
          value={props.editData?.RTSP}
          required
          name="RTSP"
          label="RTSP"
        />
        <TextInput
          disabled={isPending}
          value={props.editData?.status}
          required
          name="status"
          label="Device Status"
        />

        <div className="flex flex-col  gap-1">
          <label htmlFor="Set Image Location">
            Set Image Location <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              required
              type="text"
              id="X_Value"
              name="X_Value"
              placeholder="X Value"
              className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]"
            />
            <input
              required
              type="text"
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
            Save
          </button>
        </div>

        <div className="flex gap-4 items-center">{props.extraButton}</div>
      </div>
    </form>
  )
}

export default DeviceMasterForm
