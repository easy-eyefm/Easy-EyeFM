/**
 * Prediction status poller
 * Periodically queries the backend and forwards updates to callbacks
 */

import { getPredictionStatus } from '../api/prediction.js'

export class PredictionStatusPoller {
  constructor(predictionId, onStatusUpdate, options = {}) {
    this.predictionId = predictionId
    this.onStatusUpdate = onStatusUpdate
    this.interval = options.interval || 1000 // Default: poll every second
    this.maxRetries = options.maxRetries || 3
    this.retryCount = 0
    this.isRunning = false
    this.timeoutId = null
  }

  start() {
    if (this.isRunning) {
      return
    }
    
    this.isRunning = true
    this.retryCount = 0
    this.poll()
  }

  stop() {
    this.isRunning = false
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  async poll() {
    if (!this.isRunning) {
      return
    }

    try {
      const response = await getPredictionStatus(this.predictionId)
      
      if (response.success) {
        // Reset retry counter
        this.retryCount = 0
        
        // Notify caller with fresh status
        this.onStatusUpdate(response.data)
        
        // Stop polling once a terminal status is reached
        if (response.data.status === 'completed' || response.data.status === 'failed') {
          this.stop()
          return
        }
      } else {
        console.warn('Prediction status request failed:', response.message)
      }
    } catch (error) {
      console.error('Prediction status polling error:', error)
      
      this.retryCount++
      if (this.retryCount >= this.maxRetries) {
        console.error(`Prediction polling exceeded max retries (${this.maxRetries}), stopping`)
        this.stop()
        
        // Notify caller about the error
        this.onStatusUpdate({
          prediction_id: this.predictionId,
          status: 'failed',
          error: `Polling failed: ${error.message}`
        })
        return
      }
    }

    // Continue polling
    if (this.isRunning) {
      this.timeoutId = setTimeout(() => this.poll(), this.interval)
    }
  }
} 
