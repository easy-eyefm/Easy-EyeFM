<template>
  <div class="training-page">
    <AppNavigation />

    <div class="training-layout">
      <aside class="sidebar">
        <div class="sidebar-content">
          <button class="new-chat-btn" @click="switchSection('model-training')">
            <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            {{ $t('training.trainModel') }}
          </button>

          <button class="menu-item predict-btn" :class="{ active: activeSection === 'online-predict' }"
            @click="startNewPrediction()" :title="$t('prediction.description')">
            <svg class="menu-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {{ $t('prediction.predict') }}
          </button>


          <button class="new-chat-btn" @click="activeSection = 'qa'">
            <svg data-v-58697b5c="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="1.2em"
              width="1.5em">
              <path fill="currentColor"
                d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0m544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z">
              </path>
            </svg>
            {{ $t('training.intelligent') }}
          </button>

          <nav class="sidebar-menu" v-if="false">
            <div class="menu-section">
              <button class="menu-item predict-btn" :class="{ active: activeSection === 'online-predict' }"
                @click="startNewPrediction()" :title="$t('prediction.description')">
                <svg class="menu-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ $t('prediction.predict') }}
              </button>

              
            </div>
          </nav>
        </div>



        
      </aside>

      <main class="main-content" :class="activeSection === 'qa' ? 'qa-content' : ''">
        <div v-if="activeSection === 'model-training'" class="content-section">
          <div class="page-header">
            <h1 class="page-title">
              <svg class="title-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9l-6.91.74L12 16l-3.09-6.26L2 9l6.91-.74L12 2z" />
              </svg>
              {{ $t('training.trainModel') }}
            </h1>
            <p class="page-description">
              {{ $t('training.description') }}
            </p>
          </div>

          <div class="training-wizard">
            <div class="step-indicator">
              <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
                <div class="step-number">1</div>
                <div class="step-title">{{ $t('training.step1') }}</div>
              </div>
              <div class="step-line"></div>
              <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
                <div class="step-number">2</div>
                <div class="step-title">{{ $t('training.step2') }}</div>
              </div>
              <div class="step-line"></div>
              <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
                <div class="step-number">3</div>
                <div class="step-title">{{ $t('training.step3') }}</div>
              </div>
            </div>

            <div class="wizard-content">
              <div v-if="currentStep === 1" class="step-content">
                <div class="step-card">
                  <div class="card-header">
                    <h3>{{ $t('training.stepTitle1') }}</h3>
                    <p>{{ $t('training.stepDesc1') }}</p>
                  </div>
                  <div class="card-body">
                    <div class="input-group">
                      <label class="input-label">
                        <svg class="label-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                          <path fill-rule="evenodd"
                            d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                        </svg>
                        {{ $t('training.targetDescription') }}
                      </label>
                      <textarea v-model="config.description" :placeholder="$t('training.targetPlaceholder')"
                        class="textarea-input" rows="4"></textarea>
                      <div class="input-hint">
                        <svg class="hint-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                        </svg>
                        {{ $t('training.targetHint') }}
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button @click="nextStep" :disabled="!config.description.trim()" class="btn-primary">
                      {{ $t('training.nextStep') }}
                      <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 2" class="step-content">
                <div class="step-card">
                  <div class="card-header">
                    <h3>{{ $t('training.stepTitle2') }}</h3>
                    <p>{{ $t('training.stepDesc2') }}</p>
                  </div>
                  <div class="card-body">
                    <div class="guide-card">
                      <div class="guide-header">
                        <svg class="guide-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                        </svg>
                        <h4>{{ $t('training.dataGuide') }}</h4>
                      </div>
                      <div class="guide-steps">
                        <div class="guide-step">
                          <div class="guide-step-number">1</div>
                          <div class="guide-step-text">{{ $t('training.guideStep1') }}</div>
                        </div>
                        <div class="guide-step">
                          <div class="guide-step-number">2</div>
                          <div class="guide-step-text">{{ $t('training.guideStep2') }}</div>
                        </div>
                        <div class="guide-step">
                          <div class="guide-step-number">3</div>
                          <div class="guide-step-text">{{ $t('training.guideStep3') }}</div>
                        </div>
                        <div class="guide-step">
                          <div class="guide-step-number">4</div>
                          <div class="guide-step-text" v-html="$t('training.guideStep4')"></div>
                        </div>
                      </div>
                    </div>

                    <div v-if="!uploadedFile && !isUploading" class="upload-zone"
                      :class="{ 'upload-dragging': isDragging }" @click="triggerFileUpload"
                      @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
                      @drop.prevent="handleFileDrop">
                      <div class="upload-empty">
                        <svg class="upload-icon" viewBox="0 0 48 48" fill="currentColor">
                          <path d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V16l-12-8z" />
                          <path d="m22 14 2 2h8v2h-8l-2-2z" />
                        </svg>
                        <h4>{{ $t('training.uploadPrompt') }}</h4>
                        <p>{{ $t('training.uploadHint') }}</p>
                        <button class="upload-btn-secondary">{{ $t('training.selectZipFile') }}</button>
                      </div>
                    </div>

                    <div v-else-if="isUploading" class="upload-uploading">
                      <div class="upload-spinner">
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-dasharray="31.416" stroke-dashoffset="31.416">
                            <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416"
                              repeatCount="indefinite" />
                            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416"
                              repeatCount="indefinite" />
                          </circle>
                        </svg>
                      </div>
                      <h4>{{ $t('training.uploading') }}</h4>
                      <p>{{ $t('training.uploadingHint') }}</p>
                    </div>

                    <div v-else class="upload-success">
                      <svg class="upload-success-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      <div class="file-details">
                        <h4>{{ uploadedFile.name }}</h4>
                        <p>{{ $t('training.fileSize') }}: {{ (uploadedFile.size / 1024 / 1024).toFixed(2) }} MB</p>
                      </div>
                      <button @click="removeFile" class="btn-remove btn-close">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button @click="prevStep" class="btn-secondary">
                      <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                      </svg>
                      {{ $t('training.prevStep') }}
                    </button>
                    <button @click="nextStep" :disabled="!uploadedFile" class="btn-primary">
                      {{ $t('training.nextStepTraining') }}
                      <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 3" class="step-content">
                <div class="step-card">
                  <div class="card-header">
                    <h3>{{ $t('training.stepTitle3') }}</h3>
                    <p>{{ $t('training.stepDesc3') }}</p>
                  </div>
                  <div class="card-body">
                    <div class="training-summary">
                      <div class="summary-item summary-item-base-model">
                        <div class="summary-label">
                          {{ $t('training.baseModel') }}
                        </div>
                        <div class="summary-value summary-value-column">
                          <select v-model="config.baseModel" class="select-input">
                            <option v-for="option in baseModelOptions" :key="option.value" :value="option.value">
                              {{ option.label }}
                            </option>
                          </select>
                          
                        </div>
                      </div>
                      <div class="summary-item">
                        <div class="summary-label">{{ $t('training.modelName') }}</div>
                        <div class="summary-value">{{ config.modelName }}</div>
                      </div>
                      <div class="summary-item">
                        <div class="summary-label">{{ $t('training.trainingTarget') }}</div>
                        <div class="summary-value">{{ config.description }}</div>
                      </div>
                      <div class="summary-item">
                        <div class="summary-label">{{ $t('training.dataFile') }}</div>
                        <div class="summary-value">{{ uploadedFile?.name }} ({{ (uploadedFile?.size / 1024 /
                          1024).toFixed(2) }} MB)</div>
                      </div>
                    </div>

                    <div class="model-name-settings">
                      <div class="setting-group">
                        <label class="input-label required">
                          <svg class="label-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fill-rule="evenodd"
                              d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" />
                          </svg>
                          {{ $t('training.modelNameLabel') }}
                          <span class="required-star">*</span>
                        </label>
                        <input v-model="config.modelName" type="text" :placeholder="$t('training.modelNamePlaceholder')"
                          class="text-input" required />
                        <div class="input-hint">
                          <svg class="hint-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                          </svg>
                          {{ $t('training.modelNameHint') }}
                        </div>
                      </div>
                    </div>


                    

                  </div>
                  <div class="card-footer">
                    <button @click="prevStep" class="btn-secondary">
                      <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                      </svg>
                      {{ $t('training.prevStep') }}
                    </button>
                    <button @click="startTraining" :disabled="isTraining" class="btn-primary btn-large">
                      <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                      {{ isTraining ? $t('training.trainingInProgress') : $t('training.startTraining') }}
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="isTraining || trainingComplete" class="training-monitor">
                <div class="monitor-header">
                  <div class="status-badge" :class="{ completed: trainingComplete }">
                    <svg v-if="!trainingComplete" class="status-icon spinning" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3a7 7 0 110 14 7 7 0 010-14z" />
                    </svg>
                    <svg v-else class="status-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    {{ trainingComplete ? $t('training.trainingCompleted') : $t('training.trainingStatus') }}
                  </div>
                  <h3>{{ trainingComplete ? $t('training.trainingSuccess') : $t('training.trainingInProgressTitle') }}
                  </h3>
                  <p>{{ trainingComplete ? $t('training.trainingSuccessDesc') : $t('training.trainingInProgressDesc') }}
                  </p>
                </div>

                <div class="progress-section">
                  <div class="progress-stats">
                    
                    
                    <div class="stat-item">
                      <div class="stat-value">{{ progressPercentage }}%</div>
                      <div class="stat-label">{{ $t('training.totalProgress') }}</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-value">{{ Math.floor(elapsedTime / 60) }}:{{ String(elapsedTime % 60).padStart(2,
                        '0') }}</div>
                      <div class="stat-label">{{ $t('training.elapsedTime') }}</div>
                    </div>
                  </div>

                  <div class="progress-bar-container">
                    <div class="progress-bar-modern">
                      <div class="progress-fill-modern" :style="{ width: progressPercentage + '%' }"></div>
                    </div>
                    <div class="progress-text">{{ progressPercentage }}% {{ $t('training.completed') }}</div>
                  </div>
                </div>

                





              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeSection === 'online-predict'" class="content-section">
          <div class="page-header">
            <div class="page-title">
              <svg class="title-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
              </svg>
              {{ $t('prediction.online') }}
            </div>
            <p class="page-description">{{ $t('prediction.description') }}</p>
          </div>

          <div class="training-wizard">
            <div class="step-indicator">
              <div class="step" :class="{ active: currentPredictStep === 1, completed: currentPredictStep > 1 }">
                <div class="step-number">1</div>
                <div class="step-title">{{ $t('steps.modelSelection') }}</div>
              </div>
              <div class="step-line" :class="{ completed: currentPredictStep > 1 }"></div>
              <div class="step" :class="{ active: currentPredictStep === 2, completed: currentPredictStep > 2 }">
                <div class="step-number">2</div>
                <div class="step-title">{{ $t('steps.imageUpload') }}</div>
              </div>
              <div class="step-line" :class="{ completed: currentPredictStep > 2 }"></div>
              <div class="step" :class="{ active: currentPredictStep === 3, completed: currentPredictStep > 3 }">
                <div class="step-number">3</div>
                <div class="step-title">{{ $t('steps.startDiagnosis') }}</div>
              </div>
            </div>

            <div class="wizard-content">
              <div class="step-content">
                <div v-if="currentPredictStep === 1" class="step-card">
                  <div class="card-header">
                    <h3>{{ $t('steps.selectModel') }}</h3>
                    <p>{{ $t('steps.selectModelDesc') }}</p>
                  </div>
                  <div class="card-body">
                    <div v-if="isLoadingModels" class="loading-models">
                      <div class="loading-spinner"></div>
                      <p>{{ $t('models.loading') }}</p>
                    </div>
                    <div v-else-if="userModels.length === 0" class="no-models">
                      <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <h4>{{ $t('models.noModels') }}</h4>
                        <p>{{ $t('models.noModelsDesc') }}</p>
                        <button class="btn-primary" @click="switchSection('model-training')">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clip-rule="evenodd" />
                          </svg>
                          {{ $t('training.startTraining') }}
                        </button>
                      </div>
                    </div>
                    <div v-else class="models-selector">
                      <div class="models-grid-compact">
                        <div v-for="model in paginatedModels" :key="model.model_id" class="model-card-compact"
                          :class="{ selected: selectedModel?.model_id === model.model_id }"
                          @click="selectPredictModel(model)">
                          <div class="model-card-header">
                            <div class="model-status-indicator" :class="getModelStatusClass(model.accuracy)">
                              <div class="status-dot"></div>
                              <span class="status-text">{{ getModelStatusText(model.accuracy) }}</span>
                            </div>
                            <div class="model-selection-radio">
                              <div class="radio-circle"
                                :class="{ checked: selectedModel?.model_id === model.model_id }">
                                <div class="radio-inner"></div>
                              </div>
                            </div>
                          </div>

                          <div class="model-card-body">
                            <div class="model-icon">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path
                                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
                              </svg>
                            </div>
                            <h4 class="model-name">{{ formatModelName(model.model_name) }}</h4>

                            <div class="accuracy-display">
                              <span class="accuracy-label">{{ $t('training.accuracy') }}</span>
                              <div class="accuracy-visual">
                                <div class="accuracy-circle" :class="getAccuracyClass(model.accuracy)">
                                  <span class="accuracy-number">{{ model.accuracy }}</span>
                                </div>
                              </div>
                            </div>

                            <div class="model-info-compact">
                              
                              <div class="info-item">
                                <svg class="info-icon" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clip-rule="evenodd" />
                                </svg>
                                <span>{{ formatModelDate(model.created_at) }}</span>
                              </div>
                            </div>
                          </div>

                          <div v-if="selectedModel?.model_id === model.model_id" class="selection-indicator">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div v-if="totalPages > 1" class="pagination-section">
                        <div class="pagination-controls">
                          <button class="pagination-btn" :disabled="currentPage === 1"
                            @click="goToPage(currentPage - 1)">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                            </svg>
                          </button>

                          <span class="pagination-info">
                            {{ $t('pagination.pageInfo', { current: currentPage, total: totalPages }) }}
                          </span>

                          <button class="pagination-btn" :disabled="currentPage === totalPages"
                            @click="goToPage(currentPage + 1)">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button class="btn-secondary" @click="switchSection('model-training')">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd" />
                      </svg>
                      {{ $t('training.startTraining') }}
                    </button>
                    <button :disabled="!selectedModel" @click="nextPredictStep" class="btn-primary">
                      {{ $t('navigation.next') }}
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div v-else-if="currentPredictStep === 2" class="step-card">
                  <div class="card-header">
                    <h3>{{ $t('steps.uploadImage') }}</h3>
                    <p>{{ $t('steps.uploadImageDesc') }}</p>
                  </div>
                  <div class="card-body">
                    <div v-if="!predictImage" class="upload-zone" @click="triggerPredictImageUpload" @dragover.prevent
                      @drop="handleImageDrop">
                      <div class="upload-empty">
                        <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21,15 16,10 5,21"></polyline>
                        </svg>
                        <h4>{{ $t('upload.clickOrDrag') }}</h4>
                        <p>{{ $t('upload.formatHint') }}</p>
                        <button class="upload-btn-secondary">{{ $t('upload.selectFile') }}</button>
                      </div>
                    </div>
                    <div v-else class="image-preview">
                      <img :src="predictImagePreview" :alt="$t('alt.diagnosisImage')"
                        class="predict-image clickable-image" @click="openImagePreview(predictImagePreview)">
                      <div class="image-info">
                        <h4>{{ predictImage.name }}</h4>
                        <p>{{ (predictImage.size / 1024 / 1024).toFixed(2) }} MB • {{ predictImage.type }}</p>
                      </div>
                      <button @click="clearImage" class="btn-clear" :disabled="isPredicting">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                        </svg>
                      </button>
                    </div>
                    <input ref="predictImageInput" type="file" accept="image/jpeg,image/jpg,image/png"
                      @change="handleImageSelect" style="display: none">
                  </div>
                  <div class="card-footer predict-nav-footer">
                    <button class="predict-nav-btn predict-nav-prev" @click="prevPredictStep">
                      <div class="nav-btn-content">
                        <svg class="nav-btn-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="nav-btn-text">{{ $t('navigation.previous') }}</span>
                      </div>
                    </button>
                    <button :disabled="!predictImage" @click="nextPredictStep" class="predict-nav-btn predict-nav-next"
                      :class="{ disabled: !predictImage }">
                      <div class="nav-btn-content">
                        <span class="nav-btn-text">{{ $t('navigation.next') }}</span>
                        <svg class="nav-btn-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>

                <div v-else-if="currentPredictStep === 3" class="step-card">
                  <div class="card-header">
                    <h3>{{ $t('diagnosis.startAI') }}</h3>
                    <p>{{ $t('diagnosis.confirmDesc') }}</p>
                  </div>
                  <div class="card-body">
                    <div class="training-summary">
                      <div class="summary-item">
                        <span class="summary-label">{{ $t('diagnosis.selectedModel') }}</span>
                        <span class="summary-value">{{ selectedModel?.model_name }}</span>
                      </div>
                      
                      <div class="summary-item">
                        <span class="summary-label">{{ $t('diagnosis.imageFile') }}</span>
                        <div v-if="predictImage?.name" class="summary-image-preview clickable-image"
                          @click="openImagePreview(predictImagePreview)">
                          <img :src="predictImagePreview" :alt="predictImage.name" class="summary-image">
                          <div class="summary-image-info">
                            <span class="image-name">{{ predictImage.name }}</span>
                            <span class="image-size">{{ (predictImage.size / 1024 / 1024).toFixed(2) }} MB</span>
                            <span class="image-preview-hint">{{ $t('diagnosis.clickToPreview') }}</span>
                          </div>
                        </div>
                        <span v-else class="summary-value">{{ $t('diagnosis.noImage') }}</span>
                      </div>
                    </div>

                    <div v-if="!isPredicting && !predictResult" class="predict-controls">
                      <button @click="startImagePrediction" class="btn-predict-start btn-large">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10,8 16,12 10,16 10,8"></polygon>
                        </svg>
                        {{ $t('diagnosis.startAIButton') }}
                      </button>
                      <p class="diagnosis-note">{{ $t('diagnosis.note') }}</p>
                    </div>

                    <div v-else-if="isPredicting" class="predict-status">
                      <svg class="status-spinner" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-dasharray="62.83" stroke-dashoffset="62.83">
                          <animate attributeName="stroke-dashoffset" dur="2s" values="62.83;0;62.83"
                            repeatCount="indefinite" />
                        </circle>
                      </svg>
                      <h4>{{ $t('diagnosis.analyzing') }}</h4>
                      <p>{{ $t('diagnosis.usingModel') }}：{{ selectedModel?.model_name }}</p>
                      <button @click="stopPrediction" class="btn-predict-stop">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10"></circle>
                          <rect x="9" y="9" width="6" height="6"></rect>
                        </svg>
                        {{ $t('diagnosis.stopDiagnosis') }}
                      </button>
                    </div>

                    <div v-else-if="predictResult" class="diagnosis-result">
                      <div class="result-content">
                        <div class="result-header">
                          <span class="model-used">{{ $t('diagnosis.modelUsed') }}：{{ selectedModel?.model_name
                          }}</span>
                          <span class="predict-time">{{ formatPredictTime(new Date()) }}</span>
                        </div>

                        <div class="main-diagnosis">
                          <span class="diagnosis-label">{{ $t('diagnosis.result') }}：</span>
                          <span class="diagnosis-value" :class="getDiagnosisClass(predictResult.diagnosis)">
                            {{ predictResult.diagnosis }}
                          </span>
                          <span class="confidence">({{ $t('diagnosis.confidence') }}: {{ (predictResult.confidence *
                            100).toFixed(1) }}%)</span>
                        </div>

                        <div class="detailed-results" v-if="predictResult.details">
                          <h4>{{ $t('diagnosis.detailedAnalysis') }}</h4>
                          <div v-for="(value, key) in predictResult.details" :key="key" class="analysis-item">
                            <span class="analysis-label">{{ getAnalysisLabel(key) }}</span>
                            <div class="analysis-bar">
                              <div class="analysis-fill" :style="{ width: (value * 100) + '%' }"></div>
                              <span class="analysis-value">{{ (value * 100).toFixed(1) }}%</span>
                            </div>
                          </div>
                        </div>

                        <div class="recommendations" v-if="predictResult.recommendations">
                          <h4>{{ $t('diagnosis.recommendations') }}</h4>
                          <p>{{ predictResult.recommendations }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer predict-nav-footer">
                    <button class="predict-nav-btn predict-nav-prev" @click="prevPredictStep" v-if="!isPredicting">
                      <div class="nav-btn-content">
                        <svg class="nav-btn-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="nav-btn-text">{{ $t('navigation.previous') }}</span>
                      </div>
                    </button>
                    <button class="predict-nav-btn predict-nav-reset" @click="resetPredict" v-if="predictResult">
                      <div class="nav-btn-content">
                        <svg class="nav-btn-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="nav-btn-text">{{ $t('diagnosis.retry') }}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <QA v-else-if="activeSection === 'qa'" />

      </main>

      <input ref="fileInput" type="file" accept=".zip" @change="handleFileUpload" style="display: none;" />

      <FileUploadProgress v-bind="uploadProgress" @cancel="handleCancelUpload" />
    </div>

    <div v-if="showImagePreview" class="image-preview-modal" @click="closeImagePreview">
      <div class="image-preview-overlay">
        <div class="image-preview-container">
          <button class="image-preview-close" @click="closeImagePreview">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img :src="previewImageSrc" alt="Image preview" class="preview-image" @click.stop>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppNavigation from '@/components/AppNavigation.vue'
import QA from '@/components/QA.vue'


const API_BASE_URL = 'https://www.easy-eyefm.com'


import {
  startTraining as startTrainingTask,
  uploadFile,
  TrainingStatusPoller,
  TaskStatus,
  downloadModel as downloadModelFile,
  getModels
} from '@/api/training.js'
import FileUploadProgress from '@/components/FileUploadProgress.vue'


const router = useRouter()
const fileInput = ref(null)
const predictImageInput = ref(null)


const activeSection = ref('model-training')


const userModels = ref([])
const selectedModel = ref(null)
const isLoadingModels = ref(false)
const isPredicting = ref(false)
const predictResult = ref(null)
const predictionPoller = ref(null)
const currentPredictionTaskId = ref(null)
const predictImage = ref(null)
const predictImagePreview = ref(null)

const baseModelOptions = [
  {
    value: 'Easy-EyeFM',
    label: 'Easy-EyeFM',
    descriptionKey: 'training.baseModelEasyDesc'
  },
  {
    value: 'RETFound',
    label: 'RETFound',
    descriptionKey: 'training.baseModelRetFoundDesc'
  },
  {
    value: 'EyeFM',
    label: 'EyeFM',
    descriptionKey: 'training.baseModelEyeFMDesc'
  }
]


const modelSearchQuery = ref('')
const activeModelFilter = ref('all')
const modelSortBy = ref('created_at')
const modelViewMode = ref('grid')
const currentPage = ref(1)
const modelsPerPage = ref(4)


const currentPredictStep = ref(1)


const predictionHistory = ref([])
const isLoadingHistory = ref(false)


const showImagePreview = ref(false)
const previewImageSrc = ref('')


const generateDefaultModelName = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')
  return `model_${year}${month}${day}_${hour}${minute}`
}


const config = ref({
  description: '',
  modelName: '',
  baseModel: 'Easy-EyeFM',
  epochs: 10,
  batchSize: 32,
  learningRate: 0.001,
  language: 'zh-CN'
})


const currentStep = ref(1)
const isDragging = ref(false)


const isTraining = ref(false)
const trainingComplete = ref(false)
const currentEpoch = ref(0)
const elapsedTime = ref(0)
const trainingProgress = ref(0)
const uploadedFile = ref(null)
const uploadedFileId = ref(null)
const isUploading = ref(false)


const uploadProgress = ref({
  visible: false,
  fileName: '',
  fileSize: 0,
  progress: 0,
  loaded: 0,
  total: 0,
  speed: 0,
  eta: 0,
  completed: false,
  error: false,
  errorMessage: '',
  successMessage: '',
  canCancel: true
})
const uploadCancelFn = ref(null)
const trainingLogs = ref([])
const losses = ref([])
const trainingInterval = ref(null)


const currentTaskId = ref(null)
const statusPoller = ref(null)


const canStartTraining = computed(() => {
  return config.value.description &&
    config.value.modelName &&
    config.value.modelName.trim() !== '' &&
    config.value.baseModel &&
    uploadedFileId.value &&
    !isTraining.value &&
    !isUploading.value
})

const progressPercentage = computed(() => {

  if (trainingComplete.value) {
    return 100
  }

  return Math.min(100, Math.max(0, trainingProgress.value))
})

const selectedBaseModelDescriptionKey = computed(() => {
  const match = baseModelOptions.find(option => option.value === config.value.baseModel)
  return match ? match.descriptionKey : 'training.baseModelEasyDesc'
})

const estimatedTrainingTime = computed(() => {
  const baseTime = config.value.epochs * 2
  return `Approximately ${baseTime} minutes`
})


const filteredModels = computed(() => {
  let filtered = [...userModels.value]


  if (modelSearchQuery.value.trim()) {
    const query = modelSearchQuery.value.trim().toLowerCase()
    filtered = filtered.filter(model =>
      model.model_name.toLowerCase().includes(query)
    )
  }


  switch (activeModelFilter.value) {
    case 'high-accuracy':
      filtered = filtered.filter(model => parseFloat(model.accuracy) >= 90)
      break
    case 'recent':
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      filtered = filtered.filter(model => new Date(model.created_at) >= oneWeekAgo)
      break
  }


  filtered.sort((a, b) => {
    switch (modelSortBy.value) {
      case 'accuracy':
        return parseFloat(b.accuracy) - parseFloat(a.accuracy)
      case 'name':
        return a.model_name.localeCompare(b.model_name)
      case 'created_at':
      default:
        return new Date(b.created_at) - new Date(a.created_at)
    }
  })

  return filtered
})

const highAccuracyModels = computed(() => {
  return userModels.value.filter(model => parseFloat(model.accuracy) >= 90)
})

const recentModels = computed(() => {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return userModels.value.filter(model => new Date(model.created_at) >= oneWeekAgo)
})

const totalPages = computed(() => {
  return Math.ceil(filteredModels.value.length / modelsPerPage.value)
})

const paginatedModels = computed(() => {
  const start = (currentPage.value - 1) * modelsPerPage.value
  const end = start + modelsPerPage.value
  return filteredModels.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }

  return pages
})


const switchSection = (section) => {
  activeSection.value = section


  if (section === 'online-predict') {
    loadUserModels()
    loadPredictionHistory()


    resetPredict()
  }


  if (section === 'model-training') {
    initializeTraining()
  }
}



const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const resetTrainingConfig = () => {
  currentStep.value = 1
  config.value.description = ''
  config.value.modelName = ''
  config.value.baseModel = 'Easy-EyeFM'
  config.value.epochs = 10
  config.value.batchSize = 32
  config.value.learningRate = 0.001
  uploadedFile.value = null
  uploadedFileId.value = null
  isUploading.value = false
  isTraining.value = false
  trainingComplete.value = false
  currentEpoch.value = 0
  trainingLogs.value = []
  elapsedTime.value = 0
  trainingProgress.value = 0
  losses.value = []
  isDragging.value = false


  if (fileInput.value) {
    fileInput.value.value = ''
  }
}


const initializeTraining = () => {

  resetTrainingConfig()


  currentStep.value = 1


  config.value.modelName = ''

  console.log('Training configuration initialised')
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file || !(file.type === 'application/zip' || file.name.toLowerCase().endsWith('.zip'))) {
    alert('Please select a ZIP file')
    return
  }


  const maxSize = 1024 * 1024 * 1024 // 1GB
  if (file.size > maxSize) {
    alert('File size cannot exceed 1GB')
    return
  }


  uploadProgress.value = {
    visible: true,
    fileName: file.name,
    fileSize: file.size,
    progress: 0,
    loaded: 0,
    total: file.size,
    speed: 0,
    eta: 0,
    completed: false,
    error: false,
    errorMessage: '',
    successMessage: '',
    canCancel: true
  }

  isUploading.value = true

  try {
    const result = await uploadFile(
      file,

      (progressInfo) => {
        try {
          if (uploadProgress.value && progressInfo) {
            uploadProgress.value = {
              ...uploadProgress.value,
              progress: progressInfo.progress || 0,
              loaded: progressInfo.loaded || 0,
              total: progressInfo.total || file.size,
              speed: progressInfo.speed || 0,
              eta: progressInfo.eta || 0
            }
          }
        } catch (error) {
          console.warn('Progress update failed:', error)
        }
      },

      (cancelFn) => {
        uploadCancelFn.value = cancelFn
      }
    )

    if (result.success) {

      uploadProgress.value = {
        ...uploadProgress.value,
        completed: true,
        progress: 100,
        successMessage: result.message || 'File uploaded successfully!'
      }

      uploadedFile.value = file
      uploadedFileId.value = result.file_id


      setTimeout(() => {
        uploadProgress.value.visible = false
      }, 3000)
    } else {
      throw new Error(result.message || 'Upload failed')
    }
  } catch (error) {
    console.error('File upload error:', error)


    uploadProgress.value = {
      ...uploadProgress.value,
      error: true,
      errorMessage: error.message,
      canCancel: false
    }


    setTimeout(() => {
      uploadProgress.value.visible = false
    }, 5000)
  } finally {
    isUploading.value = false
    uploadCancelFn.value = null
  }
}

const handleFileDrop = async (event) => {
  isDragging.value = false


  const file = event.dataTransfer.files[0]
  if (!file || !(file.type === 'application/zip' || file.name.toLowerCase().endsWith('.zip'))) {
    alert('Please select a ZIP file')
    return
  }


  const maxSize = 1024 * 1024 * 1024 // 1GB
  if (file.size > maxSize) {
    alert('File size cannot exceed 1GB')
    return
  }


  uploadProgress.value = {
    visible: true,
    fileName: file.name,
    fileSize: file.size,
    progress: 0,
    loaded: 0,
    total: file.size,
    speed: 0,
    eta: 0,
    completed: false,
    error: false,
    errorMessage: '',
    successMessage: '',
    canCancel: true
  }

  isUploading.value = true

  try {
    const result = await uploadFile(
      file,

      (progressInfo) => {
        try {
          if (uploadProgress.value && progressInfo) {
            uploadProgress.value = {
              ...uploadProgress.value,
              progress: progressInfo.progress || 0,
              loaded: progressInfo.loaded || 0,
              total: progressInfo.total || file.size,
              speed: progressInfo.speed || 0,
              eta: progressInfo.eta || 0
            }
          }
        } catch (error) {
          console.warn('Progress update failed:', error)
        }
      },

      (cancelFn) => {
        uploadCancelFn.value = cancelFn
      }
    )

    if (result.success) {

      uploadProgress.value = {
        ...uploadProgress.value,
        completed: true,
        progress: 100,
        successMessage: result.message || 'File uploaded successfully!'
      }

      uploadedFile.value = file
      uploadedFileId.value = result.file_id


      setTimeout(() => {
        uploadProgress.value.visible = false
      }, 3000)
    } else {
      throw new Error(result.message || 'Upload failed')
    }
  } catch (error) {
    console.error('File upload error:', error)


    uploadProgress.value = {
      ...uploadProgress.value,
      error: true,
      errorMessage: error.message,
      canCancel: false
    }


    setTimeout(() => {
      uploadProgress.value.visible = false
    }, 5000)
  } finally {
    isUploading.value = false
    uploadCancelFn.value = null
  }
}

const removeFile = () => {

  uploadedFile.value = null
  uploadedFileId.value = null
  isUploading.value = false
  uploadProgress.value = {
    visible: false,
    percentage: 0,
    speed: '',
    timeRemaining: '',
    status: 'uploading'
  }


  if (fileInput.value) {
    fileInput.value.value = ''
  }

  console.log('File cleared, upload component reset')
}


const handleUploadZoneClick = () => {

  if (!uploadedFile.value && !isUploading.value) {
    triggerFileUpload()
  }
}


const handleCancelUpload = () => {
  if (uploadCancelFn.value) {
    uploadCancelFn.value()
    uploadProgress.value.visible = false
    isUploading.value = false
    uploadCancelFn.value = null
  }
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp || Date.now())
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}


const downloadModel = async () => {
  if (!currentTaskId.value) {
    alert('Cannot download model: task ID missing')
    return
  }

  try {
    const result = await downloadModelFile(currentTaskId.value)
    if (result.success && result.download_url) {

      const link = document.createElement('a')
      link.href = result.download_url
      link.download = `${config.value.modelName}.h5`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert('Model download link generation failed')
    }
  } catch (error) {
    console.error('Download model failed:', error)
    alert(`Download model failed: ${error.message}`)
  }
}

const testModel = () => {
  alert('Model testing feature under development...')
}

const startNewTraining = () => {

  if (statusPoller.value) {
    statusPoller.value.stop()
    statusPoller.value = null
  }

  resetTrainingConfig()
  activeSection.value = 'model-training'
}


const handleTrainingStatusUpdate = async (taskData) => {

  currentEpoch.value = taskData.current_epoch || 0
  elapsedTime.value = taskData.elapsed_time || 0


  const newProgress = taskData.progress
  if (newProgress !== undefined) {
    trainingProgress.value = Math.min(100, Math.max(0, newProgress))
  }


  if (currentTaskId.value) {
    await fetchJsonlTrainingLogs(currentTaskId.value)
  }


  if (taskData.logs && taskData.logs.length > trainingLogs.value.length) {
    const newLogs = taskData.logs.slice(trainingLogs.value.length)
    newLogs.forEach(logMessage => {
      trainingLogs.value.push({
        id: Date.now() + Math.random(),
        time: Date.now(),
        message: logMessage
      })
    })
  }


  if (taskData.status === TaskStatus.COMPLETED) {
    isTraining.value = false
    trainingComplete.value = true
    trainingProgress.value = 100


    if (statusPoller.value) {
      statusPoller.value.stop()
      statusPoller.value = null
    }

  } else if (taskData.status === TaskStatus.FAILED) {
    isTraining.value = false
    trainingComplete.value = false


    if (taskData.error_message) {
      trainingLogs.value.push({
        id: Date.now(),
        time: Date.now(),
        message: `❌ training failed: ${taskData.error_message}`
      })
    }


    if (statusPoller.value) {
      statusPoller.value.stop()
      statusPoller.value = null
    }

    alert(`training failed: ${taskData.error_message || 'unknown error'}`)
  }
}


const fetchJsonlTrainingLogs = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/training/logs/${taskId}?lines=10`)
    if (response.ok) {
      const data = await response.json()
      if (data.success && data.logs.length > 0) {

        const latestLog = data.logs[data.logs.length - 1]


        const logId = `jsonl_step_${latestLog.current_steps}`
        const existingLog = trainingLogs.value.find(log => log.id === logId)

        if (!existingLog) {

          const logMessage = `📊 Step ${latestLog.current_steps}/${latestLog.total_steps} (${latestLog.percentage}%) - Loss: ${latestLog.loss.toFixed(6)} - Elapsed: ${latestLog.elapsed_time}s - Remaining: ${latestLog.remaining_time}s`
          trainingLogs.value.push({
            id: logId,
            time: Date.now(),
            message: logMessage,
            data: latestLog
          })
        }


        if (latestLog.percentage === 100) {
          isTraining.value = false
          trainingComplete.value = true
          trainingProgress.value = 100

          if (statusPoller.value) {
            statusPoller.value.stop()
            statusPoller.value = null
          }
        }
      }
    }
  } catch (error) {
    console.warn('Failed to fetch JSONL training logs:', error)
  }
}

const startTraining = async () => {
  if (!canStartTraining.value) return

  try {

    const result = await startTrainingTask({
      description: config.value.description,
      modelName: config.value.modelName,
      baseModel: config.value.baseModel,
      fileId: uploadedFileId.value,
      fileName: uploadedFile.value?.name,
      fileSize: uploadedFile.value?.size
    })

    if (result.success) {

      isTraining.value = true
      currentEpoch.value = 0
      elapsedTime.value = 0
      trainingLogs.value = []
      currentTaskId.value = result.task_id


      trainingLogs.value.push({
        id: Date.now(),
        time: Date.now(),
        message: 'training task started, connecting to server...'
      })


      statusPoller.value = new TrainingStatusPoller(
        result.task_id,
        handleTrainingStatusUpdate,
        { interval: 1000 }
      )
      statusPoller.value.start()


      setTimeout(() => {
        const trainingMonitor = document.querySelector('.training-monitor')
        if (trainingMonitor) {
          trainingMonitor.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)

    } else {
      alert(`training start failed: ${result.message}`)
    }

  } catch (error) {
    console.error('training start failed:', error)
    alert(`training start failed: ${error.message}`)
    isTraining.value = false
  }
}


const loadUserModels = async () => {
  if (isLoadingModels.value) return

  isLoadingModels.value = true
  try {
    const result = await getModels()
    if (result.success) {
      userModels.value = result.data
    } else {
      console.error('load model failed:', result.message)
      userModels.value = []
    }
  } catch (error) {
    console.error('load model failed:', error)
    userModels.value = []
  } finally {
    isLoadingModels.value = false
  }
}

const selectModel = (model) => {
  selectedModel.value = model

  predictResult.value = null
}

const triggerPredictImageUpload = () => {
  if (!selectedModel.value) return
  predictImageInput.value?.click()
}

const handleImageSelect = (event) => {
  const file = event.target.files[0]
  if (!file) return


  if (!file.type.startsWith('image/')) {
    alert('please select image file')
    return
  }


  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    alert('file size cannot exceed 10MB')
    return
  }


  predictImage.value = file


  const reader = new FileReader()
  reader.onload = (e) => {
    predictImagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)


  predictResult.value = null
}

const clearImage = () => {
  predictImage.value = null
  predictImagePreview.value = null
  predictResult.value = null
  if (predictImageInput.value) {
    predictImageInput.value.value = ''
  }
}

const handleImageDrop = (event) => {
  event.preventDefault()
  const files = event.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    if (file.type.startsWith('image/')) {

      const maxSize = 10 * 1024 * 1024
      if (file.size <= maxSize) {
        predictImage.value = file
        const reader = new FileReader()
        reader.onload = (e) => {
          predictImagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
        predictResult.value = null
      } else {
        alert('file size cannot exceed 10MB')
      }
    } else {
      alert('please select image file')
    }
  }
}

const getProgressColor = (value) => {
  if (value > 0.7) return '#ef4444'
  if (value > 0.3) return '#f59e0b'
  return '#10b981'
}

const startImagePrediction = async () => {
  if (!predictImage.value || !selectedModel.value || isPredicting.value) return

  isPredicting.value = true

  try {

    const startResult = await predictWithModel(selectedModel.value.model_id, predictImage.value)
    if (!startResult.success) {
      alert(`Prediction failed to start: ${startResult.message || 'Unknown error'}`)
      return
    }

    const taskId = startResult.data.task_id
    currentPredictionTaskId.value = taskId
    console.log('Prediction task started, id:', taskId)


    let attempts = 0
    const maxAttempts = 60

    const checkResult = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/predict/status/${taskId}`)
        const result = await response.json()

        if (result.success && result.data.status === 'completed') {
          predictResult.value = result.data.result
          isPredicting.value = false
          currentPredictionTaskId.value = null
          console.log('Prediction completed:', result.data.result)

          loadPredictionHistory()
          return true
        } else if (result.data.status === 'failed') {
          isPredicting.value = false
          currentPredictionTaskId.value = null
          alert(`Prediction failed: ${result.data.error || 'Unknown error'}`)
          return true
        } else if (result.data.status === 'pending' || result.data.status === 'running' || result.data.status === 'processing') {

          attempts++
          if (attempts >= maxAttempts) {
            isPredicting.value = false
            currentPredictionTaskId.value = null
            alert('Prediction timeout, please try again later')
            return true
          }

          setTimeout(checkResult, 5000)
          return false
        }
      } catch (error) {
        console.error('Failed to check prediction result:', error)
        attempts++
        if (attempts >= maxAttempts) {
          isPredicting.value = false
          currentPredictionTaskId.value = null
          alert('Prediction timeout, please try again later')
          return true
        }

        setTimeout(checkResult, 5000)
        return false
      }
    }


    checkResult()

  } catch (error) {
    console.error('Prediction failed:', error)
    isPredicting.value = false
    currentPredictionTaskId.value = null
    alert(`Prediction failed: ${error.message}`)
  }
}

const stopPrediction = () => {
  if (!isPredicting.value) return

  isPredicting.value = false
  currentPredictionTaskId.value = null


  console.log('Prediction stopped')
}

const predictWithModel = async (modelId, imageFile) => {
  try {
    const formData = new FormData()
    formData.append('model_id', modelId)
    formData.append('file', imageFile)


    const token = localStorage.getItem('auth_token')
    const expiry = localStorage.getItem('auth_token_expiry')

    const headers = {}
    if (token && expiry && Date.now() <= parseInt(expiry)) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      throw new Error('Authentication required')
    }

    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: headers,
      body: formData
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.detail || 'Prediction failed')
    }

    return result
  } catch (error) {
    console.error('Prediction API call failed:', error)
    return {
      success: false,
      message: error.message
    }
  }
}


const loadPredictionHistory = async () => {
  if (isLoadingHistory.value) return

  try {
    isLoadingHistory.value = true


    const token = localStorage.getItem('auth_token')
    const expiry = localStorage.getItem('auth_token_expiry')

    const headers = {}
    if (token && expiry && Date.now() <= parseInt(expiry)) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      throw new Error('Authentication required')
    }

    const response = await fetch(`${API_BASE_URL}/api/predict/history`, {
      headers: headers
    })

    if (response.ok) {
      const result = await response.json()
      if (result.success) {

        const validData = (result.data || []).map(item => ({
          prediction_id: item.prediction_id || '',
          title: item.title || 'Prediction result',
          diagnosis: normalizeDiagnosis(item.diagnosis) || 'Unknown',
          confidence: typeof item.confidence === 'number' ? item.confidence : 0,
          image_filename: item.image_filename || 'Unknown file',
          created_at: item.created_at || '',
          processing_time: item.processing_time || 0,

          model_id: item.model_id || '',
          model_name: item.model_name || 'Unknown model',
          model_accuracy: typeof item.model_accuracy === 'number' ? item.model_accuracy : 0,

          image_size: item.image_size || 0,
          image_size_mb: item.image_size_mb || 0,
          image_path: item.image_path || '',
          result: item.result || null
        }))

        predictionHistory.value = validData
        console.log('Prediction history loaded successfully, total:', validData.length, 'records')
      } else {
        console.error('Get prediction history failed:', result.message)
        predictionHistory.value = []
      }
    } else {
      console.error('Get prediction history failed: HTTP', response.status)
      predictionHistory.value = []
    }
  } catch (error) {
    console.error('Get prediction history failed:', error)
    predictionHistory.value = []
  } finally {
    isLoadingHistory.value = false
  }
}


const deletePredictionHistory = async (predictionId) => {
  if (!confirm('Delete this prediction record?')) return

  try {
    const response = await fetch(`${API_BASE_URL}/api/predict/history/${predictionId}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      const result = await response.json()
      if (result.success) {

        predictionHistory.value = predictionHistory.value.filter(
          item => item.prediction_id !== predictionId
        )
        console.log('Delete successful')
      } else {
        alert(`Delete failed: ${result.message || 'Unknown error'}`)
      }
    } else {

      const errorData = await response.json().catch(() => ({}))
      alert(`Delete failed: ${errorData.detail || response.statusText}`)
    }
  } catch (error) {
    console.error('Delete prediction record failed:', error)
    alert(`Delete failed: ${error.message}`)
  }
}


const loadPredictionResult = async (historyItem) => {
  try {

    selectedModel.value = {
      model_id: historyItem.model_id,
      model_name: historyItem.model_name,
      accuracy: historyItem.model_accuracy
    }


    predictImage.value = {
      name: historyItem.image_filename,
      size: historyItem.image_size,
      image_path: historyItem.image_path
    }


    predictImagePreview.value = getImageUrl(historyItem.image_path)


    if (historyItem.result && typeof historyItem.result === 'object') {
      predictResult.value = historyItem.result
      currentPredictStep.value = 3
      isPredicting.value = false
      console.log('Loading prediction result directly from history:', historyItem.result)
      return
    }


    const fallbackResult = {
      confidence: historyItem.confidence || 0,
      diagnosis: normalizeDiagnosis(historyItem.diagnosis) || 'Unknown',
      details: {
        diabetic_retinopathy: 0.08,
        glaucoma: 0.05,
        normal: (historyItem.confidence || 0)
      },
      recommendations: historyItem.title || 'No suggestions'
    }

    predictResult.value = fallbackResult
    currentPredictStep.value = 3
    isPredicting.value = false
    console.log('Using constructed fallback prediction result:', fallbackResult)

  } catch (error) {
    console.error('Failed to load prediction result:', error)


    const fallbackResult = {
      confidence: historyItem.confidence || 0,
      diagnosis: normalizeDiagnosis(historyItem.diagnosis) || 'Unknown',
      details: {
        normal: historyItem.confidence || 0,
        abnormal: 1 - (historyItem.confidence || 0)
      },
      recommendations: historyItem.title || 'No suggestions'
    }

    predictResult.value = fallbackResult
    currentPredictStep.value = 3
    isPredicting.value = false
    console.log('Using final fallback data:', fallbackResult)
  }
}


const getImageUrl = (imagePath) => {
  if (!imagePath) return ''

  return `${API_BASE_URL}/${imagePath}`
}

const formatModelDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}


const formatModelName = (modelName) => {
  if (!modelName) return ''
  const lastUnderscoreIndex = modelName.lastIndexOf('_')
  if (lastUnderscoreIndex === -1) return modelName
  // return modelName.substring(0, lastUnderscoreIndex)
  return modelName
}


const formatModelSize = (size) => {
  if (!size || size === '0.0 MB' || size === '0 MB') return ''
  return size
}


const openImagePreview = (imageSrc) => {
  previewImageSrc.value = imageSrc
  showImagePreview.value = true
  document.body.style.overflow = 'hidden'
}

const closeImagePreview = () => {
  showImagePreview.value = false
  previewImageSrc.value = ''
  document.body.style.overflow = ''
}

const formatPredictTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US')
}

const zhDiagnosisMap = new Map([
  [String.fromCharCode(0x6b63, 0x5e38), 'Normal'],
  [String.fromCharCode(0x8f7b, 0x5ea6), 'Mild'],
  [String.fromCharCode(0x4e2d, 0x5ea6), 'Moderate'],
  [String.fromCharCode(0x91cd, 0x5ea6), 'Severe'],
])

const normalizeDiagnosis = (diagnosis) => {
  if (!diagnosis) return ''
  if (zhDiagnosisMap.has(diagnosis)) {
    return zhDiagnosisMap.get(diagnosis)
  }
  // Replace known Chinese substrings inside longer sentences
  let normalized = diagnosis
  for (const [zh, en] of zhDiagnosisMap.entries()) {
    if (normalized.includes(zh)) {
      normalized = normalized.replace(new RegExp(zh, 'g'), en)
    }
  }
  return normalized
}

const getDiagnosisClass = (diagnosis) => {
  const normalized = normalizeDiagnosis(diagnosis)
  if (normalized === 'Normal') return 'normal'
  if (normalized.includes('Mild')) return 'mild'
  if (normalized.includes('Moderate')) return 'moderate'
  if (normalized.includes('Severe')) return 'severe'
  return 'unknown'
}

const getAnalysisLabel = (key) => {
  const labels = {
    'diabetic_retinopathy': 'Diabetic Retinopathy',
    'glaucoma': 'Glaucoma',
    'normal': 'Normal',
    'cataract': 'Cataract',
    'macular_degeneration': 'Macular Degeneration'
  }
  return labels[key] || key
}


const handleModelSearch = () => {
  currentPage.value = 1
}

const setModelFilter = (filter) => {
  activeModelFilter.value = filter
  currentPage.value = 1
}

const sortModels = () => {
  currentPage.value = 1
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const getModelStatusClass = (accuracy) => {
  const acc = parseFloat(accuracy)
  if (acc >= 95) return 'excellent'
  if (acc >= 90) return 'good'
  if (acc >= 85) return 'fair'
  return 'needs-improvement'
}

const getModelStatusText = (accuracy) => {
  // const acc = parseFloat(accuracy)
  if (accuracy == "High") return 'Excellent'
  if (accuracy == "Medium") return 'Good'
  if (accuracy == "Low") return 'Fair'
  return 'Needs Improvement'
}

const getAccuracyClass = (accuracy) => {
  const acc = parseFloat(accuracy)
  if (acc >= 95) return 'excellent'
  if (acc >= 90) return 'good'
  if (acc >= 85) return 'fair'
  return 'poor'
}

const viewModelDetails = (model) => {

  console.log('View model details:', model)

}


const nextPredictStep = () => {
  if (currentPredictStep.value < 3) {
    currentPredictStep.value++
  }
}

const prevPredictStep = () => {
  if (currentPredictStep.value > 1) {
    currentPredictStep.value--
  }
}

const selectPredictModel = (model) => {
  selectedModel.value = model
}

const resetPredict = () => {
  currentPredictStep.value = 1
  selectedModel.value = null
  predictImage.value = null
  predictImagePreview.value = null
  predictResult.value = null
  isPredicting.value = false
  currentPredictionTaskId.value = null
}


const startNewPrediction = () => {

  switchSection('online-predict')


  resetPredict()

  console.log('Start a new prediction flow')
}

const showAllModels = () => {

  console.log('Show all models')
}


onMounted(() => {
  if (activeSection.value === 'online-predict') {
    loadUserModels()
  }
})

onUnmounted(() => {

  if (statusPoller.value) {
    statusPoller.value.stop()
    statusPoller.value = null
  }


  if (trainingInterval.value) {
    clearInterval(trainingInterval.value)
  }
})
</script>

<style lang="scss" scoped>
.training-page {
  height: 100vh;
  background: var(--bg-secondary);
  overflow: hidden;
}

.training-layout {
  display: flex;
  height: calc(100vh - 80px);
  margin-top: 80px;
}


.sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(229, 231, 235, 0.3);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.sidebar-content {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.new-chat-btn {
  width: 100%;
  padding: 0.875rem 1.25rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
}

.new-chat-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.menu-section {
  display: flex;
  flex-direction: column;
  position: relative;
}

.menu-section:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: -0.25rem;
  left: 1rem;
  right: 1rem;
  height: 1px;
  background: #e5e7eb;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
  padding: 0 0.75rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -0.375rem;
  left: 0.75rem;
  width: 2rem;
  height: 2px;
  background: var(--primary-color);
  border-radius: 1px;
  opacity: 0.3;
}

.menu-item {
  width: 100%;
  padding: 0.875rem 1rem;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  text-align: left;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  margin: 0.125rem 0;
}

.menu-item:hover {
  background: #f3f4f6;
  transform: translateX(4px);
  color: #1f2937;
}

.menu-item.active {
  background: linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%);
  color: var(--primary-color);
  font-weight: 600;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background: var(--primary-color);
  border-radius: 0 2px 2px 0;
}

.menu-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.menu-item:hover .menu-icon {
  transform: scale(1.1);
}

.menu-item.active .menu-icon {
  color: var(--primary-color);
  filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
}


.main-content {
  flex: 1;
  overflow-y: auto;
  background: #ffffff;

  &.qa-content {
    padding: 0;
  }
}

.content-section {
  padding: 2rem;
  min-height: 100%;
}

.content-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}


.training-interface {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.config-panel,
.monitor-panel {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
}

.config-panel h3,
.monitor-panel h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.upload-section {
  margin: 1rem 0;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px dashed #d1d5db;
}

.upload-btn {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
}

.file-info {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.start-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.875rem;
}

.start-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.training-progress {
  background: white;
  border-radius: 8px;
  padding: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.logs {
  max-height: 200px;
  overflow-y: auto;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.log-item {
  padding: 0.25rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.no-training {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}


.predict-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: white;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #6b7280;
  margin-bottom: 1rem;
}

.predict-result {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
}

.result-placeholder {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  border: 1px dashed #d1d5db;
  border-radius: 6px;
}


.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tool-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.tool-icon {
  width: 40px;
  height: 40px;
  color: var(--primary-color);
  margin: 0 auto 1rem;
}


.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.title-icon {
  width: 2rem;
  height: 2rem;
  color: var(--primary-color);
}

.page-description {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.training-wizard {
  max-width: 800px;
  margin: 0 auto;
}


.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  padding: 0 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.step-number {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  border: 3px solid #e5e7eb;
}

.step-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.3s ease;
}

.step.active .step-number,
.step.completed .step-number {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.step.active .step-title,
.step.completed .step-title {
  color: var(--primary-color);
  font-weight: 600;
}

.step.completed .step-number {
  background: #10b981;
  border-color: #10b981;
}

.step.completed .step-title {
  color: #10b981;
}

.step-line {
  flex: 1;
  height: 2px;
  background: #e5e7eb;
  margin: 0 2rem;
  position: relative;
  top: -1.25rem;
}

.step.completed+.step-line {
  background: #10b981;
}


.wizard-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.step-content {
  padding: 0;
}

.step-card {
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  text-align: center;
}

.card-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.card-header p {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

.card-body {
  padding: 2rem;
  flex: 1;
}

.card-footer {
  padding: 1.5rem 2rem;
  background: transparent;
  border-top: 1px solid rgba(243, 244, 246, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.card-footer:has(button:only-child) {
  justify-content: flex-end;
}


.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.label-icon {
  width: 1rem;
  height: 1rem;
  color: var(--primary-color);
}

.textarea-input {
  width: 100%;
  padding: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.textarea-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-hint {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.4;
}

.hint-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}


.guide-card {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.guide-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.guide-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--primary-color);
}

.guide-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
}

.guide-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.guide-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.guide-step-number {
  width: 1.5rem;
  height: 1.5rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.guide-step-text {
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.5;
}


.upload-zone {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafbfc;
}

.upload-zone:hover {
  border-color: var(--primary-color);
  background: #f0f9ff;
}

.upload-zone.upload-dragging {
  border-color: var(--primary-color);
  background: #eff6ff;
  transform: scale(1.02);
}

.upload-zone.upload-active {
  border-color: #10b981;
  background: #f0fdf4;
}

.upload-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  width: 4rem;
  height: 4rem;
  color: #9ca3af;
}

.upload-empty h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.upload-empty p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.upload-btn-secondary {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-btn-secondary:hover {
  background: var(--primary-color);
  color: white;
}

.upload-uploading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
}

.upload-spinner {
  width: 3rem;
  height: 3rem;
  color: var(--primary-color);
}

.upload-uploading h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.upload-uploading p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.upload-success {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 2px solid #10b981;
}

.upload-success-icon {
  width: 2rem;
  height: 2rem;
  color: #10b981;
  flex-shrink: 0;
}

.file-details {
  flex: 1;
}

.file-details h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.file-details p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.btn-remove {
  padding: 0.5rem 1rem;
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
}

.btn-remove:hover {
  background: #fecaca;
}

.btn-remove svg {
  width: 0.875rem;
  height: 0.875rem;
}


.training-summary {
  background: transparent;
  border: 1px solid rgba(229, 231, 235, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  min-width: 100px;
}

.summary-value {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: right;
  line-height: 1.4;
  flex: 1;
  margin-left: 1rem;
}

.summary-item-base-model .summary-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.summary-value-column {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  gap: 0.5rem;
  margin-left: 1rem;
}

.summary-value-column .select-hint {
  margin: 0;
  font-size: 0.8rem;
}

.summary-value-column .select-description {
  margin: 0;
}

.select-input {
  width: 25%;
  margin-left: auto;
  margin-right: 0;
  
  
  border-radius: 4px;
  font-size: 0.875rem;
  
  font-family: inherit;
  background-color: #fff;
  transition: border-color 0.2s ease;
}

.select-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}

.select-hint {
  margin: 0.75rem 0 0;
  font-size: 0.8125rem;
  color: #64748b;
}

.select-description {
  margin: 0.35rem 0 0;
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
}


.model-name-settings {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.text-input {
  width: 100%;
  padding: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.text-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}



.time-estimate {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #fffbeb;
  border: 1px solid #fed7aa;
  border-radius: 8px;
}

.estimate-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #f59e0b;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.estimate-text h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #92400e;
  margin: 0 0 0.25rem 0;
}

.estimate-text p {
  font-size: 0.875rem;
  color: #a16207;
  margin: 0;
}


.btn-primary,
.btn-secondary,
.btn-outline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: 2px solid transparent;
  font-size: 0.875rem;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

.btn-outline {
  background: white;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-1px);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}


.training-monitor {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.monitor-header {
  text-align: center;
  margin-bottom: 3rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #dbeafe;
  color: var(--primary-color);
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.status-badge.completed {
  background: #dcfce7;
  color: #16a34a;
}

.status-icon {
  width: 1rem;
  height: 1rem;
}

.status-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.monitor-header h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.monitor-header p {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

.progress-section {
  margin-bottom: 3rem;
}

.progress-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(59, 130, 246, 0.02);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 8px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.progress-bar-container {
  margin-bottom: 1rem;
}

.progress-bar-modern {
  width: 100%;
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill-modern {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color) 0%, #60a5fa 100%);
  transition: width 0.5s ease;
  position: relative;
}

.progress-fill-modern::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%);
  animation: progress-shimmer 2s infinite;
}

@keyframes progress-shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.progress-text {
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-color);
}


.training-logs {
  margin-bottom: 3rem;
}

.training-logs h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.logs-container {
  background: #1f2937;
  border-radius: 8px;
  padding: 1rem;
  max-height: 200px;
  overflow-y: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.log-entry {
  display: flex;
  gap: 1rem;
  padding: 0.25rem 0;
  font-size: 0.75rem;
  line-height: 1.4;
}

.log-time {
  color: #6b7280;
  flex-shrink: 0;
  min-width: 80px;
}

.log-message {
  color: #e5e7eb;
}


.completion-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}


.sidebar-footer {
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.5);
}

.sidebar-footer-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  padding: 0.5rem 0.75rem;
}

.sidebar-footer-info svg {
  width: 14px;
  height: 14px;
  color: var(--primary-color);
}


.menu-item[title]:hover::after {
  content: attr(title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: #1f2937;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 100;
  opacity: 0;
  animation: tooltip-appear 0.2s ease forwards;
}

@keyframes tooltip-appear {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}


.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}


.sidebar {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
}


.predict-nav-footer {
  padding: 2rem !important;
  background: transparent;
  border-top: 1px solid rgba(226, 232, 240, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.predict-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  min-width: 120px;
  height: 48px;
  position: relative;
  overflow: hidden;
}

.nav-btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

.nav-btn-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.nav-btn-text {
  font-weight: 600;
  letter-spacing: 0.025em;
}


.predict-nav-prev {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #e2e8f0;
  color: #475569;
}

.predict-nav-prev::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.predict-nav-prev:hover::before {
  opacity: 1;
}

.predict-nav-prev:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
  color: #3b82f6;
}

.predict-nav-prev:hover .nav-btn-icon {
  transform: translateX(-3px);
}

.predict-nav-prev:active {
  transform: translateY(0);
}


.predict-nav-next {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: 2px solid transparent;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.predict-nav-next::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.predict-nav-next:hover::before {
  opacity: 1;
}

.predict-nav-next:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.5);
}

.predict-nav-next:hover .nav-btn-icon {
  transform: translateX(3px);
}

.predict-nav-next:active {
  transform: translateY(-1px);
}


.predict-nav-next.disabled {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  cursor: not-allowed;
  box-shadow: none;
  transform: none !important;
}

.predict-nav-next.disabled::before {
  display: none;
}

.predict-nav-next.disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}


.predict-nav-reset {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: 2px solid transparent;
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.predict-nav-reset::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.predict-nav-reset:hover::before {
  opacity: 1;
}

.predict-nav-reset:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.5);
}

.predict-nav-reset:hover .nav-btn-icon {
  transform: rotate(180deg);
}

.predict-nav-reset:active {
  transform: translateY(-1px);
}


@media (max-width: 768px) {
  .predict-nav-footer {
    padding: 1.5rem !important;
    gap: 1rem;
    flex-direction: column-reverse;
  }

  .predict-nav-btn {
    width: 100%;
    min-width: auto;
  }
}


.prediction-history {
  margin-top: 0.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.history-empty {
  padding: 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
}

.history-empty p {
  margin: 0;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.history-item:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
  border-color: rgba(59, 130, 246, 0.2);
  transform: translateX(2px);
}

.history-item:active {
  transform: translateX(1px);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
}

.history-content {
  flex: 1;
  min-width: 0;
}

.history-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  line-height: 1.4;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.history-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.diagnosis {
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  color: #065f46;
  font-weight: 500;
  border: 1px solid #a7f3d0;
}

.confidence {
  font-weight: 600;
  color: #3b82f6;
}

.history-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;
  opacity: 0;
  transform: scale(0.8);
}

.history-item:hover .history-delete {
  opacity: 1;
  transform: scale(1);
}

.history-delete:hover {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #dc2626;
  border: 1px solid #fecaca;
}

.history-delete:active {
  transform: scale(0.95);
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
}

.history-delete svg {
  width: 14px;
  height: 14px;
}


.prediction-history::-webkit-scrollbar {
  width: 4px;
}

.prediction-history::-webkit-scrollbar-track {
  background: transparent;
}

.prediction-history::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.prediction-history::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}


@keyframes historyItemAppear {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.history-item {
  animation: historyItemAppear 0.3s ease-out;
}


.image-link {
  color: #3b82f6 !important;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  word-break: break-all;
}

.image-link:hover {
  color: #2563eb !important;
  border-bottom-color: #3b82f6;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
  padding: 2px 4px;
  border-radius: 4px;
  margin: -2px -4px;
}

.image-link:active {
  color: #1d4ed8 !important;
  transform: scale(0.98);
}


.summary-item .image-link {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', monospace;
  font-size: 0.875em;
  font-weight: 500;
}

.new-chat-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%);
  pointer-events: none;
}


@media (max-width: 768px) {
  .training-layout {
    flex-direction: column;
    height: auto;
  }

  .sidebar {
    width: 100%;
    height: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .sidebar-content {
    padding: 1rem;
  }

  .step-indicator {
    flex-direction: column;
    gap: 1rem;
  }

  .step-line {
    display: none;
  }

  .setting-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .progress-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .completion-actions {
    flex-direction: column;
  }

  .card-footer {
    flex-direction: column;
  }

  .menu-item[title]:hover::after {
    display: none;
  }
}

.tool-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.tool-card p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}


.model-selection {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.model-selection h3 {
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.loading-models {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.no-models {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  color: var(--text-secondary);
  text-align: center;
}

.no-models-icon {
  width: 64px;
  height: 64px;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.no-models p {
  margin: 0 0 1.5rem 0;
  font-size: 1.1rem;
}

.go-training-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.go-training-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.model-card {
  background: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.model-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.model-card.active {
  border-color: var(--primary-color);
  background: rgba(59, 130, 246, 0.05);
}

.model-info h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
}

.model-desc {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.model-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.model-stats span {
  font-size: 0.85rem;
  color: var(--text-secondary);
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.model-date {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.model-select-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 24px;
  height: 24px;
  color: var(--primary-color);
}

.predict-card.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.upload-area.disabled {
  background: #f5f5f5;
}

.model-required-hint {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fef3cd;
  border: 1px solid #fbbf24;
  border-radius: 6px;
  color: #92400e;
  font-size: 0.9rem;
  text-align: center;
}


.result-content {
  padding: 1.5rem 0;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.model-used {
  font-size: 0.95rem;
  color: var(--text-primary);
}

.predict-time {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.diagnosis-result {
  space-y: 1.5rem;
}

.main-diagnosis {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.diagnosis-label {
  font-weight: 500;
  color: var(--text-secondary);
}

.diagnosis-value {
  font-weight: 600;
  font-size: 1.1rem;
}

.diagnosis-value.normal {
  color: #059669;
}

.diagnosis-value.mild {
  color: #d97706;
}

.diagnosis-value.moderate {
  color: #dc2626;
}

.diagnosis-value.severe {
  color: #991b1b;
}

.confidence {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.detailed-results {
  margin-bottom: 1.5rem;
}

.detailed-results h4 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
}

.analysis-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.analysis-label {
  min-width: 140px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.analysis-bar {
  flex: 1;
  height: 20px;
  background: #f3f4f6;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.analysis-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 10px;
  transition: width 0.3s ease;
}

.analysis-value {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  color: white;
  font-weight: 500;
}

.recommendations {
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  padding: 1rem;
}

.recommendations h4 {
  margin: 0 0 0.5rem 0;
  color: #0369a1;
  font-size: 1rem;
  font-weight: 600;
}

.recommendations p {
  margin: 0;
  color: #0c4a6e;
  line-height: 1.5;
}


.image-preview {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
}

.predict-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.image-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.image-info p {
  margin: 0;
  font-size: 0.75rem;
  color: #64748b;
}

.btn-clear {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 113, 113, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-clear:hover {
  background: rgba(239, 68, 68, 1);
  transform: scale(1.05);
}

.btn-clear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-clear svg {
  width: 1rem;
  height: 1rem;
}

.predict-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-predict-start,
.btn-predict-stop {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-predict-start {
  background: var(--primary-color);
  color: white;
}

.btn-predict-start:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-predict-stop {
  background: #ef4444;
  color: white;
}

.btn-predict-stop:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-predict-start:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-predict-start .btn-icon,
.btn-predict-stop .btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.predict-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
}

.status-spinner {
  width: 3rem;
  height: 3rem;
  color: var(--primary-color);
  animation: spin 1s linear infinite;
}

.predict-status h4 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
}

.predict-status p {
  margin: 0;
  font-size: 0.875rem;
  color: #64748b;
}

.upload-prompt {
  text-align: center;
}




.predict-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2.5rem 2rem;
  border-radius: 16px 16px 0 0;
  margin: -2rem -2rem 2rem -2rem;
  position: relative;
  overflow: hidden;
}

.predict-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: background-drift 20s linear infinite;
}

@keyframes background-drift {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  100% {
    transform: translate(-30px, -30px) rotate(360deg);
  }
}

.header-content {
  position: relative;
  z-index: 1;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.header-title h1 {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header-icon {
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.header-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}

.diagnosis-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
}


.prediction-workflow {
  max-width: 1000px;
  margin: 0 auto;
}

.workflow-step {
  background: white;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.workflow-step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #e5e7eb;
  transition: all 0.3s ease;
}

.workflow-step.active::before {
  background: linear-gradient(90deg, var(--primary-color), #60a5fa);
}

.workflow-step.completed::before {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.workflow-step.active {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}

.workflow-step.completed {
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.15);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2rem 1rem 2rem;
}

.step-number {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  position: relative;
}

.workflow-step.active .step-number {
  background: linear-gradient(135deg, var(--primary-color), #60a5fa);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.workflow-step.completed .step-number {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.workflow-step.completed .step-number::after {
  content: '✓';
  position: absolute;
  font-size: 1rem;
}

.step-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.step-info p {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.step-content {
  padding: 0 2rem 2rem 2rem;
}


.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.model-option {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.model-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s ease;
}

.model-option:hover::before {
  left: 100%;
}

.model-option:hover {
  border-color: var(--primary-color);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
}

.model-option.selected {
  border-color: var(--primary-color);
  background: rgba(59, 130, 246, 0.05);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
}

.model-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.model-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.model-status {
  padding: 0.25rem 0.75rem;
  background: #dcfce7;
  color: #16a34a;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.model-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
}

.metric-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.metric-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
}

.model-meta {
  font-size: 0.75rem;
  color: #9ca3af;
}

.selected-model-summary {
  background: rgba(16, 185, 129, 0.05);
  border: 2px solid #10b981;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.selected-model-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.model-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: #10b981;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-change {
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid #10b981;
  color: #10b981;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-change:hover {
  background: #10b981;
  color: white;
}


.image-upload-area {
  margin-top: 1.5rem;
}

.upload-zone {
  border: 3px dashed #d1d5db;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafbfc;
  position: relative;
  overflow: hidden;
}

.upload-zone::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(45deg,
      transparent,
      transparent 10px,
      rgba(59, 130, 246, 0.03) 10px,
      rgba(59, 130, 246, 0.03) 20px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.upload-zone:hover::before {
  opacity: 1;
}

.upload-zone:hover {
  border-color: var(--primary-color);
  background: #f0f9ff;
  transform: scale(1.02);
}

.upload-icon {
  width: 4rem;
  height: 4rem;
  color: #9ca3af;
  margin-bottom: 1.5rem;
}

.upload-text h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.upload-text p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}


.image-preview-area {
  margin-top: 1.5rem;
}

.preview-container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}

.image-preview {
  position: relative;
  flex-shrink: 0;
}

.preview-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-remove-image {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 2rem;
  height: 2rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
}

.btn-remove-image:hover:not(:disabled) {
  background: #dc2626;
  transform: scale(1.1);
}

.btn-remove-image:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.image-info h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.image-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.separator {
  color: #d1d5db;
}


.diagnosis-action {
  text-align: center;
  margin-top: 1.5rem;
}

.btn-diagnose {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), #60a5fa);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-diagnose::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-diagnose:hover::before {
  left: 100%;
}

.btn-diagnose:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.diagnosis-note {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 1rem 0 0 0;
}


.diagnosis-progress {
  text-align: center;
  margin-top: 1.5rem;
}

.progress-animation {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.scanning-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  animation: scanning 2s ease-in-out infinite;
}

@keyframes scanning {

  0%,
  100% {
    width: 20px;
    opacity: 0.3;
  }

  50% {
    width: 100px;
    opacity: 1;
  }
}

.progress-icon {
  width: 4rem;
  height: 4rem;
  color: var(--primary-color);
}

.progress-text h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.progress-text p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}

.btn-stop {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-stop:hover {
  background: #dc2626;
  transform: translateY(-1px);
}


.diagnosis-results {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  overflow: hidden;
}

.results-header {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  padding: 2rem;
  text-align: center;
}

.results-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.results-title h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.analysis-meta {
  font-size: 0.875rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.results-content {
  padding: 2rem;
}


.primary-diagnosis {
  margin-bottom: 2rem;
}

.diagnosis-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}

.diagnosis-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.diagnosis-icon.normal {
  background: #dcfce7;
  color: #16a34a;
}

.diagnosis-icon.mild {
  background: #fef3c7;
  color: #d97706;
}

.diagnosis-icon.moderate {
  background: #fee2e2;
  color: #dc2626;
}

.diagnosis-icon.severe {
  background: #fecaca;
  color: #991b1b;
}

.diagnosis-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.confidence-score {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.confidence-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.confidence-bar {
  flex: 1;
  height: 24px;
  background: #f3f4f6;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.confidence-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  border-radius: 12px;
  transition: width 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.75rem;
}

.confidence-text {
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
}


.detailed-analysis {
  margin-bottom: 2rem;
}

.detailed-analysis h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.analysis-grid {
  display: grid;
  gap: 1rem;
}

.analysis-item {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.analysis-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.analysis-percentage {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
}

.analysis-progress {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar .progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}


.medical-recommendations {
  background: #f0f9ff;
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.medical-recommendations h4 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0369a1;
  margin: 0 0 1rem 0;
}

.recommendation-content p {
  color: #0c4a6e;
  line-height: 1.6;
  margin: 0;
}


.results-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.results-actions .btn-secondary,
.results-actions .btn-primary {
  padding: 0.875rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}




.models-toolbar {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-box {
  position: relative;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6b7280;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-tag {
  padding: 8px 16px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tag:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-tag.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.view-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.sort-select {
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.view-toggle {
  display: flex;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

.view-btn {
  padding: 8px 12px;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.view-btn svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.view-btn.active {
  background: var(--primary-color);
}

.view-btn.active svg {
  color: white;
}


.models-container {
  min-height: 400px;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: #6b7280;
}

.no-results svg {
  width: 4rem;
  height: 4rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.no-results h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.no-results p {
  margin: 0;
  font-size: 0.875rem;
}


.models-grid.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}


.models-grid.list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.models-grid.list-view .model-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
}

.models-grid.list-view .card-content {
  flex: 1;
  margin: 0 1rem;
}

.models-grid.list-view .model-metrics {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
}


.model-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.model-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.model-card.selected {
  border-color: var(--primary-color);
  background: rgba(59, 130, 246, 0.02);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.model-status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.model-status-badge.excellent {
  background: #dcfce7;
  color: #16a34a;
}

.model-status-badge.good {
  background: #dbeafe;
  color: #2563eb;
}

.model-status-badge.fair {
  background: #fef3c7;
  color: #d97706;
}

.model-status-badge.needs-improvement {
  background: #fee2e2;
  color: #dc2626;
}

.model-selection-indicator {
  display: flex;
  align-items: center;
}

.radio-button {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.radio-button.checked {
  border-color: var(--primary-color);
  background: var(--primary-color);
}

.radio-inner {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.radio-button.checked .radio-inner {
  opacity: 1;
}

.card-content {
  padding: 1rem;
}

.model-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.model-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.metric-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
}

.accuracy-bar {
  position: relative;
  width: 100px;
  height: 16px;
  background: #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
}

.accuracy-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  border-radius: 8px;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accuracy-text {
  color: white;
  font-size: 11px;
  font-weight: 600;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: transparent;
  border-top: 1px solid rgba(226, 232, 240, 0.3);
}

.model-date {
  font-size: 0.75rem;
  color: #9ca3af;
}

.model-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 28px;
  height: 28px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn svg {
  width: 14px;
  height: 14px;
  color: var(--primary-color);
}

.action-btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.action-btn:hover svg {
  color: white;
}


.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  margin-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.pagination-info {
  font-size: 0.875rem;
  color: #6b7280;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 12px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn svg {
  width: 16px;
  height: 16px;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-number {
  width: 36px;
  height: 36px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-number:hover:not(.active) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.page-number.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}


.pagination-section {
  margin-top: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid #e5e7eb;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 44px;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f3f4f6;
  border-color: #e5e7eb;
  color: #9ca3af;
}

.pagination-section .pagination-info {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  margin: 0 1rem;
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
}


@media (max-width: 768px) {
  .predict-header {
    padding: 2rem 1rem;
  }

  .diagnosis-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .models-toolbar {
    padding: 1rem;
  }

  .view-controls {
    margin-left: 0;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  .models-grid {
    grid-template-columns: 1fr;
  }

  .pagination-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .page-numbers {
    flex-wrap: wrap;
    justify-content: center;
  }

  .preview-container {
    flex-direction: column;
    text-align: center;
  }

  .diagnosis-card {
    flex-direction: column;
    text-align: center;
  }

  .confidence-score {
    flex-direction: column;
    align-items: stretch;
  }

  .step-header {
    padding: 1.5rem 1rem 0.5rem 1rem;
  }

  .step-content {
    padding: 0 1rem 1.5rem 1rem;
  }

  .models-grid.list-view .model-card {
    flex-direction: column;
    align-items: stretch;
  }

  .models-grid.list-view .card-content {
    margin: 1rem 0;
  }

  .models-grid.list-view .model-metrics {
    flex-direction: column;
    gap: 0.75rem;
  }
}




.models-grid-compact {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}


.model-card-compact {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  hover: transform;
}

.model-card-compact:hover {
  border-color: var(--primary-color);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.15);
}

.model-card-compact.selected {
  border-color: var(--primary-color);
  background: rgba(59, 130, 246, 0.02);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.2);
}


.model-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.model-status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.model-status-indicator.excellent {
  background: #dcfce7;
  color: #16a34a;
}

.model-status-indicator.good {
  background: #dbeafe;
  color: #2563eb;
}

.model-status-indicator.fair {
  background: #fef3c7;
  color: #d97706;
}

.model-status-indicator.needs-improvement {
  background: #fee2e2;
  color: #dc2626;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.model-selection-radio {
  display: flex;
  align-items: center;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.radio-circle.checked {
  border-color: var(--primary-color);
  background: var(--primary-color);
}

.radio-inner {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.radio-circle.checked .radio-inner {
  opacity: 1;
}


.model-card-body {
  padding: 1.5rem;
  text-align: center;
}

.model-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
}

.model-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}


.accuracy-display {
  margin-bottom: 1.5rem;
}

.accuracy-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

.accuracy-visual {
  display: flex;
  justify-content: center;
}

.accuracy-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.accuracy-circle.excellent {
  background: linear-gradient(135deg, #10b981, #34d399);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.accuracy-circle.good {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.accuracy-circle.fair {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.accuracy-circle.poor {
  background: linear-gradient(135deg, #ef4444, #f87171);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.accuracy-number {
  position: relative;
  z-index: 1;
}


.model-info-compact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  justify-content: center;
}

.info-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}


.selection-indicator {
  position: absolute;
  top: -1px;
  right: -1px;
  width: 32px;
  height: 32px;
  background: var(--primary-color);
  border-radius: 0 16px 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.selection-indicator svg {
  width: 16px;
  height: 16px;
}


.view-more-section {
  margin-top: 2rem;
  text-align: center;
}

.divider-with-text {
  position: relative;
  margin-bottom: 1.5rem;
}

.divider-with-text::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb;
}

.divider-with-text span {
  background: white;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.btn-view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.btn-view-all:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-view-all svg {
  width: 16px;
  height: 16px;
}


@media (max-width: 768px) {
  .models-grid-compact {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .model-card-compact {
    margin-bottom: 1rem;
  }

  .model-card-body {
    padding: 1rem;
  }

  .accuracy-circle {
    width: 50px;
    height: 50px;
    font-size: 0.75rem;
  }
}


.clickable-image {
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable-image:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

.image-preview-overlay {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  padding: 2rem;
}

.image-preview-container {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.image-preview-close {
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 3rem;
  height: 3rem;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 10000;
}

.image-preview-close:hover {
  transform: scale(1.1);
  background: #f3f4f6;
}

.image-preview-close svg {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
  color: #374151;
}

.preview-image {
  max-width: 80vw;
  max-height: 80vh;
  width: auto;
  height: auto;
  border-radius: 8px;
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


.summary-image-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.summary-image-preview:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
}

.summary-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
}

.summary-image-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
}

.image-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-size {
  font-size: 0.75rem;
  color: #64748b;
}

.image-preview-hint {
  font-size: 0.7rem;
  color: #3b82f6;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}


@media (max-width: 768px) {
  .image-preview-overlay {
    padding: 1rem;
  }

  .preview-image {
    max-width: 95vw;
    max-height: 85vh;
  }

  .image-preview-close {
    top: -0.5rem;
    right: -0.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  .summary-image-preview {
    gap: 0.75rem;
    padding: 0.5rem;
  }

  .summary-image {
    width: 50px;
    height: 50px;
  }
}


.required-star {
  color: #ef4444;
  margin-left: 0.25rem;
  font-weight: bold;
}


.predict-btn {
  justify-content: center;
  background: var(--primary-color);
  color: white;
  border: 1px solid var(--primary-color);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.predict-btn:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}


.btn-close {
  min-width: 32px;
  width: 32px;
  height: 32px;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: #fecaca;
  color: #b91c1c;
  transform: scale(1.05);
}

.btn-close svg {
  width: 16px;
  height: 16px;
}
</style>
