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
  background: linear-gradient(135deg, #ffffff, #fff7e8);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(31, 42, 55, 0.08);
  border: 1px solid rgba(247, 192, 102, 0.25);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  display: flex;
  flex-direction: column;
  gap: 0;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 60px rgba(31, 42, 55, 0.12);
  }

  &__image {
    width: 100%;
    height: 280px;
    object-fit: cover;
  }

  &__content {
    padding: 24px;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: #1f2a37;
    margin-bottom: 6px;
  }

  &__date {
    color: rgba(31, 42, 55, 0.6);
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  @media (max-width: 768px) {
    border-radius: 16px;

    &__image {
      height: 220px;
    }

    &__content {
      padding: 18px;
    }

    &__title {
      font-size: 18px;
    }

    &__date {
      font-size: 13px;
    }

    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 480px) {
    &__image {
      height: 200px;
    }

    &__content {
      padding: 16px;
    }

    &__title {
      font-size: 17px;
    }
  }
}
</style>
  