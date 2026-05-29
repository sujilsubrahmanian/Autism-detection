import React, { useState } from 'react'
import { saveHistory } from '../services/api'
import '../styles/Forms.css'

const initialPregnancy = {
  sugar_level: '',
  abortion_history: '',
  bmi: '',
  blood_pressure: '',
}

const initialMilestones = {
  weight: '',
  premature_birth: '',
  lifting_head_month: '',
  rolling_over_month: '',
  sitting_up_month: '',
  crawling_month: '',
  standing_with_support_month: '',
  standing_individually_month: '',
}

export default function History() {
  const [patientId, setPatientId] = useState('')
  const [pregnancy, setPregnancy] = useState(initialPregnancy)
  const [milestones, setMilestones] = useState(initialMilestones)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handlePregnancyChange = (e) =>
    setPregnancy((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleMilestoneChange = (e) =>
    setMilestones((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (!patientId) {
      setError('Please enter the Patient ID.')
      return
    }
    setLoading(true)
    try {
      await saveHistory(patientId, pregnancy, milestones)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h2>Patient History</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient ID</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Enter patient unique ID"
          />
        </div>

        <h3 className="section-title">Pregnancy Details</h3>
        {[
          { name: 'sugar_level', label: 'Sugar Level' },
          { name: 'abortion_history', label: 'Abortion History' },
          { name: 'bmi', label: 'BMI' },
          { name: 'blood_pressure', label: 'Blood Pressure' },
        ].map(({ name, label }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input
              type="text"
              name={name}
              value={pregnancy[name]}
              onChange={handlePregnancyChange}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}

        <h3 className="section-title">Birth & Milestones</h3>
        <div className="form-group">
          <label>Birth Weight</label>
          <input
            type="text"
            name="weight"
            value={milestones.weight}
            onChange={handleMilestoneChange}
            placeholder="e.g. 3.2 kg"
          />
        </div>
        <div className="form-group">
          <label>Premature Birth</label>
          <select
            name="premature_birth"
            value={milestones.premature_birth}
            onChange={handleMilestoneChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {[
          { name: 'lifting_head_month', label: 'Lifting Head (months)' },
          { name: 'rolling_over_month', label: 'Rolling Over (months)' },
          { name: 'sitting_up_month', label: 'Sitting Up (months)' },
          { name: 'crawling_month', label: 'Crawling (months)' },
          { name: 'standing_with_support_month', label: 'Standing with Support (months)' },
          { name: 'standing_individually_month', label: 'Standing Individually (months)' },
        ].map(({ name, label }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input
              type="number"
              name={name}
              value={milestones[name]}
              onChange={handleMilestoneChange}
              placeholder="Age in months"
              min="0"
            />
          </div>
        ))}

        {error && <p className="error-msg">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save History'}
        </button>
      </form>

      {success && (
        <div className="success-box">
          <p>✅ History saved successfully!</p>
        </div>
      )}
    </div>
  )
}
