<template>
    <Section id="certificates" title="Сертификаты качества" dark>
      <div class="certificates-grid">
        <CertificateCard v-for="cert in certificates" :key="cert.id" :certificate="cert" />
      </div>
    </Section>
  </template>
  
  <script setup lang="ts">
  import Section from '@/shared/ui/Section.vue'
  import CertificateCard from '@/entities/certificate/ui/CertificateCard.vue'
  import { CERTIFICATES } from '@/shared/lib/constants'
  
  const certificates = CERTIFICATES
  </script>
  
  <style scoped lang="scss">
  .certificates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
  </style>
  