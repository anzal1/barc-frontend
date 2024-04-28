import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NavType } from './enums/navtype'
import { LoginPage } from './pages/login'
import Layout from './components/Layout/layout'
import { DashboardPage } from './pages/dashboard'
import DeviceMasterList from './pages/deviceMasterList'
import { DeviceMasterPage } from './pages/deviceMaster'
import EmployeeMasterPage from './pages/employeeMaster'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout navType={NavType.FILLED}>
              <DashboardPage />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <Layout navType={NavType.FADED}>
              <LoginPage />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
