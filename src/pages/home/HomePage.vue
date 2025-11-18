<template>
  <div class="home-page">
    <HeroCarousel />
    <ValueProps />
    <ProductsList />
    <Testimonials />
    <Certificates />
    <MapLocation />
    <Contacts />
    <ScrollToTopButton />
  </div>
</template>

<script setup lang="ts">
import HeroCarousel from '@/widgets/hero-carousel/HeroCarousel.vue'
import ValueProps from '@/widgets/value-props/ValueProps.vue'
import ProductsList from '@/widgets/products-list/ProductsList.vue'
import Testimonials from '@/widgets/testimonials/Testimonials.vue'
import Certificates from '@/widgets/certificates/Certificates.vue'
import MapLocation from '@/widgets/map-location/MapLocation.vue'
import Contacts from '@/widgets/contacts/Contacts.vue'
import ScrollToTopButton from "@/shared/ui/ScrollToTopButton.vue";
</script>
  