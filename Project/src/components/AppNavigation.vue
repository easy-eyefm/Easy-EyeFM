<template>
  <nav class="main-nav">
    <div class="container">
      <!-- Left brand area -->
      <div class="nav-left">
        <div class="brand" @click="navigateToHome">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          <div class="brand-text">
            <h1 class="brand-title">{{ $t('brand.title') }}</h1>
            <span class="brand-subtitle">{{ $t('brand.subtitle') }}</span>
          </div>
        </div>
      </div>
      
      <!-- Right action area -->
      <div class="nav-right">
        <div class="language-selector">
          <BaseSelect
            v-model="currentLanguage"
            :options="languageOptions"
            @change="handleLanguageChange"
          />
        </div>
        
        <!-- Logged-out state -->
        <div v-if="!authStore.isAuthenticated" class="auth-actions">
          <button @click="openLoginModal" class="nav-btn login-btn">
            {{ $t('auth.login') }}
          </button>
        </div>
        
        <!-- Logged-in state -->
        <div v-else class="user-menu">
          <div class="user-info">
            <div class="user-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span class="user-name">{{ authStore.user?.username || 'User' }}</span>
          </div>
          <button @click="handleLogout" class="nav-btn logout-btn">
            {{ $t('auth.logout') }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Login modal -->
    <div v-if="showLoginModal" class="modal-content" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">{{ $t('auth.login') }}</h3>
        <button @click="closeModal" class="modal-close">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
      </div>
      <form @submit.prevent="handleLogin" class="modal-form">
        <div class="form-group">
          <label>{{ $t('form.username') }}</label>
          <input v-model="loginForm.username" type="text" required>
        </div>
        <button type="submit" class="form-submit" :disabled="loginLoading">
          <span v-if="loginLoading">{{ $t('auth.loading') }}</span>
          <span v-else>{{ $t('auth.login') }}</span>
        </button>
      </form>
      <div class="modal-footer">
        <button @click="switchToRegister" class="switch-btn">
          {{ $t('auth.noAccount') }}
        </button>
      </div>
    </div>

    <!-- Registration modal -->
    <div v-if="showRegisterModal" class="modal-content" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">{{ $t('auth.register') }}</h3>
        <button @click="closeModal" class="modal-close">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
      </div>
      <form @submit.prevent="handleRegister" class="modal-form">
        <div class="form-group">
          <label>{{ $t('form.username') }}</label>
          <input v-model="registerForm.username" type="text" required>
        </div>
        <div class="form-group">
          <label>{{ $t('form.inviteCode') }}</label>
          <input v-model="registerForm.invite_code" type="text" required>
        </div>
        <button type="submit" class="form-submit" :disabled="registerLoading">
          <span v-if="registerLoading">{{ $t('auth.loading') }}</span>
          <span v-else>{{ $t('auth.register') }}</span>
        </button>
      </form>
      <div class="modal-footer">
        <button @click="switchToLogin" class="switch-btn">
          {{ $t('auth.hasAccount') }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import BaseSelect from '@/components/BaseSelect.vue'

const router = useRouter()
const authStore = useAuthStore()
const { locale } = useI18n()

// Language support
const currentLanguage = ref(locale.value)
const languageOptions = [
  { label: 'Chinese', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
  { label: 'Español', value: 'es-ES' },
  { label: 'Français', value: 'fr-FR' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'Japanese', value: 'ja-JP' },
  { label: 'Korean', value: 'ko-KR' }
]

// Modal state
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const loginLoading = ref(false)
const registerLoading = ref(false)

// Form data
const loginForm = reactive({
  username: ''
})

const registerForm = reactive({
  username: '',
  invite_code: ''
})

// Methods
const handleLanguageChange = (option) => {
  if (option && option.value) {
    const language = option.value
    currentLanguage.value = language
    locale.value = language
    localStorage.setItem('language', language)
  }
}

const navigateToHome = () => {
  router.push('/')
}

const openLoginModal = () => {
  console.log('Opening login modal')
  showLoginModal.value = true
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

const closeModal = () => {
  showLoginModal.value = false
  showRegisterModal.value = false
}

const switchToRegister = () => {
  showLoginModal.value = false
  showRegisterModal.value = true
}

const switchToLogin = () => {
  showRegisterModal.value = false
  showLoginModal.value = true
}

const handleLogin = async () => {
  if (loginLoading.value) return
  
  loginLoading.value = true
  
  try {
    const result = await authStore.login({
      username: loginForm.username,
      invite_code: '2025'
    })
    
    if (result.success) {
      // Close modal and navigate to the training page
      closeModal()
      router.push('/training')
    } else {
      alert('Login failed: ' + (result.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed: Network error')
  } finally {
    loginLoading.value = false
  }
}

const handleRegister = async () => {
  if (registerLoading.value) return
  
  registerLoading.value = true
  
  try {
    const result = await authStore.register({
      username: registerForm.username,
      full_name: '1',
      invite_code: registerForm.invite_code
    })
    
    if (result.success) {
      alert('Registration successful! Please use your account to login')
      // Switch back to the login modal
      closeModal()
      showLoginModal.value = true
      
      // Reset registration form
      registerForm.username = ''
      registerForm.invite_code = ''
    } else {
      alert('Registration failed: ' + (result.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Registration failed: Network error')
  } finally {
    registerLoading.value = false
  }
}

// Simplified click-outside handler
const handleDocumentClick = (event) => {
  if (showLoginModal.value || showRegisterModal.value) {
    if (!event.target.closest('.modal-content') && 
        !event.target.closest('.login-btn')) {
      closeModal()
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style scoped>
/* Navigation styling */
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(37, 99, 235, 0.1);
}

.container {
  max-width: none;
  margin: 0;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 100%;
}

.nav-left {
  display: flex;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.brand:hover {
  transform: translateY(-1px);
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.brand-icon svg {
  width: 24px;
  height: 24px;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.brand-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  opacity: 0.8;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.language-selector {
  min-width: 120px;
}

/* Override BaseSelect styles to fit the light nav bar */
.language-selector :deep(.base-select) {
  width: 120px;
}

.language-selector :deep(.select-trigger) {
  background: rgba(248, 250, 252, 0.8);
  border: 2px solid rgba(37, 99, 235, 0.2);
  min-height: 40px;
  padding: 8px 12px;
}

.language-selector :deep(.select-trigger:hover) {
  border-color: rgba(37, 99, 235, 0.4);
  background: rgba(248, 250, 252, 1);
}

.language-selector :deep(.select-trigger:focus),
.language-selector :deep(.base-select.is-open .select-trigger) {
  border-color: var(--primary-color);
  background: rgba(248, 250, 252, 1);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.language-selector :deep(.select-value) {
  color: var(--text-primary);
  font-size: 0.9rem;
}

.language-selector :deep(.select-value.is-placeholder) {
  color: var(--text-secondary);
}

.language-selector :deep(.select-icon) {
  color: var(--text-secondary);
}

.language-selector :deep(.base-select.is-open .select-icon) {
  color: var(--primary-color);
}

.auth-actions {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.login-btn {
  background: var(--primary-color);
  color: white;
}

.login-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.logout-btn {
  background: #ef4444;
  color: white;
}

.logout-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.user-avatar svg {
  width: 18px;
  height: 18px;
}

.user-name {
  color: var(--text-primary);
  font-weight: 500;
}

/* Modal styling */
.modal-content {
  position: fixed;
  top: 90px;
  right: 2rem;
  width: 400px;
  max-width: calc(100vw - 4rem);
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(37, 99, 235, 0.2);
  z-index: 9999;
  animation: modalAppear 0.2s ease-out;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(37, 99, 235, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-submit {
  width: 100%;
  padding: 0.875rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-submit:hover:not(:disabled) {
  background: #1d4ed8;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.modal-footer {
  padding: 0 1.5rem 1.5rem;
  text-align: center;
}

.switch-btn {
  color: var(--primary-color);
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
}

.switch-btn:hover {
  color: #1d4ed8;
}

/* Invite code hint styling */
.invite-hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.invite-hint strong {
  color: var(--primary-color);
  font-weight: 600;
}

/* Responsive layout */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .brand-text {
    display: none;
  }
  
  .modal-content {
    right: 1rem;
    width: calc(100vw - 2rem);
  }
}
</style>
