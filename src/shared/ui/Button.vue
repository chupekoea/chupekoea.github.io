<template>
    <button
      :class="['btn', `btn--${variant}`]"
      :type="type"
      :disabled="disabled"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit'
    disabled?: boolean
  }
  
  withDefaults(defineProps<Props>(), {
    variant: 'primary',
    type: 'button',
    disabled: false
  })
  </script>
  
  <style scoped lang="scss">
  .btn {
    padding: 14px 32px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  
    &--primary {
      background: #f5a623;
      color: #fff;
  
      &:hover:not(:disabled) {
        background: #e09612;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(245, 166, 35, 0.3);
      }
    }
  
    &--secondary {
      background: transparent;
      color: #f5a623;
      border: 2px solid #f5a623;
  
      &:hover:not(:disabled) {
        background: #f5a623;
        color: #fff;
      }
    }
  
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  </style>
  