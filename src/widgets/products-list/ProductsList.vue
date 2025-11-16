<template>
    <Section id="products" title="Наш ассортимент">
      <div class="products-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </Section>
  </template>

  <script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import Section from '@/shared/ui/Section.vue'
  import ProductCard from '@/entities/product/ui/ProductCard.vue'
  import { useProductsStore } from '@/app/stores/products'

  const productsStore = useProductsStore()
  // Используем storeToRefs для сохранения реактивности
  const { products } = storeToRefs(productsStore)
  </script>

  <style scoped lang="scss">
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
  }
  </style>
