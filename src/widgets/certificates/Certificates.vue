<template>
    <Section title="Сертификаты качества" dark>
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
  }
  </style>
  