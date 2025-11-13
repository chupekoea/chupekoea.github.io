<template>
    <div class="home-page">
      <HeroCarousel />
      <ProductsList />
      <Certificates />
      <MapLocation />
      <Contacts />
    </div>
  </template>
  
  <script setup lang="ts">
  import HeroCarousel from '@/widgets/hero-carousel/HeroCarousel.vue'
  import ProductsList from '@/widgets/products-list/ProductsList.vue'
  import Certificates from '@/widgets/certificates/Certificates.vue'
  import MapLocation from '@/widgets/map-location/MapLocation.vue'
  import Contacts from '@/widgets/contacts/Contacts.vue'
  </script>
  