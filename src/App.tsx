import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login'
import { DashboardPage } from './pages/dashboard'
import DeviceMasterList from './pages/deviceMasterList'
import { DeviceMasterPage } from './pages/deviceMaster'
import EmployeeMasterPage from './pages/employeeMaster'
import { PrivateRoutes } from './components/ProtectedRoute/protectedRoute'
import { DeviceReports } from './pages/deviceReports'
import { EmployeeMasterListPage } from './pages/employeeMasterList'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/device-master" element={<DeviceMasterPage />} />
          <Route path="/device-master-list" element={<DeviceMasterList />} />
          <Route path="/employee-master" element={<EmployeeMasterPage />} />
          <Route path="/employee-master-list" element={<EmployeeMasterListPage />} />
          <Route path="/device-reports" element={<DeviceReports />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
