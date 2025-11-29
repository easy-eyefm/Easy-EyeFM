/**
 * Prediction-related API helpers
 */

// Build authenticated request headers
const getAuthenticatedHeaders = () => {
  const token = localStorage.getItem('auth_token')
  const expiry = localStorage.getItem('auth_token_expiry')
  
  // Bail out if the token has expired
  if (!token || !expiry || Date.now() > parseInt(expiry)) {
    console.log('Debug - Token is null or expired in prediction.js')
    return {}
  }
  
  return {
    'Authorization': `Bearer ${token}`
  }
}

const API_BASE_URL = 'https://api.easy-eyefm.com/api'

/**
 * Kick off a prediction task
 * @param {string} modelId - Model identifier
 * @param {File} imageFile - Image file payload
 * @returns {Promise<{success: boolean, prediction_id: string, message: string}>}
 */
export async function startPrediction(modelId, imageFile) {
  try {
    const formData = new FormData()
    formData.append('model_id', modelId)
    formData.append('file', imageFile)
    
    const headers = getAuthenticatedHeaders()
    
    const response = await fetch(`${API_BASE_URL}/predict`, {
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
    console.error('Failed to start prediction:', error)
    throw new Error(`Failed to start prediction: ${error.message}`)
  }
}

/**
 * Retrieve prediction task status
 * @param {string} predictionId - Prediction identifier
 * @returns {Promise<{success: boolean, data: Object}>}
 */
export async function getPredictionStatus(predictionId) {
  try {
    const headers = getAuthenticatedHeaders()
    const response = await fetch(`${API_BASE_URL}/predict/status/${predictionId}`, {
      method: 'GET',
      headers: headers
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch prediction status:', error)
    throw new Error(`Failed to fetch prediction status: ${error.message}`)
  }
}

/**
 * Upload an image for prediction
 * @param {File} imageFile - Image file payload
 * @returns {Promise<{success: boolean, file_id: string, message: string}>}
 */
export async function uploadPredictImage(imageFile) {
  try {
    const formData = new FormData()
    formData.append('file', imageFile)
    
    const headers = getAuthenticatedHeaders()
    
    const response = await fetch(`${API_BASE_URL}/predict/upload`, {
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
    console.error('Failed to upload prediction image:', error)
    throw new Error(`Failed to upload prediction image: ${error.message}`)
  }
}
