<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-loading': loading, 'btn-disabled': disabled }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <div v-if="loading" class="btn-spinner"></div>
    <slot v-else />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.loading && !props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  outline: none;
}

.btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

.btn-medium {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--bg-secondary);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-danger {
  background-color: var(--error-color);
  color: white;
}

.btn-danger:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: #dc2626;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-success {
  background-color: var(--success-color);
  color: white;
}

.btn-success:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: #059669;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-disabled,
.btn-loading {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>