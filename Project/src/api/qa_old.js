// Retrieve an authenticated API instance
// const getAuthenticatedApi = () => {
//   const token = localStorage.getItem('auth_token')
//   const expiry = localStorage.getItem('auth_token_expiry')
  
//   console.log('Debug - Token:', token ? token.substring(0, 20) + '...' : 'null')
//   console.log('Debug - Expiry:', expiry)
  
//   if (!token || !expiry || Date.now() > parseInt(expiry)) {
//     console.log('Debug - Token expired:', true)
//   }
  
//   return {
//     headers: {
//       'Authorization': token ? `Bearer ${token}` : '',
//       'Content-Type': 'application/json'
//     }
//   }
// }

const getAuthenticatedHeaders = () => {
  const token = localStorage.getItem('auth_token')
  const expiry = localStorage.getItem('auth_token_expiry')
  
  console.log('Debug - Token:', token)
  console.log('Debug - Expiry:', expiry)
  // Check whether the token has expired
  if (!token || !expiry || Date.now() > parseInt(expiry)) {
    console.log('Debug - Token is null or expired in prediction.js')
    return {}
  }
  console.log('Debug - Token is not null or expired in prediction.js')
  return {
    'Authorization': `Bearer ${token}`,
    // 'Content-Type': 'application/json'

  }
}

const API_BASE_URL = 'https://api.easy-eyefm.com/api'

/**
 * Call the QA endpoint to fetch responses
 * @param {Array<Array<string>>|{history: Array<Array<string>>}} payload Historical Q&A list
 */
export async function getResult(payload) {
  try {
    const headers = getAuthenticatedHeaders()
    
    const formData = new FormData()
    let historyPayload = payload

    if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
      historyPayload = payload.history ?? payload.historyText
    }

    if (!Array.isArray(historyPayload)) {
      throw new Error('History payload is required')
    }

    // con

    formData.append('history', JSON.stringify(historyPayload))

    console.log('Debug - History Payload:', historyPayload)

    console.log('Debug - Method:', 'POST')
    console.log('Debug - URL:', `${API_BASE_URL}/ai/prompt`)
    const response = await fetch(`${API_BASE_URL}/ai/prompt`, {
      method: 'POST',
      headers: headers,
      body: formData
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch AI response:', error)
    throw new Error(`Failed to fetch AI response: ${error.message}`)
  }
} 
