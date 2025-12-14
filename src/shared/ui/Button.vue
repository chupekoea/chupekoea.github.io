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
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  isolation: isolate;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    transition: opacity 0.3s ease;
    opacity: 0;
    z-index: -1;
  }

  &:focus-visible {
    outline: 3px solid rgba(247, 192, 102, 0.6);
    outline-offset: 2px;
  }

  &--primary {
    background: linear-gradient(120deg, #f7c066, #f5a623 55%, #f29a20);
    color: #1f1202;
    box-shadow: 0 18px 32px rgba(245, 166, 35, 0.35);

    &::after {
      background: rgba(255, 255, 255, 0.25);
    }

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 22px 36px rgba(245, 166, 35, 0.45);

      &::after {
        opacity: 1;
      }
    }
  }

  &--secondary {
    border: 2px solid rgba(245, 166, 35, 0.4);
    color: #1f2a37;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);

    &:hover:not(:disabled) {
      color: #f5a623;
      border-color: rgba(245, 166, 35, 0.8);
      background: #fffaf4;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 14px;

    &--primary {
      box-shadow: 0 12px 24px rgba(245, 166, 35, 0.3);

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 16px 28px rgba(245, 166, 35, 0.4);
      }
    }
  }

  @media (max-width: 480px) {
    padding: 11px 20px;
    font-size: 14px;
  }
}
</style>
  