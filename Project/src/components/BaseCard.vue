<template>
  <div :class="['card', `card-${variant}`, { 'card-hover': hover }]">
    <div v-if="title || $slots.header" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
      </slot>
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'outlined', 'elevated'].includes(value)
  },
  hover: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.card {
  background: var(--bg-primary);
  border-radius: var(--radius);
  overflow: hidden;
  transition: all 0.2s ease;
}

.card-default {
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.card-outlined {
  border: 2px solid var(--border-color);
}

.card-elevated {
  border: none;
  box-shadow: var(--shadow-md);
}

.card-hover:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-header {
  padding: 1.5rem 1.5rem 0;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid var(--border-color);
  margin-top: 1rem;
  padding-top: 1rem;
}
</style>