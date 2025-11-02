<template>
  <div class="base-select" :class="{ 'is-open': isOpen, 'is-disabled': disabled, 'has-error': hasError }">
    <div class="select-trigger" @click="toggleDropdown" :tabindex="disabled ? -1 : 0" @keydown="handleKeydown">
      <span class="select-value" :class="{ 'is-placeholder': !selectedOption }">
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>
      <div class="select-icon">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
        </svg>
      </div>
    </div>
    
    <transition name="dropdown">
      <div v-if="isOpen" class="select-dropdown">
        <div class="dropdown-content">
          <div
            v-for="(option, index) in options"
            :key="option.value"
            class="dropdown-item"
            :class="{ 
              'is-selected': option.value === modelValue, 
              'is-highlighted': highlightedIndex === index,
              'is-disabled': option.disabled
            }"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = index"
          >
            <span class="item-label">{{ option.label }}</span>
            <div v-if="option.value === modelValue" class="item-check">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
            </div>
          </div>
          <div v-if="!options.length" class="dropdown-empty">
            <span>No options available</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: null
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const highlightedIndex = ref(-1)

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    highlightedIndex.value = props.options.findIndex(option => option.value === props.modelValue)
  }
}

const selectOption = (option) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option) // Emit the full option object
  isOpen.value = false
  highlightedIndex.value = -1
}

const handleKeydown = (event) => {
  if (props.disabled) return
  
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!isOpen.value) {
        toggleDropdown()
      } else if (highlightedIndex.value >= 0) {
        selectOption(props.options[highlightedIndex.value])
      }
      break
    case 'Escape':
      isOpen.value = false
      highlightedIndex.value = -1
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        toggleDropdown()
      } else {
        highlightedIndex.value = Math.min(highlightedIndex.value + 1, props.options.length - 1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (isOpen.value) {
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      }
      break
  }
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.base-select')) {
    isOpen.value = false
    highlightedIndex.value = -1
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(() => props.options, () => {
  highlightedIndex.value = -1
})
</script>

<style scoped>
.base-select {
  position: relative;
  display: inline-block;
  width: 100%;
}

.select-trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 44px;
  padding: 12px 16px;
  background: rgba(31, 31, 31, 0.8);
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  backdrop-filter: blur(10px);
}

.select-trigger:hover {
  border-color: rgba(59, 130, 246, 0.4);
}

.select-trigger:focus,
.base-select.is-open .select-trigger {
  border-color: #3b82f6;
  background: rgba(31, 31, 31, 0.95);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.base-select.is-disabled .select-trigger {
  opacity: 0.6;
  cursor: not-allowed;
  background: rgba(31, 31, 31, 0.6);
}

.base-select.has-error .select-trigger {
  border-color: #ef4444;
}

.base-select.has-error .select-trigger:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.select-value {
  flex: 1;
  color: #ffffff;
  font-size: 1rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-value.is-placeholder {
  color: #9ca3af;
}

.select-icon {
  width: 20px;
  height: 20px;
  color: #6b7280;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-left: 8px;
}

.base-select.is-open .select-icon {
  transform: rotate(180deg);
  color: #3b82f6;
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
}

.dropdown-content {
  background: rgba(26, 26, 26, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(59, 130, 246, 0.1);
  overflow: hidden;
  max-height: 240px;
  overflow-y: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  color: #d1d5db;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.dropdown-item:hover,
.dropdown-item.is-highlighted {
  background: rgba(59, 130, 246, 0.1);
  color: #ffffff;
}

.dropdown-item.is-selected {
  background: rgba(59, 130, 246, 0.15);
  color: #ffffff;
}

.dropdown-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dropdown-item.is-disabled:hover {
  background: transparent;
  color: #d1d5db;
}

.item-label {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
}

.item-check {
  width: 16px;
  height: 16px;
  color: #3b82f6;
  flex-shrink: 0;
}

.dropdown-empty {
  padding: 20px 16px;
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
}

/* Scrollbar styling */
.dropdown-content::-webkit-scrollbar {
  width: 6px;
}

.dropdown-content::-webkit-scrollbar-track {
  background: rgba(31, 31, 31, 0.5);
  border-radius: 3px;
}

.dropdown-content::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 3px;
}

.dropdown-content::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

/* Dropdown animation */
.dropdown-enter-active {
  transition: all 0.2s ease;
  transform-origin: top;
}

.dropdown-leave-active {
  transition: all 0.15s ease;
  transform-origin: top;
}

.dropdown-enter-from {
  opacity: 0;
  transform: scaleY(0.8) translateY(-8px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.8) translateY(-8px);
}

/* Responsive behaviour */
@media (max-width: 768px) {
  .select-trigger {
    min-height: 40px;
    padding: 10px 14px;
  }
  
  .dropdown-item {
    padding: 10px 14px;
  }
  
  .item-label {
    font-size: 0.9rem;
  }
}
</style>
