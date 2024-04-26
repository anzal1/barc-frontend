import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/home'
import Layout from './components/Layout/layout'
import { DeviceMasterPage } from './pages/deviceMaster'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
