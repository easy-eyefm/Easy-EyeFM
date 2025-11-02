/**
 * Training task API helpers
 * Supports polling and (future) WebSocket updates
 */

import authService from './auth.js'

// Build an authenticated API configuration
const getAuthenticatedApi = () => {
  const token = localStorage.getItem('auth_token')
  const expiry = localStorage.getItem('auth_token_expiry')
  
  console.log('Debug - Token:', token ? token.substring(0, 20) + '...' : 'null')
  console.log('Debug - Expiry:', expiry)
  
  if (expiry) {
    const isExpired = Date.now() > parseInt(expiry)
    console.log('Debug - Token expired:', isExpired)
  }
  
  return {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  }
}

const API_BASE_URL = 'https://api.easy-eyefm.com/api'

// Enumerated task status values
export const TaskStatus = {
  PENDING: 'pending',
  RUNNING: 'running', 
  COMPLETED: 'completed',
  FAILED: 'failed'
}

/**
 * Upload a training dataset with progress callbacks
 * @param {File} file - File to upload
 * @param {Function} onProgress - Progress callback (progress, loaded, total, speed)
 * @param {Function} onCancel - Cancel callback
 * @returns {Promise<{success: boolean, file_id: string, message: string}>}
 */
export async function uploadFile(file, onProgress, onCancel) {
  return new Promise((resolve, reject) => {
    console.log('Starting upload:', file.name, 'size:', file.size)
    
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append('file', file)
    
    // Progress-related tracking
    let startTime = Date.now()
    let lastLoaded = 0
    let lastTime = startTime
    
    // Progress event
    xhr.upload.addEventListener('progress', (event) => {
      try {
        if (event.lengthComputable && onProgress && typeof onProgress === 'function') {
          const now = Date.now()
          const timeDiff = now - lastTime
          const bytesDiff = event.loaded - lastLoaded
          
          // Calculate upload speed (MB/s)
          const speed = timeDiff > 0 ? (bytesDiff / 1024 / 1024) / (timeDiff / 1000) : 0
          
          // Calculate progress percentage
          const progress = Math.round((event.loaded / event.total) * 100)
          
          // Calculate estimated remaining time (ETA)
          const totalTime = (Date.now() - startTime) / 1000
          const uploadedRatio = event.loaded / event.total
          const eta = uploadedRatio > 0.01 ? (totalTime / uploadedRatio) - totalTime : 0
          
          const progressData = {
            progress: Math.min(100, Math.max(0, progress)),
            loaded: event.loaded,
            total: event.total,
            speed: Math.max(0, speed),
            eta: Math.max(0, Math.round(eta)),
            percentage: Math.min(100, Math.max(0, progress))
          }
          
          console.log('Upload progress:', progressData)
          onProgress(progressData)
          
          lastLoaded = event.loaded
          lastTime = now
        }
      } catch (error) {
        console.warn('Progress callback error:', error)
      }
    })
    
    // Success handler
    xhr.addEventListener('load', () => {
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = JSON.parse(xhr.responseText)
          resolve(result)
        } else {
          try {
            const errorData = xhr.responseText ? JSON.parse(xhr.responseText) : {}
            reject(new Error(errorData.detail || `HTTP error! status: ${xhr.status}`))
          } catch (parseError) {
            reject(new Error(`HTTP error! status: ${xhr.status}`))
          }
        }
      } catch (error) {
        reject(new Error(`Failed to parse response: ${error.message}`))
      }
    })
    
    // Error handler
    xhr.addEventListener('error', () => {
      reject(new Error('Network connection failed'))
    })
    
    // Abort handler
    xhr.addEventListener('abort', () => {
      reject(new Error('Upload canceled'))
    })
    
    // Timeout handler
    xhr.addEventListener('timeout', () => {
      reject(new Error('Upload timed out'))
    })
    
    // Set request timeout (30 minutes)
    xhr.timeout = 30 * 60 * 1000
    
    // Allow canceling the upload
    if (onCancel) {
      onCancel(() => {
        xhr.abort()
      })
    }
    
    // Open the request
    xhr.open('POST', `${API_BASE_URL}/training/upload`)
    
    // Apply headers (must follow xhr.open())
    const authConfig = getAuthenticatedApi()
    Object.entries(authConfig.headers).forEach(([key, value]) => {
      if (key !== 'Content-Type' && value) {
        xhr.setRequestHeader(key, value)
      }
    })
    
    // Send the request
    xhr.send(formData)
  })
}

/**
 * Start a training task
 * @param {Object} trainingData - Training configuration
 * @param {string} trainingData.description - Training goal description
 * @param {string} trainingData.modelName - Model name
 * @param {string} [trainingData.baseModel] - Selected base model
 * @param {string} trainingData.fileId - Uploaded file ID (optional)
 * @param {string} trainingData.fileName - File name (optional)
 * @param {number} trainingData.fileSize - File size (optional)
 * @returns {Promise<{success: boolean, task_id: string, message: string}>}
 */
export async function startTraining(trainingData) {
  try {
    const requestData = {
      description: trainingData.description,
      model_name: trainingData.modelName
    }

    if (trainingData.baseModel) {
      requestData.base_model = trainingData.baseModel
    }
    
    // Include file metadata when provided
    if (trainingData.fileId) {
      requestData.file_id = trainingData.fileId
      requestData.file_name = trainingData.fileName
      requestData.file_size = trainingData.fileSize
    }
    
    const authConfig = getAuthenticatedApi()
    const response = await fetch(`${API_BASE_URL}/training/start`, {
      method: 'POST',
      headers: authConfig.headers,
      body: JSON.stringify(requestData)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to start training:', error)
    throw new Error(`Failed to start training: ${error.message}`)
  }
}

/**
 * Retrieve training task status
 * @param {string} taskId - Task ID
 * @returns {Promise<{success: boolean, data: Object}>}
 */
export async function getTrainingStatus(taskId) {
  try {
    const authConfig = getAuthenticatedApi()
    const response = await fetch(`${API_BASE_URL}/training/status/${taskId}`, {
      headers: authConfig.headers
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch training status:', error)
    throw new Error(`Failed to fetch training status: ${error.message}`)
  }
}

/**
 * Retrieve training task list
 * @returns {Promise<{success: boolean, data: Array, total: number}>}
 */
export async function getTrainingTasks() {
  try {
    const authConfig = getAuthenticatedApi()
    const response = await fetch(`${API_BASE_URL}/training/tasks`, {
      headers: authConfig.headers
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch task list:', error)
    throw new Error(`Failed to fetch task list: ${error.message}`)
  }
}

/**
 * Cancel a training task
 * @param {string} taskId - Task ID
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function cancelTrainingTask(taskId) {
  try {
    const authConfig = getAuthenticatedApi()
    const response = await fetch(`${API_BASE_URL}/training/tasks/${taskId}`, {
      method: 'DELETE',
      headers: authConfig.headers
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to cancel task:', error)
    throw new Error(`Failed to cancel task: ${error.message}`)
  }
}

/**
 * Training task polling manager
 */
export class TrainingStatusPoller {
  constructor(taskId, onUpdate, options = {}) {
    this.taskId = taskId
    this.onUpdate = onUpdate
    this.interval = options.interval || 1000 // Poll every second by default
    this.maxRetries = options.maxRetries || 3
    this.retryCount = 0
    this.isPolling = false
    this.timerId = null
  }
  
  /**
   * Start polling
   */
  start() {
    if (this.isPolling) return
    
    this.isPolling = true
    this.retryCount = 0
    this._poll()
  }
  
  /**
   * Stop polling
   */
  stop() {
    this.isPolling = false
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }
  }
  
  /**
   * Execute polling
   */
  async _poll() {
    if (!this.isPolling) return
    
    try {
      const result = await getTrainingStatus(this.taskId)
      this.retryCount = 0 // Reset retry counter
      
      // Invoke update callback
      if (this.onUpdate) {
        this.onUpdate(result.data)
      }
      
      // Stop polling when task reaches a terminal state
      if (result.data.status === TaskStatus.COMPLETED || 
          result.data.status === TaskStatus.FAILED) {
        this.stop()
        return
      }
      
      // Continue polling
      this.timerId = setTimeout(() => this._poll(), this.interval)
      
    } catch (error) {
      this.retryCount++
      
      console.warn(`Polling failed (${this.retryCount}/${this.maxRetries}):`, error.message)
      
      if (this.retryCount >= this.maxRetries) {
        console.error('Polling reached max retries, stopping')
        this.stop()
        // Notify error
        if (this.onUpdate) {
          this.onUpdate({
            status: TaskStatus.FAILED,
            error_message: `Connection failed: ${error.message}`
          })
        }
        return
      }
      
      // Increase retry interval
      const retryInterval = this.interval * Math.pow(2, this.retryCount - 1)
      this.timerId = setTimeout(() => this._poll(), retryInterval)
    }
  }
}

/**
 * WebSocket real-time status manager (placeholder)
 * TODO: enable once backend WebSocket support is ready
 */
export class TrainingStatusWebSocket {
  constructor(taskId, onUpdate, options = {}) {
    this.taskId = taskId
    this.onUpdate = onUpdate
    this.options = options
    this.ws = null
  }
  
  connect() {
    // TODO: Implement WebSocket connection
    console.log('WebSocket connection not yet implemented')
  }
  
  disconnect() {
    // TODO: Implement WebSocket disconnect
    if (this.ws) {
      this.ws.close()
    }
  }
}

/**
 * Retrieve completed model list
 * @returns {Promise<{success: boolean, data: Array}>}
 */
export async function getModels() {
  try {
    const authConfig = getAuthenticatedApi()
    const response = await fetch(`${API_BASE_URL}/models`, {
      headers: authConfig.headers
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch model list:', error)
    throw new Error(`Failed to fetch model list: ${error.message}`)
  }
}

/**
 * Download a model
 * @param {string} modelId - Model ID
 * @returns {Promise<{success: boolean, download_url: string}>}
 */
export async function downloadModel(modelId) {
  try {
    const authConfig = getAuthenticatedApi()
    const response = await fetch(`${API_BASE_URL}/models/${modelId}/download`, {
      headers: authConfig.headers
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to download model:', error)
    throw new Error(`Failed to download model: ${error.message}`)
  }
}

/**
 * Upload file (simplified, keeps API compatibility)
 * @param {File} file - File to upload
 * @returns {Promise<{success: boolean, file_id: string, message: string}>}
 */
export async function uploadFileSimple(file) {
  return uploadFile(file)
}

/**
 * Check API service status
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API health check failed:', error)
    throw new Error(`API service unavailable: ${error.message}`)
  }
}
