import { useCreateOrEditDeviceMasterMutation } from '../Api'
import { CreateDeviceMasterBody } from '../Api/endpoints'
import { userState } from '../Atoms/user'
import TextInput from '../Input'
import React, { FC, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

export type DeviceMasterFormProps = {
	editData?: CreateDeviceMasterBody
	extraButton?: ReactNode
	onSuccess?: () => void
}

const validateIp = (ip: string) => {
	const ipParts = ip.split('.')
	if (ipParts.length !== 4) {
		return false
	}

	for (const part of ipParts) {
		const partNum = parseInt(part)
		if (isNaN(partNum) || partNum < 0 || partNum > 255) {
			return false
		}
	}

	return true
}

const DeviceMasterForm: FC<DeviceMasterFormProps> = (props) => {
	const navigate = useNavigate()
	const { mutate: createEditDeviceMasterFn, isPending } = useCreateOrEditDeviceMasterMutation()

	const user: any = useRecoilValue(userState)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()
		const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())
		// if (
		//   formData.status &&
		//   (formData.status as string).toUpperCase() !== 'Y' &&
		//   (formData.status as string).toUpperCase() !== 'N'
		// ) {
		//   toast.error('Invalid device status! Device Status is either Y or N')
		//   return
		// }

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

		if (!macAddressRegexCheck1.test(macAddress) && !macAddressRegexCheck2.test(macAddress)) {
			toast.error('Invalid Format for Mac Address')
			return
		}

		if (!validateIp(formData.camereIp as string)) {
			toast.error('Invalid Camera IP Address')
			return
		}

		if (!validateIp(formData.DeviceIp as string)) {
			toast.error('Invalid Device IP Address')
			return
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
				onSuccess(res: any) {
					if (res <= 0) {
						toast.error('An error occured!')
						return
					}

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
			<div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-8">
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

				<div className="flex flex-col gap-1">
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
							className="h-12 w-full rounded-lg border border-none bg-[#e8e8e8] p-4 shadow-md shadow-[#00000061]"
						/>
						<input
							required
							type="text"
							defaultValue={props.editData?.Y_Value}
							id="Y_Value"
							name="Y_Value"
							placeholder="Y Value"
							className="h-12 w-full rounded-lg border border-none bg-[#e8e8e8] p-4 shadow-md shadow-[#00000061]"
						/>
					</div>
				</div>

				<TextInput
					disabled={isPending}
					defaultValue={props.editData?.camereIp}
					required
					name="camereIp"
					label="camera IP"
				/>

				<div className="flex flex-col gap-1">
					<label htmlFor="deviceType">
						Device Category <span className="text-red-500">*</span>
					</label>
					<select
						required
						id="deviceType"
						name="deviceType"
						defaultValue={props.editData?.deviceType}
						className="h-12 rounded-lg border border-none bg-[#e8e8e8] p-2 shadow-md shadow-[#00000061]"
					>
						<option value="">Select Device Category</option>
						<option value="master">Master</option>
						<option value="slave">Slave</option>
					</select>
				</div>
			</div>

			<br />

			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<button
						disabled={isPending}
						className="cursor-pointer rounded-lg border-2 border-[#1C9FF6] px-8 py-[10px] font-bold shadow-md shadow-[#00000061]"
						onClick={handleReset}
					>
						Reset
					</button>
					<button
						disabled={isPending}
						type="submit"
						className="cursor-pointer rounded-lg bg-[#1C9FF6] px-8 py-3 font-bold text-white shadow-md shadow-[#00000061]"
					>
						{props.editData ? 'Update' : 'Save'}
					</button>
				</div>

				<div className="flex items-center gap-4">{props.extraButton}</div>
			</div>
		</form>
	)
}

export default DeviceMasterForm
