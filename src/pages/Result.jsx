import React from 'react'
import '../styles/Result.css'

export default function Result({ result, setActiveSection }) {
  if (!result) {
    return (
      <div className="page-container result-page">
        <h2>Result</h2>
        <p className="no-result">No result yet. Please complete an assessment first.</p>
        <button onClick={() => setActiveSection('assessment')}>Go to Assessment</button>
      </div>
    )
  }

  const isAutistic = result.prediction !== 1
  const probability = result.probability
    ? result.probability.map((p) => `${(p * 100).toFixed(1)}%`).join(' / ')
    : 'N/A'

  return (
    <div className="page-container result-page">
      <h2>Prediction Result</h2>
      <div className={`result-card ${isAutistic ? 'autistic' : 'not-autistic'}`}>
        <div className="result-badge">{isAutistic ? '⚠️ Autistic' : '✅ Not Autistic'}</div>
        <div className="result-details">
          <p>
            <strong>Patient ID:</strong> {result.patientId || '—'}
          </p>
          <p>
            <strong>Age:</strong> {result.age || '—'}
          </p>
          <p>
            <strong>Prediction:</strong>{' '}
            <span className={isAutistic ? 'label-autistic' : 'label-not-autistic'}>
              {isAutistic ? 'Autistic' : 'Not Autistic'}
            </span>
          </p>
          <p>
            <strong>Probability (Not Autistic / Autistic):</strong> {probability}
          </p>
        </div>
        <p className="disclaimer">
          ⚕️ This result is a screening aid only. A qualified professional should confirm any diagnosis.
        </p>
      </div>
    </div>
  )
}
