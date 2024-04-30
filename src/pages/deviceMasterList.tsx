import { useNavigate } from 'react-router-dom'
import { CustomCard } from '../components/Card/card'
import Layout from '../components/Layout/layout'
import Table from '../components/Table'
import { NavType } from '../enums/navtype'

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

const data: DeviceMasterType[] = [
  {
    deviceName: 'Security Camera 1',
    serialNumber: 'SN123456',
    deviceIP: '192.168.1.101',
    deviceLocation: 'Building A, Floor 1',
    rtspLink: 'rtsp://192.168.1.101:554/stream',
    devicePort: 554,
    deviceStatus: 'Online',
    imgLocation: '/images/security_camera_1.jpg'
  },
  {
    deviceName: 'Thermostat 1',
    serialNumber: 'SN654321',
    deviceIP: '192.168.1.102',
    deviceLocation: 'Living Room',
    rtspLink: '',
    devicePort: 0,
    deviceStatus: 'Offline',
    imgLocation: '/images/thermostat_1.jpg'
  },
  {
    deviceName: 'Smart Lock 1',
    serialNumber: 'SN789012',
    deviceIP: '192.168.1.103',
    deviceLocation: 'Front Door',
    rtspLink: '',
    devicePort: 0,
    deviceStatus: 'Online',
    imgLocation: '/images/smart_lock_1.jpg'
  },
  {
    deviceName: 'Temperature Sensor 1',
    serialNumber: 'SN456789',
    deviceIP: '192.168.1.104',
    deviceLocation: 'Kitchen',
    rtspLink: '',
    devicePort: 0,
    deviceStatus: 'Online',
    imgLocation: '/images/temperature_sensor_1.jpg'
  },
  {
    deviceName: 'Smart Bulb 1',
    serialNumber: 'SN098765',
    deviceIP: '192.168.1.105',
    deviceLocation: 'Bedroom',
    rtspLink: '',
    devicePort: 0,
    deviceStatus: 'Online',
    imgLocation: '/images/smart_bulb_1.jpg'
  },
  {
    deviceName: 'Motion Detector 1',
    serialNumber: 'SN135790',
    deviceIP: '192.168.1.106',
    deviceLocation: 'Hallway',
    rtspLink: '',
    devicePort: 0,
    deviceStatus: 'Offline',
    imgLocation: '/images/motion_detector_1.jpg'
  }
]

const DeviceMasterList = () => {
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
            data={data}
          />
        </CustomCard>
      </div>
    </Layout>
  )
}

export default DeviceMasterList
