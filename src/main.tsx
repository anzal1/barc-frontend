import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Layout from './components/Layout/layout'
import { DeviceMasterPage } from './pages/deviceMaster'
import { LoginPage } from './pages/login'
import { DashboardPage } from './pages/dashboard'
import { NavType } from './enums/navtype'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
