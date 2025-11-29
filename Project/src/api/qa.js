// Build authenticated API headers
const getAuthenticatedHeaders = () => {
  const token = localStorage.getItem('auth_token')
  const expiry = localStorage.getItem('auth_token_expiry')
  
  // Check whether the token has expired
  if (!token || !expiry || Date.now() > parseInt(expiry)) {
    console.log('Debug - Token is null or expired in prediction.js')
    return {}
  }
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

const API_BASE_URL = 'https://api.easy-eyefm.com/api'

/**
 * 
[[q1, a1], [q2, None]]

[[q1, a1], [q2, a2]]
 */
export async function getResult(prompt) {
  try {
  
    console.log('Debug - Prompt:', prompt)

    // const formData = new FormData()
    // formData.append('prompt', prompt)

    const headers = getAuthenticatedHeaders()
    
    const response = await fetch(`${API_BASE_URL}/ai/prompt`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ prompt })   // Wrap in an object so the backend receives { prompt: ... }
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