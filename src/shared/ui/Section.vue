<template>
    <section :class="['section', { 'section--dark': dark }]">
      <Container>
        <h2 v-if="title" class="section__title">{{ title }}</h2>
        <slot />
      </Container>
    </section>
  </template>
  
  <script setup lang="ts">
  import Container from './Container.vue'
  
  interface Props {
    title?: string
    dark?: boolean
  }
  
  defineProps<Props>()
  </script>
  
  <style scoped lang="scss">
  .section {
    padding: 80px 0;
    
    &--dark {
      background: #f9f9f9;
    }
  
    &__title {
      font-size: 42px;
      font-weight: 700;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 60px;
      
      &::after {
        content: '';
        display: block;
        width: 80px;
        height: 4px;
        background: #f5a623;
        margin: 20px auto 0;
        border-radius: 2px;
      }
    }
  }
  </style>
  