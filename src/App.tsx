import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavType } from './enums/navtype'
import { LoginPage } from './pages/login'
import Layout from './components/Layout/layout'
import { DashboardPage } from './pages/dashboard'
import DeviceMasterList from './pages/deviceMasterList'
import { DeviceMasterPage } from './pages/deviceMaster'
import EmployeeMasterPage from './pages/employeeMaster'
import { PrivateRoutes } from './components/ProtectedRoute/protectedRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={
              <Layout navType={NavType.FILLED}>
                <DashboardPage />
              </Layout>
            }
          />

          <Route
            path="/device-master"
            element={
              <Layout navType={NavType.FILLED}>
                <DeviceMasterPage />
              </Layout>
            }
          />

          <Route
            path="/device-master-list"
            element={
              <Layout navType={NavType.FADED}>
                <DeviceMasterList />
              </Layout>
            }
          />

          <Route
            path="/employee-master"
            element={
              <Layout navType={NavType.FILLED}>
                <EmployeeMasterPage />
              </Layout>
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <Layout navType={NavType.FADED}>
              <LoginPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
