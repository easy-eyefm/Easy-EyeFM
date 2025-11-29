<template>
  <div class="upload-progress-container" v-if="visible">
    <div class="upload-progress-card">
      <!-- File details -->
      <div class="file-info">
        <div class="file-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        </div>
        <div class="file-details">
          <div class="file-name">{{ fileName }}</div>
          <div class="file-size">{{ formatFileSize(fileSize) }}</div>
        </div>
        <button 
          v-if="canCancel && !completed" 
          @click="onCancel" 
          class="cancel-button"
          :title="$t('common.cancel')"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </button>
      </div>

      <!-- Progress bar -->
      <div class="progress-section">
        <div class="progress-bar-container">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: progress + '%' }"
              :class="{ 
                'completed': completed, 
                'error': error,
                'uploading': !completed && !error
              }"
            ></div>
          </div>
          <div class="progress-text">
            <span v-if="!completed && !error">{{ progress }}%</span>
            <span v-else-if="completed" class="success-text">✅ {{ $t('upload.completed') }}</span>
            <span v-else-if="error" class="error-text">❌ {{ $t('upload.failed') }}</span>
          </div>
        </div>

        <!-- Detailed information -->
        <div class="progress-details" v-if="!completed && !error">
          <div class="upload-stats">
            <span class="upload-speed" v-if="speed > 0">
              {{ formatSpeed(speed) }}
            </span>
            <span class="upload-eta" v-if="eta > 0">
              {{ $t('upload.remaining') }}: {{ formatTime(eta) }}
            </span>
          </div>
          <div class="uploaded-info">
            {{ formatFileSize(loaded) }} / {{ formatFileSize(total) }}
          </div>
        </div>

        <!-- Error message -->
        <div class="error-message" v-if="error">
          {{ errorMessage }}
        </div>

        <!-- Success message -->
        <div class="success-message" v-if="completed">
          {{ successMessage || $t('upload.uploadSuccess') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  fileName: {
    type: String,
    default: ''
  },
  fileSize: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number,
    default: 0
  },
  loaded: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  speed: {
    type: Number,
    default: 0
  },
  eta: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  successMessage: {
    type: String,
    default: ''
  },
  canCancel: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['cancel', 'complete', 'error'])

// Methods
const onCancel = () => {
  emit('cancel')
}

// Format file size for display
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// Format upload speed
const formatSpeed = (mbps) => {
  if (mbps >= 1) {
    return `${mbps.toFixed(1)} MB/s`
  } else {
    return `${(mbps * 1024).toFixed(0)} KB/s`
  }
}

// Format remaining time
const formatTime = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ${seconds % 60}s`
  } else {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }
}
</script>

<style scoped>
.upload-progress-container {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 1000;
  width: 380px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.upload-progress-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(37, 99, 235, 0.2);
  padding: 20px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.file-icon {
  width: 40px;
  height: 40px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  flex-shrink: 0;
}

.file-icon svg {
  width: 20px;
  height: 20px;
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.cancel-button {
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 6px;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.cancel-button:hover {
  background: rgba(239, 68, 68, 0.2);
}

.cancel-button svg {
  width: 14px;
  height: 14px;
}

.progress-section {
  space-y: 12px;
}

.progress-bar-container {
  margin-bottom: 12px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill.uploading {
  background: linear-gradient(90deg, var(--primary-color), #60a5fa);
  animation: progressPulse 2s ease-in-out infinite;
}

.progress-fill.completed {
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.progress-fill.error {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

@keyframes progressPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.progress-text {
  text-align: center;
  font-size: 12px;
  font-weight: 500;
}

.success-text {
  color: #22c55e;
}

.error-text {
  color: #ef4444;
}

.progress-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 8px;
}

.upload-stats {
  display: flex;
  gap: 12px;
}

.upload-speed {
  color: var(--primary-color);
  font-weight: 500;
}

.uploaded-info {
  font-weight: 500;
}

.error-message {
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 6px;
  color: #dc2626;
  font-size: 12px;
}

.success-message {
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 6px;
  color: #16a34a;
  font-size: 12px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .upload-progress-container {
    left: 20px;
    right: 20px;
    width: auto;
    max-width: none;
  }
}
</style>
