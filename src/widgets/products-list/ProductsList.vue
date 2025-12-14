<template>
    <Section id="products" title="Наш ассортимент">
      <div class="products-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </Section>
  </template>

  <script setup lang="ts">
  import Section from '@/shared/ui/Section.vue'
  import ProductCard from '@/entities/product/ui/ProductCard.vue'
  import { PRODUCTS } from '@/shared/lib/constants'

  const products = PRODUCTS
  </script>

<style scoped lang="scss">
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 10% auto auto 10%;
    width: 160px;
    height: 160px;
    background: rgba(247, 192, 102, 0.15);
    filter: blur(20px);
    border-radius: 40px;
    z-index: -1;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
