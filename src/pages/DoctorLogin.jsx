import React, { useState } from 'react'
import { verifyPatient } from '../services/api'
import '../styles/Forms.css'

export default function DoctorLogin({ setDoctorLoggedIn, setActiveSection }) {
  const [form, setForm] = useState({ patientName: '', patientId: '', doctorType: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const { patientName, patientId, doctorType } = form
    if (!patientName || !patientId || !doctorType) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      const data = await verifyPatient(patientId)
      if (data.message === 'Patient found') {
        setDoctorLoggedIn(true)
        setActiveSection('assessment')
      } else {
        setError(data.message || 'Patient not found.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h2>Doctor Login</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
          />
        </div>
        <div className="form-group">
          <label>Patient ID</label>
          <input
            type="text"
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            placeholder="Enter unique patient ID"
          />
        </div>
        <div className="form-group">
          <label>Doctor Type</label>
          <select name="doctorType" value={form.doctorType} onChange={handleChange}>
            <option value="">Select Doctor Type</option>
            <option value="pediatrician">Pediatrician</option>
            <option value="psychologist">Psychologist</option>
            <option value="psychiatrist">Psychiatrist</option>
          </select>
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
