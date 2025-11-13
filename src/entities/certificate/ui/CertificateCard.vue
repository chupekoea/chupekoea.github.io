<template>
    <div class="certificate-card">
      <img :src="certificate.image" :alt="certificate.title" class="certificate-card__image" />
      <div class="certificate-card__content">
        <h4 class="certificate-card__title">{{ certificate.title }}</h4>
        <p class="certificate-card__date">Выдан: {{ formatDate(certificate.issueDate) }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Certificate } from '../model/types'
  
  interface Props {
    certificate: Certificate
  }
  
  defineProps<Props>()
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  </script>
  
  <style scoped lang="scss">
  .certificate-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  
    &:hover {
      transform: scale(1.05);
    }
  
    &__image {
      width: 100%;
      height: 280px;
      object-fit: cover;
    }
  
    &__content {
      padding: 20px;
    }
  
    &__title {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 8px;
    }
  
    &__date {
      color: #999;
      font-size: 14px;
    }
  }
  </style>
  