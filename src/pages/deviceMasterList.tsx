import { useNavigate } from 'react-router-dom'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import Table from '../components/Table'
import { NavType } from '../enums/navtype'
import {
  useDeleteDeviceMasterMutation,
  useGetDeviceMasterListQuery
} from '../components/Api'
import { CreateDeviceMasterBody } from '../components/Api/endpoints'
import React, { useState } from 'react'
import DeviceMasterForm from '../components/deviceMaster/form'
import Modal from '../components/Modal/modal'
import toast from 'react-hot-toast'

import cancel from '../assets/cancel.svg'
import edit from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'
import { useRecoilValue } from 'recoil'
import { userState } from '../components/Atoms/user'

type DeviceMasterType = {
  branchID: number
  branchName: string
  deviceID: number
  deviceIp: string
  deviceName: string
  deviceNumber: string
  location: string
  macID: string
  portNo: string
  rtsp: any
  serialNo: any
  status: any
  userID: any
  x_value: string | number
  y_value: string | number
}

const DeviceMasterList = () => {
  const user: any = useRecoilValue(userState)
  const { data, isPending: getDeviceMasterPending } =
    useGetDeviceMasterListQuery(user?.role?.roleID)
  const { isPending: isDeleteDevicePending, mutate: deleteDeviceFn } =
    useDeleteDeviceMasterMutation()
  const [deleteDeviceId, setDeleteDeviceId] = useState<number | null>(null)
  const [editData, setEditData] = React.useState<CreateDeviceMasterBody | null>(
    null
  )

  const handleEdit = (currentRow: DeviceMasterType) => {
    console.log(currentRow)

    const _editData: CreateDeviceMasterBody = {
      BranchID: currentRow.branchID,
      BranchName: currentRow.branchName,
      DeviceID: currentRow.deviceID,
      DeviceIp: currentRow.deviceIp,
      DeviceName: currentRow.deviceName,
      DeviceNumber: currentRow.deviceNumber,
      Location: currentRow.location,
      MacID: currentRow.macID,
      PortNo: currentRow.portNo,
      RTSP: currentRow.rtsp,
      SerialNo: currentRow.serialNo,
      status: currentRow.status,
      UserID: currentRow.userID,
      X_Value: String(currentRow.x_value) as any,
      Y_Value: String(currentRow.y_value) as any
    }
    setEditData(_editData)
  }

  const handleDeleteDevice = (deviceId: number | null) => {
    if (!deviceId) {
      toast.error('No device selected')
      return
    }

    deleteDeviceFn(deviceId, {
      onSuccess() {
        toast.success('Device deleted successfully')
      },
      onError() {
        toast.error('Failed to delete device')
      },
      onSettled() {
        setDeleteDeviceId(null)
      }
    })
  }

  const navigate = useNavigate()

  return (
    <Layout navType={NavType.FILLED}>
      <div className="h-full w-full px-6 py-4 justify-center items-center">
        <CustomCard
          header={
            <div className="flex  justify-between items-center h-full w-full ">
              <h1>Device Master List</h1>
              <div className="flex gap-6">
                <img
                  src={cancel}
                  className="w-10 h-10 cursor-pointer"
                  alt="cancel"
                  onClick={() => navigate('/device-master')}
                />
              </div>
            </div>
          }
        >
          <Modal
            type="fixed"
            open={!!deleteDeviceId}
            modalStyle="w-[500px] h-auto"
            onClose={() => setDeleteDeviceId(null)}
          >
            <div className="flex w-full flex-col bg-white border-1-[#1C9FF6] border-2 rounded-[10px] p-4 shadow-lg">
              <h3 className="font-bold text-lg">
                Are you sure, you want to delete the device {deleteDeviceId}
              </h3>

              <div className="flex items-center justify-between mt-8">
                <button
                  disabled={isDeleteDevicePending}
                  onClick={() => setDeleteDeviceId(null)}
                  className="px-6 py-2 rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={isDeleteDevicePending}
                  onClick={() => handleDeleteDevice(deleteDeviceId)}
                  className="px-6 py-2 rounded-lg font-bold bg-red-500 shadow-md shadow-[#00000061] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>

          {!getDeviceMasterPending ? (
            editData ? (
              <DeviceMasterForm
                editData={editData}
                extraButton={
                  <button
                    onClick={() => setEditData(null)}
                    className="px-8 py-[10px] rounded-lg font-bold border-2 border-[#1C9FF6] shadow-md shadow-[#00000061] cursor-pointer"
                  >
                    Cancel
                  </button>
                }
              />
            ) : (
              <Table<DeviceMasterType>
                columns={[
                  {
                    key: 'Sl.No.',
                    title: 'ID',
                    render: (_, __, t) => `${t + 1}`
                  },
                  { key: 'deviceName', title: 'Device Name' },
                  { key: 'DeviceNumber', title: 'Serial Number' },
                  { key: 'location', title: 'Device Location' },
                  { key: 'rtsp', title: 'RSTP Link' },
                  { key: 'status', title: 'Device Status' },
                  { key: 'x_value', title: 'X Value' },
                  { key: 'y_value', title: 'Y Value' },
                  {
                    key: 'actions',
                    title: 'Action',
                    render: (currentRow) => (
                      <div className="flex items-center justify-center gap-4 px-4">
                        <img
                          src={edit}
                          className="cursor-pointer"
                          onClick={() => handleEdit(currentRow)}
                          alt="edit"
                        />
                        <img
                          className="cursor-pointer"
                          onClick={() => setDeleteDeviceId(currentRow.deviceID)}
                          src={deleteIcon}
                          alt="delete"
                        />
                      </div>
                    )
                  }
                ]}
                data={data as any}
              />
            )
          ) : (
            <div className="flex items-center justify-center">Loading ...</div>
          )}
        </CustomCard>
      </div>
    </Layout>
  )
}

export default DeviceMasterList
