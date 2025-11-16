<template>
    <div class="hero-carousel">
      <Carousel :items-to-show="1" :autoplay="5000" :wrap-around="true">
        <Slide v-for="slide in slides" :key="slide.id">
          <div class="hero-slide" :style="{ backgroundImage: `url(${slide.image})` }">
            <div class="hero-slide__overlay">
              <Container>
                <div class="hero-slide__content">
                  <h1 class="hero-slide__title">{{ slide.title }}</h1>
                  <p class="hero-slide__subtitle">{{ slide.subtitle }}</p>
                  <Button v-if="isSalesEnabled" variant="primary">Выбрать мёд</Button>
                </div>
              </Container>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  import Container from '@/shared/ui/Container.vue'
  import Button from '@/shared/ui/Button.vue'
  import { CAROUSEL_SLIDES } from '@/shared/lib/constants'
  import {useFeatures} from "@/shared/composables/useFeatures.ts";

  const slides = CAROUSEL_SLIDES

  const { isFeatureEnabled } = useFeatures()
  const isSalesEnabled = isFeatureEnabled('SALES_ENABLED')
  </script>
  
  <style scoped lang="scss">
  .hero-carousel {
    margin-top: -80px;
  }
  
  .hero-slide {
    width: 100%;
    height: 700px;
    background-size: cover;
    background-position: center;
    position: relative;
  
    &__overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
    }
  
    &__content {
      color: #fff;
      text-align: center;
      padding: 40px 0;
    }
  
    &__title {
      font-size: 56px;
      font-weight: 700;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  
    &__subtitle {
      font-size: 24px;
      margin-bottom: 40px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
  }
  </style>
  