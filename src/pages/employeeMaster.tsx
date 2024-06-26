import { CustomCard } from '../components/Card/card'
import { NavType } from '../enums/navtype'
import Layout from '../components/Layout/layout'
import { useNavigate } from 'react-router-dom'
import EmployeeMasterForm from '../components/employeeMaster/form'

import list from '../assets/list.svg'
import cancel from '../assets/cancel.svg'

const EmployeeMasterPage = () => {
  const navigate = useNavigate()

  return (
    <Layout navType={NavType.FILLED}>
      <div className="h-full w-full p-12 justify-center items-center">
        <CustomCard
          header={
            <div className="flex  justify-between items-center h-full w-full ">
              <h1>Employee Master</h1>
              <div className="flex gap-6">
                <img
                  src={list}
                  className="w-10 h-10 cursor-pointer"
                  alt="list"
                  onClick={() => navigate('/employee-master-list')}
                />
                <img
                  src={cancel}
                  className="w-10 h-10 cursor-pointer"
                  alt="cancel"
                  onClick={() => navigate('/')}
                />
              </div>
            </div>
          }
        >
          <EmployeeMasterForm />
        </CustomCard>
      </div>
    </Layout>
  )
}

export default EmployeeMasterPage
