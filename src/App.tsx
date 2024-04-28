import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './pages/home'
import DeviceMasterList from './pages/deviceMasterList'
import Layout from './components/Layout/layout'
import { DeviceMasterPage } from './pages/deviceMaster'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/device-master"
          element={
            <Layout>
              <DeviceMasterPage />
            </Layout>
          }
        />

        <Route
          path="/device-master-list"
          element={
            <Layout>
              <DeviceMasterList />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
