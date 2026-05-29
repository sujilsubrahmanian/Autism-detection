const BASE_URL = 'http://localhost:8000'

export async function registerPatient(payload) {
  const response = await fetch(`${BASE_URL}/api/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Failed to register patient')
  return response.json()
}

export async function verifyPatient(unique_id) {
  const response = await fetch(`${BASE_URL}/api/verify-patient/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ unique_id }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Verification failed')
  return data
}

export async function saveHistory(patientID, pregnancyDetails, birthMilestones) {
  const response = await fetch(`${BASE_URL}/api/history/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ patientID, pregnancyDetails, birthMilestones }),
  })
  if (!response.ok) throw new Error('Failed to save history')
  return response.json()
}

export async function predictAutism(payload) {
  const response = await fetch(`${BASE_URL}/model/predict-autism/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Prediction request failed')
  return response.json()
}
