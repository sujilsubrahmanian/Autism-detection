import React, { useState } from 'react'
import Navbar from './components/Navbar'
import About from './pages/About'
import Register from './pages/Register'
import History from './pages/History'
import DoctorLogin from './pages/DoctorLogin'
import Assessment from './pages/Assessment'
import Result from './pages/Result'
import './styles/App.css'

export default function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [doctorLoggedIn, setDoctorLoggedIn] = useState(false)
  const [result, setResult] = useState(null)

  const renderPage = () => {
    switch (activeSection) {
      case 'about':
        return <About />
      case 'register':
        return <Register />
      case 'history':
        return <History />
      case 'doctor-login':
        return (
          <DoctorLogin
            setDoctorLoggedIn={setDoctorLoggedIn}
            setActiveSection={setActiveSection}
          />
        )
      case 'assessment':
        return doctorLoggedIn ? (
          <Assessment setResult={setResult} setActiveSection={setActiveSection} />
        ) : (
          <DoctorLogin
            setDoctorLoggedIn={setDoctorLoggedIn}
            setActiveSection={setActiveSection}
          />
        )
      case 'result':
        return <Result result={result} setActiveSection={setActiveSection} />
      default:
        return <About />
    }
  }

  return (
    <div className="app-container">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        doctorLoggedIn={doctorLoggedIn}
      />
      <main className="main-content">{renderPage()}</main>
    </div>
  )
}
