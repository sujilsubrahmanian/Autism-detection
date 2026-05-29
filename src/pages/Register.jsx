import React, { useState } from 'react'
import { registerPatient } from '../services/api'
import '../styles/Forms.css'

export default function Register() {
  const [form, setForm] = useState({ name: '', age: '', gender: 'male' })
  const [uniqueId, setUniqueId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.age) {
      setError('Please fill in all fields.')
      return
    }
    const generatedId = `ID-${Math.floor(Math.random() * 100000)}`
    setLoading(true)
    try {
      await registerPatient({ ...form, unique_id: generatedId })
      setUniqueId(generatedId)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h2>Register Patient</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter patient name"
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter age"
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {uniqueId && (
        <div className="success-box">
          <p>✅ Patient registered successfully!</p>
          <p>
            <strong>Unique Patient ID:</strong>{' '}
            <span className="patient-id">{uniqueId}</span>
          </p>
          <p className="hint">Save this ID — doctors will need it to log in.</p>
        </div>
      )}
    </div>
  )
}
