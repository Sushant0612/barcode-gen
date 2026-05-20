import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import QrPage from './pages/QrPage'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<QrPage />} />
      </Routes>
    </>

  )
}

export default App
