import React from 'react'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { key: 'about', label: 'About' },
  { key: 'register', label: 'Register' },
  { key: 'history', label: 'History' },
  { key: 'doctor-login', label: 'Doctor Login' },
]

export default function Navbar({ activeSection, setActiveSection, doctorLoggedIn }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">🧠 Autism Detection</div>
      <ul className="navbar-links">
        {NAV_ITEMS.map(({ key, label }) => (
          <li
            key={key}
            className={`nav-item ${activeSection === key ? 'active' : ''}`}
            onClick={() => setActiveSection(key)}
          >
            {label}
          </li>
        ))}
        {doctorLoggedIn && (
          <li
            className={`nav-item ${activeSection === 'assessment' ? 'active' : ''}`}
            onClick={() => setActiveSection('assessment')}
          >
            Assessment
          </li>
        )}
        {doctorLoggedIn && (
          <li
            className={`nav-item ${activeSection === 'result' ? 'active' : ''}`}
            onClick={() => setActiveSection('result')}
          >
            Result
          </li>
        )}
      </ul>
    </nav>
  )
}
