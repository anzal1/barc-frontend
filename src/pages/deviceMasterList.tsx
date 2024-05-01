import { useNavigate } from 'react-router-dom'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import Table from '../components/Table'
import { NavType } from '../enums/navtype'
import { getDeviceMasterListQuery } from '../components/Api'

type DeviceMasterType = {
  deviceName: string
  serialNumber: string
  deviceIP: string
  deviceLocation: string
  rtspLink: string
  devicePort: number
  deviceStatus: string
  imgLocation: string
}

const DeviceMasterList = () => {
  const { data, isPending } = getDeviceMasterListQuery()
  console.log(data)
  // /Device/GetDeviceDetails?branchid=1

  const handleEdit = (currentRow: DeviceMasterType) => {
    console.log('handleEdit called', currentRow)
  }

  const handleDelete = (currentRow: DeviceMasterType) => {
    console.log('handleDelete called', currentRow)
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
          {!isPending ? (
            <Table<DeviceMasterType>
              columns={[
                {
                  key: 'Sl.No.',
                  title: 'ID',
                  render: (_, __, t) => `${t + 1}`
                },
                { key: 'deviceName', title: 'Device Name' },
                { key: 'serialNumber', title: 'Serial Number' },
                { key: 'deviceIP', title: 'Device IP' },
                { key: 'deviceLocation', title: 'Device Location' },
                { key: 'rtspLink', title: 'RSTP Link' },
                { key: 'devicePort', title: 'Device Port' },
                { key: 'deviceStatus', title: 'Device Status' },
                { key: 'imgLocation', title: 'Img Location' },
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
                        onClick={() => handleDelete(currentRow)}
                        src="/assets/delete.svg"
                        alt="delete"
                      />
                    </div>
                  )
                }
              ]}
              data={data as any}
            />
          ) : null}
        </CustomCard>
      </div>
    </Layout>
  )
}

export default DeviceMasterList
