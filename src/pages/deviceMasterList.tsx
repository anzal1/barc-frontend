import { useNavigate } from 'react-router-dom'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import Table from '../components/Table'
import { NavType } from '../enums/navtype'
import { useGetDeviceMasterListQuery } from '../components/Api'
import { CreateDeviceMasterBody } from '../components/Api/endpoints'
import React, { useState } from 'react'
import DeviceMasterForm from '../components/deviceMaster/form'
import Modal from '../components/Modal/modal'

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
  const { data, isPending } = useGetDeviceMasterListQuery()
  const [deleteDeviceId, setDeleteDeviceId] = useState<number | null>(null)
  const [editData, setEditData] = React.useState<CreateDeviceMasterBody | null>(
    null
  )

  const handleEdit = (currentRow: DeviceMasterType) => {
    const editData: CreateDeviceMasterBody = {
      BranchID: currentRow.branchID,
      BranchName: currentRow.branchName,
      DeviceID: currentRow.deviceID,
      DeviceIp: currentRow.deviceIp,
      DeviceName: currentRow.deviceName,
      DeviceNumber: currentRow.deviceName,
      Location: currentRow.location,
      MacID: currentRow.macID,
      PortNo: currentRow.portNo,
      RTSP: currentRow.rtsp,
      SerialNo: currentRow.serialNo,
      status: currentRow.status,
      UserID: currentRow.userID
    }
    setEditData(editData)
  }

  const handleDelete = (currentRow: DeviceMasterType) => {
    //
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
                  src="/assets/cancel.svg"
                  className="w-10 h-10 cursor-pointer"
                  alt="cancel"
                  onClick={() => navigate('/device-master')}
                />
              </div>
            </div>
          }
        >
          <Modal
            open={!!deleteDeviceId}
            onClose={() => setDeleteDeviceId(null)}
            type="fixed"
            modalStyle="w-80 h-80"
          >
            <div className="flex flex-col gap-6 max-w-xs bg-white border-1-[#1C9FF6] border-2 rounded-[10px] p-4 shadow-lg">
              {JSON.stringify({ deviceID: deleteDeviceId })}
            </div>
          </Modal>

          {!isPending ? (
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
                  { key: 'serialNo', title: 'Serial Number' },
                  { key: 'branchID', title: 'Branch ID' },
                  { key: 'deviceID', title: 'Device ID' },
                  { key: 'deviceNumber', title: 'Device Number' },
                  { key: 'location', title: 'Device Location' },
                  { key: 'macID', title: 'MAC ID' },
                  { key: 'rtsp', title: 'RSTP Link' },
                  { key: 'portNo', title: 'Device Port' },
                  { key: 'status', title: 'Device Status' },
                  {
                    key: 'actions',
                    title: 'Action',
                    render: (currentRow) => (
                      <div className="flex items-center justify-center gap-4">
                        <img
                          src="/assets/edit.svg"
                          className="cursor-pointer"
                          onClick={() => handleEdit(currentRow)}
                          alt="edit"
                        />
                        <img
                          className="cursor-pointer"
                          onClick={() => setDeleteDeviceId(currentRow.deviceID)}
                          src="/assets/delete.svg"
                          alt="delete"
                        />
                      </div>
                    )
                  }
                ]}
                data={data as any}
              />
            )
          ) : null}
        </CustomCard>
      </div>
    </Layout>
  )
}

export default DeviceMasterList
