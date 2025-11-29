import { createI18n } from 'vue-i18n'

// Import locale files
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'
import esES from './locales/es-ES.json'
import frFR from './locales/fr-FR.json'
import deDE from './locales/de-DE.json'
import jaJP from './locales/ja-JP.json'
import koKR from './locales/ko-KR.json'

const messages = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'es-ES': esES,
  'fr-FR': frFR,
  'de-DE': deDE,
  'ja-JP': jaJP,
  'ko-KR': koKR
}

// Determine browser default language
const getDefaultLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage
  const supportedLanguages = Object.keys(messages)
  
  // Exact match
  if (supportedLanguages.includes(browserLang)) {
    // return browserLang
    return 'en-US'
  }
  
  // Fuzzy match (e.g., zh maps to zh-CN)
  const langPrefix = browserLang.split('-')[0]
  const fallbackLang = supportedLanguages.find(lang => lang.startsWith(langPrefix))
  
  return 'en-US'
  // return fallbackLang || 'en-US'
}

// Initialize locale preference
const initLocale = () => {
  try {
    const savedLanguage = localStorage.getItem('language')
    const supportedLanguages = Object.keys(messages)
    
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      return 'en-US'
      // return savedLanguage
    }
    
    return getDefaultLanguage()
  } catch (error) {
    console.warn('Failed to initialize locale:', error)
    return 'en-US'
  }
}

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: initLocale(),
  fallbackLocale: 'en-US',
  messages,
  globalInjection: true, // Enable global injection
  warnHtmlMessage: false, // Disable HTML warning messages
  silentTranslationWarn: true // Suppress translation warnings
})

export default i18n
