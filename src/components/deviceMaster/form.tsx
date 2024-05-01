import React from 'react'
import toast from 'react-hot-toast'
import TextInput from '../Input'
import { CreateDeviceMasterBody } from '../Api/endpoints'
import { useCreateOrEditDeviceMasterMutation } from '../Api'

export type DeviceMasterFormProps = {
  editData?: CreateDeviceMasterBody
}

const DeviceMasterForm: React.FC<DeviceMasterFormProps> = (props) => {
  const { mutate: createEditDeviceMasterFn, isPending } =
    useCreateOrEditDeviceMasterMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    )

    const data = {
      ...formData,
      DeviceID: parseInt(formData.DeviceID as string),
      BranchID: parseInt(formData.BranchID as string)
    } as CreateDeviceMasterBody

    createEditDeviceMasterFn(
      { data, isEdit: false },
      {
        onSuccess(data: any) {
          toast.success('Device Master created successfully!')
        },
        onError(error: any) {
          toast.error('An error occured!')
          console.log(error.message)
        }
      }
    )
  }

  return (
    <form
      className="mx-auto grid grid-cols-2 gap-x-8 gap-y-8 max-w-4xl"
      onSubmit={handleSubmit}
    >
      <TextInput
        type="number"
        disabled={isPending}
        value={props.editData?.DeviceID}
        required
        name="DeviceID"
        label="Device ID"
      />
      <TextInput
        disabled={isPending}
        value={props.editData?.DeviceNumber}
        required
        name="DeviceNumber"
        label="Device Number"
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
        disabled={isPending}
        value={props.editData?.SerialNo}
        required
        name="SerialNo"
        label="Serial Number"
      />
      <TextInput
        disabled={isPending}
        value={props.editData?.PortNo}
        required
        name="PortNo"
        label="Port Number"
      />
      <TextInput
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
        disabled={isPending}
        value={props.editData?.BranchName}
        required
        name="BranchName"
        label="Branch Name"
      />
      <TextInput
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

      {/* <div className="flex flex-col  gap-1">
              <label htmlFor="Set Image Location">Set Image Location</label>
              <div className="flex  gap-4">
                <input
                  type="text"
                  id="xValue"
                  name="xValue"
                  placeholder="X Value"
                  className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]"
                />
                <input
                  type="text"
                  id="yValue"
                  name="yValue"
                  placeholder="Y Value"
                  className="w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]"
                />
              </div>
            </div> */}
      <br />

      <div className="flex gap-4 items-center">
        <button
          disabled={isPending}
          className="px-8 py-[10px] rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061] cursor-pointer"
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
          className="px-8 py-3 bg-[#1C9FF6] rounded-lg text-white font-bold shadow-md shadow-[#00000061] cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default DeviceMasterForm
