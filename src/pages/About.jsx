import React from 'react'
import '../styles/About.css'

export default function About() {
  return (
    <div className="page-container about-page">
      <h2>About This Tool</h2>
      <p>
        This is an autism detection tool designed to help identify early signs of
        autism spectrum disorder (ASD) in individuals across different age groups.
      </p>
      <p>
        By entering clinical assessment scores such as ADOS, SRS, and IQ measures,
        our machine-learning model provides a prediction to assist healthcare
        professionals in their evaluation process.
      </p>
      <div className="about-steps">
        <div className="step">
          <span className="step-number">1</span>
          <p>Register the patient to generate a unique ID.</p>
        </div>
        <div className="step">
          <span className="step-number">2</span>
          <p>Optionally fill in pregnancy and birth milestone history.</p>
        </div>
        <div className="step">
          <span className="step-number">3</span>
          <p>Doctor logs in with the patient ID and runs the assessment.</p>
        </div>
        <div className="step">
          <span className="step-number">4</span>
          <p>View the prediction result instantly.</p>
        </div>
      </div>
    </div>
  )
}
