<template>
  <div class="home-page">
    
    <AppNavigation />

    
    <main class="main-content">
      
      <section class="hero-section">
        <div class="hero-background">
          
          <div class="tech-grid">
            <div class="grid-lines grid-horizontal"></div>
            <div class="grid-lines grid-vertical"></div>
          </div>
          
          
          <div class="particle-container">
            <div class="particle" v-for="n in 20" :key="n" :style="getParticleStyle(n)"></div>
          </div>
          
          
          <div class="scan-line"></div>
          
          
          <div class="data-stream">
            <div class="stream-item" v-for="n in 5" :key="n" :style="getStreamStyle(n)"></div>
          </div>
          
          
          <div class="floating-elements">
            <div class="floating-hexagon hex-1"></div>
            <div class="floating-hexagon hex-2"></div>
            <div class="floating-circle circle-1"></div>
            <div class="floating-circle circle-2"></div>
            <div class="floating-square square-1"></div>
          </div>
        </div>
        
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            {{ $t('hero.badge') }}
          </div>
          
          <h1 class="hero-title">
            {{ $t('hero.title') }}
          </h1>
          
          <p class="hero-description">
            {{ $t('hero.description') }}
          </p>
          
          <div class="hero-actions">
            <div class="action-card primary-action" @click="navigateToTraining">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="action-content">
                <h3 class="action-title">{{ $t('features.work.title') }}</h3>
                <p class="action-description">{{ $t('features.work.description') }}</p>
              </div>
              <div class="action-arrow">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                </svg>
              </div>
            </div>
            
            <div class="action-card secondary-action" @click="openDemoVideo">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div class="action-content">
                <h3 class="action-title">{{ $t('features.tutorial.title') }}</h3>
                <p class="action-description">{{ $t('features.tutorial.description') }}</p>
              </div>
              <div class="action-arrow">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>


      
      <section class="contact-section" id="contact">
        <div class="container">
          <div class="contact-content">
            <h2 class="contact-title">{{ $t('contact.title') }}</h2>
            

            <p class="contact-description">{{ $t('contact.description') }} <a href='mailto:hongqiuwang16@gmail.com' target='_blank'>📧</a></p>
            <div class="qr-placeholder">
              <div class="qr-code">
                <img src="https://api.easy-eyefm.com/uploads/img.png" :alt="$t('alt.qrCode')" class="qr-image">
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            <span>{{ $t('brand.title') }}</span>
          </div>
          <div class="footer-text">
            <p>&copy; 2025 Easy-EyeFM Platform. {{ $t('footer.rights') }}.</p>
          </div>
        </div>
      </div>
    </footer>
    
    
    <div v-if="showVideoModal" class="modal-overlay" @click="closeVideoModal">
      <div class="video-modal-content" @click.stop>
        <div class="video-modal-header">
          <h3 class="video-modal-title">{{ $t('video.title') }}</h3>
          <button @click="closeVideoModal" class="modal-close">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
            </svg>
          </button>
        </div>
        <div class="video-container">
          <video 
            ref="demoVideo" 
            controls 
            width="100%" 
            height="auto"
            @loadstart="onVideoLoadStart"
            @error="onVideoError"
          >
            <source src="https://api.easy-eyefm.com/uploads/yanshi.mp4" type="video/mp4">
            <p>{{ $t('video.browserSupport') }}</p>
          </video>
        </div>
      </div>
    </div>
    
    
    <div v-if="showLoginModal" class="modal-overlay" @click="closeLoginModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
        <h3 class="modal-title">{{ $t('auth.login') }}</h3>
        <button @click="closeLoginModal" class="modal-close">
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
    </div>

    
    <div v-if="showRegisterModal" class="modal-overlay" @click="closeRegisterModal">
      <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">{{ $t('auth.register') }}</h3>
        <button @click="closeRegisterModal" class="modal-close">
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
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import AppNavigation from '@/components/AppNavigation.vue'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()


const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showVideoModal = ref(false)
const loginLoading = ref(false)
const registerLoading = ref(false)


const demoVideo = ref(null)


const loginForm = reactive({
  username: ''
})

const registerForm = reactive({
  username: '',
  invite_code: ''
})


const checkAuthAndNavigate = () => {

  if (authStore.isAuthenticated) {

    router.push('/training')
  } else {

    showLoginModal.value = true
  }
}


const navigateToTraining = checkAuthAndNavigate


const closeModal = () => {
  showLoginModal.value = false
  showRegisterModal.value = false
}

const closeLoginModal = () => {
  closeModal()
}

const closeRegisterModal = () => {
  closeModal()
}

const switchToRegister = () => {
  showLoginModal.value = false
  showRegisterModal.value = true
}

const switchToLogin = () => {
  showRegisterModal.value = false
  showLoginModal.value = true
}


const openDemoVideo = () => {
  showVideoModal.value = true
}

const closeVideoModal = () => {
  showVideoModal.value = false

  if (demoVideo.value) {
    demoVideo.value.pause()
    demoVideo.value.currentTime = 0
  }
}

const onVideoLoadStart = () => {
  console.log('Video loading started')
}

const onVideoError = (event) => {
  console.error('Video failed to load:', event)
  alert(t('alert.videoLoadFailed'))
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

      closeModal()
      router.push('/training')
    } else {
      alert(t('alert.loginFailed') + '：' + (result.message || t('alert.unknownError')))
    }
  } catch (error) {
    console.error('Login failed:', error)
    alert(t('alert.loginFailed') + '：' + t('alert.networkError'))
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
      alert(t('alert.registerSuccess'))

      switchToLogin()
      

      registerForm.username = ''
      registerForm.invite_code = ''
    } else {
      alert(t('alert.registerFailed') + '：' + (result.message || t('alert.unknownError')))
    }
  } catch (error) {
    console.error('Registration failed:', error)
    alert(t('alert.registerFailed') + '：' + t('alert.networkError'))
  } finally {
    registerLoading.value = false
  }
}


const getParticleStyle = (index) => {
  const delay = Math.random() * 10
  const duration = 15 + Math.random() * 10
  const size = 2 + Math.random() * 3
  const left = Math.random() * 100
  const top = Math.random() * 100
  
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const getStreamStyle = (index) => {
  const delay = index * 2
  const left = 10 + (index * 20)
  
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`
  }
}

</script>


<style scoped>
.home-page {
  min-height: 100vh;
  height: 100vh;
  background: var(--bg-secondary);
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.main-content {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  padding-top: 80px;
}

.hero-section {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  overflow: hidden;
  padding: 2rem 0;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.02) 0%, 
    rgba(59, 130, 246, 0.05) 50%, 
    rgba(147, 197, 253, 0.02) 100%);
  overflow: hidden;
}


.tech-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
}

.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.grid-horizontal {
  background: 
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 49px,
      var(--primary-color) 50px,
      var(--primary-color) 51px
    );
  animation: gridMove 20s linear infinite;
}

.grid-vertical {
  background: 
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 49px,
      var(--primary-color) 50px,
      var(--primary-color) 51px
    );
  animation: gridMove 25s linear infinite reverse;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}


.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: var(--primary-color);
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 20s linear infinite;
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translateY(100vh) rotate(0deg);
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh) rotate(360deg);
  }
}


.scan-line {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--primary-color) 50%,
    transparent 100%
  );
  opacity: 0.6;
  animation: scanMove 8s ease-in-out infinite;
}

@keyframes scanMove {
  0% {
    left: -100%;
    top: 10%;
  }
  25% {
    left: 100%;
    top: 10%;
  }
  50% {
    left: 100%;
    top: 90%;
  }
  75% {
    left: -100%;
    top: 90%;
  }
  100% {
    left: -100%;
    top: 10%;
  }
}


.data-stream {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.stream-item {
  position: absolute;
  width: 2px;
  height: 20px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--primary-color) 50%,
    transparent 100%
  );
  opacity: 0;
  animation: streamFlow 6s ease-in-out infinite;
}

@keyframes streamFlow {
  0% {
    opacity: 0;
    top: -20px;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 100%;
  }
}


.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  opacity: 0.15;
  animation: float 8s ease-in-out infinite;
}

.circle-1 {
  width: 80px;
  height: 80px;
  top: 15%;
  left: 5%;
  animation-delay: 0s;
}

.circle-2 {
  width: 120px;
  height: 120px;
  top: 65%;
  right: 10%;
  animation-delay: 3s;
}

.floating-hexagon {
  position: absolute;
  width: 60px;
  height: 60px;
  background: transparent;
  border: 2px solid var(--primary-color);
  opacity: 0.1;
  clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
  animation: rotate 12s linear infinite;
}

.hex-1 {
  top: 25%;
  right: 20%;
  animation-delay: 1s;
}

.hex-2 {
  bottom: 30%;
  left: 15%;
  animation-delay: 5s;
}

.floating-square {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid var(--primary-color);
  opacity: 0.12;
  animation: floatRotate 10s ease-in-out infinite;
}

.square-1 {
  top: 45%;
  left: 8%;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) translateX(0px); 
  }
  25% { 
    transform: translateY(-20px) translateX(10px); 
  }
  50% { 
    transform: translateY(-40px) translateX(-5px); 
  }
  75% { 
    transform: translateY(-20px) translateX(-10px); 
  }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes floatRotate {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-30px) rotate(180deg); 
  }
}

.hero-content {
  position: relative;
  text-align: center;
  z-index: 10;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.action-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.primary-action {
  border-color: var(--primary-color);
}

.primary-action .action-icon {
  background: var(--primary-color);
  color: white;
}

.secondary-action .action-icon {
  background: rgba(107, 114, 128, 0.1);
  color: var(--text-secondary);
}

.action-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon svg {
  width: 24px;
  height: 24px;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.action-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.action-arrow {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.primary-action .action-arrow {
  color: var(--primary-color);
}

.contact-section {
  padding: 2rem 0 1rem;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
}

.contact-content {
  text-align: center;
}

.contact-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.contact-description {
  color: var(--text-secondary);
  margin: 0 0 1rem;
  font-size: 0.9rem;
}

.qr-placeholder {
  display: flex;
  justify-content: center;
}

.qr-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.qr-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 2px solid var(--primary-color);
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.qr-image:hover {
  transform: scale(1.05);
}

.qr-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.footer {
  background: rgba(248, 250, 252, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(37, 99, 235, 0.1);
  padding: 1rem 0;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-brand .brand-icon {
  width: 24px;
  height: 24px;
  background: var(--primary-color);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.footer-brand .brand-icon svg {
  width: 14px;
  height: 14px;
}

.footer-brand span {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.footer-text p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.8rem;
}


@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    grid-template-columns: 1fr;
  }
  
  .action-card {
    padding: 1.5rem;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .modal-content {
    right: 1rem;
    width: calc(100vw - 2rem);
  }
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: overlayAppear 0.2s ease-out;
}

@keyframes overlayAppear {
  from { opacity: 0; }
  to { opacity: 1; }
}

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


.video-modal-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(37, 99, 235, 0.2);
  max-width: 90vw;
  max-height: 90vh;
  width: 800px;
  animation: modalAppear 0.2s ease-out;
}

.video-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(37, 99, 235, 0.1);
}

.video-modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.video-container {
  padding: 1rem;
}

.video-container video {
  width: 100%;
  border-radius: 8px;
  background: #000;
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

.modal-close svg {
  width: 20px;
  height: 20px;
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

</style>
