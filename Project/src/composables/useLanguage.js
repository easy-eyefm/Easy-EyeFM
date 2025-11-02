import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLanguage() {
  const { locale, t } = useI18n()
  
  const currentLanguage = ref(locale.value)
  
  const languageOptions = computed(() => [
    { label: 'Chinese', value: 'zh-CN', flag: '🇨🇳' },
    { label: 'English', value: 'en-US', flag: '🇺🇸' },
    { label: 'Español', value: 'es-ES', flag: '🇪🇸' },
    { label: 'Français', value: 'fr-FR', flag: '🇫🇷' },
    { label: 'Deutsch', value: 'de-DE', flag: '🇩🇪' },
    { label: 'Japanese', value: 'ja-JP', flag: '🇯🇵' },
    { label: 'Korean', value: 'ko-KR', flag: '🇰🇷' }
  ])
  
  const currentLanguageLabel = computed(() => {
    const current = languageOptions.value.find(lang => lang.value === currentLanguage.value)
    return current?.label || 'Language'
  })
  
  const changeLanguage = (language) => {
    // Ensure the provided language is a valid string
    if (typeof language !== 'string' || !language) {
      console.error('Invalid language value:', language)
      return
    }

    // Verify the language exists in the supported list
    if (!languageOptions.value.some(option => option.value === language)) {
      console.error('Unsupported language:', language)
      return
    }

    currentLanguage.value = language
    locale.value = language
    localStorage.setItem('language', language)

    // Update the document language attribute
    document.documentElement.lang = language

    // Emit a custom event so other components can react
    window.dispatchEvent(new CustomEvent('language-changed', {
      detail: { language, label: currentLanguageLabel.value }
    }))
  }
  
  const initLanguage = () => {
    const savedLanguage = localStorage.getItem('language')
    const supportedLanguages = languageOptions.value.map(option => option.value)
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      changeLanguage(savedLanguage)
    }
  }
  
  return {
    currentLanguage,
    languageOptions,
    currentLanguageLabel,
    changeLanguage,
    initLanguage,
    t
  }
}
