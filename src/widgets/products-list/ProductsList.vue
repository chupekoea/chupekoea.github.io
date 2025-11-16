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
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
  }
  </style>
