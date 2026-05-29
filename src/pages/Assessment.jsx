import React, { useState } from 'react'
import { predictAutism } from '../services/api'
import '../styles/Assessment.css'

const CATEGORIES = ['0-3', '3-5', '6-12', '13+']

// Fields per category: name, label, required (true = shown)
const CATEGORY_FIELDS = {
  '0-3': ['patientId', 'AGE', 'SEX', 'ADOS_TOTAL', 'ADOS_COMM', 'ADOS_SOCIAL', 'ADOS_STEREO_BEHAV', 'SRS_RAW_TOTAL'],
  '3-5': ['patientId', 'AGE', 'SEX', 'FIQ', 'VIQ', 'ADOS_TOTAL', 'ADOS_COMM', 'ADOS_SOCIAL', 'ADOS_STEREO_BEHAV', 'SRS_RAW_TOTAL'],
  '6-12': ['patientId', 'AGE', 'SEX', 'FIQ', 'VIQ', 'PIQ', 'ADOS_TOTAL', 'ADOS_COMM', 'ADOS_SOCIAL', 'ADOS_STEREO_BEHAV', 'SRS_RAW_TOTAL', 'AQ_TOTAL'],
  '13+':  ['patientId', 'AGE', 'SEX', 'FIQ', 'VIQ', 'PIQ', 'ADOS_TOTAL', 'ADOS_COMM', 'ADOS_SOCIAL', 'ADOS_STEREO_BEHAV', 'SRS_RAW_TOTAL', 'AQ_TOTAL'],
}

const FIELD_LABELS = {
  patientId: 'Patient ID',
  AGE: 'Age',
  SEX: 'Sex (1 = Male, 2 = Female)',
  FIQ: 'Full IQ (FIQ)',
  VIQ: 'Verbal IQ (VIQ)',
  PIQ: 'Performance IQ (PIQ)',
  ADOS_TOTAL: 'ADOS Total',
  ADOS_COMM: 'ADOS Communication',
  ADOS_SOCIAL: 'ADOS Social',
  ADOS_STEREO_BEHAV: 'ADOS Stereotyped Behaviour',
  SRS_RAW_TOTAL: 'SRS Raw Total',
  AQ_TOTAL: 'AQ Total',
}

const emptyForm = () =>
  Object.keys(FIELD_LABELS).reduce((acc, k) => ({ ...acc, [k]: '' }), {})

export default function Assessment({ setResult, setActiveSection }) {
  const [selectedCategory, setSelectedCategory] = useState('13+')
  const [forms, setForms] = useState({
    '0-3': emptyForm(),
    '3-5': emptyForm(),
    '6-12': emptyForm(),
    '13+': emptyForm(),
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field, value) => {
    setForms((prev) => ({
      ...prev,
      [selectedCategory]: { ...prev[selectedCategory], [field]: value },
    }))
  }

  const handleSubmit = async () => {
    setError('')
    const data = forms[selectedCategory]
    if (!data.AGE || isNaN(data.AGE)) {
      setError('Please enter a valid Age.')
      return
    }
    setLoading(true)
    try {
      const result = await predictAutism(data)
      setResult(result)
      setActiveSection('result')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const currentFields = CATEGORY_FIELDS[selectedCategory]
  const currentForm = forms[selectedCategory]

  return (
    <div className="page-container assessment-page">
      <h2>Assessment</h2>

      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === '13+' ? '13+ years' : `${cat} years`}
          </button>
        ))}
      </div>

      <div className="form-card">
        <h3>Age Group: {selectedCategory} years</h3>
        {currentFields.map((field) => (
          <div className="form-group" key={field}>
            <label>{FIELD_LABELS[field]}</label>
            <input
              type={field === 'patientId' ? 'text' : 'number'}
              value={currentForm[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter ${FIELD_LABELS[field]}`}
            />
          </div>
        ))}
        {error && <p className="error-msg">{error}</p>}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Predicting...' : 'Submit & Predict'}
        </button>
      </div>
    </div>
  )
}
