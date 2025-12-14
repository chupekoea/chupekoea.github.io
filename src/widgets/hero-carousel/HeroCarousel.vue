<template>
    <div class="hero-carousel">
      <Carousel :items-to-show="1" :autoplay="5000" :wrap-around="true">
        <Slide v-for="slide in slides" :key="slide.id">
          <div class="hero-slide" :style="{ backgroundImage: `url(${slide.image})` }">
            <div class="hero-slide__overlay">
              <Container>
                <div class="hero-slide__content">
                  <div class="hero-slide__eyebrow">Натуральный продукт из Подмосковья</div>
                  <h1 class="hero-slide__title">{{ slide.title }}</h1>
                  <p class="hero-slide__subtitle">{{ slide.subtitle }}</p>
                  <div v-if="isSalesEnabled" class="hero-slide__actions">
                    <Button>Заказать дегустацию</Button>
                    <Button variant="secondary">Смотреть каталог</Button>
                  </div>
                  <div class="hero-slide__badges">
                    <div class="hero-badge">
                      <span class="hero-badge__value">20+</span>
                      <span class="hero-badge__label">лет опыта семьи</span>
                    </div>
                    <div class="hero-badge">
                      <span class="hero-badge__value">15</span>
                      <span class="hero-badge__label">пасек под контролем</span>
                    </div>
                    <div class="hero-badge">
                      <span class="hero-badge__value">100%</span>
                      <span class="hero-badge__label">сертифицированный мёд</span>
                    </div>
                  </div>
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
  margin-top: -120px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin-top: 0px;
  }

  // // Стили для элементов управления каруселью
  // :deep(.carousel) {
  //   overflow: hidden;
  //   width: 100%;
  // }

  // :deep(.carousel__track) {
  //   overflow: hidden;
  // }

  // :deep(.carousel__viewport) {
  //   overflow: hidden;
  //   width: 100%;
  // }

  // :deep(.carousel__prev),
  // :deep(.carousel__next) {
  //   @media (max-width: 768px) {
  //     width: 40px;
  //     height: 40px;
  //     background: rgba(255, 255, 255, 0.9);
  //     border-radius: 50%;
      
  //     svg {
  //       width: 20px;
  //       height: 20px;
  //     }
  //   }

  //   @media (max-width: 480px) {
  //     width: 36px;
  //     height: 36px;

  //     svg {
  //       width: 18px;
  //       height: 18px;
  //     }
  //   }
  // }

  // :deep(.carousel__pagination) {
  //   @media (max-width: 768px) {
  //     padding: 12px 0;
  //     gap: 8px;
  //   }
  // }

  // :deep(.carousel__pagination-button) {
  //   @media (max-width: 768px) {
  //     width: 8px;
  //     height: 8px;
  //   }
  // }
}

.hero-slide {
  width: 100%;
  height: 720px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.25), transparent 50%);
    pointer-events: none;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(21, 24, 36, 0.9), rgba(255, 197, 115, 0.3));
    display: flex;
    align-items: center;
    padding-top: 140px;
  }

  &__content {
    color: #fff;
    max-width: 640px;
    padding: 40px 0 60px;
    text-align: left;
  }

  &__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
    font-size: 13px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  &__title {
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 20px;
    text-shadow: 0 25px 40px rgba(0, 0, 0, 0.35);
  }

  &__subtitle {
    font-size: 20px;
    line-height: 1.6;
    margin-bottom: 32px;
    color: rgba(255, 255, 255, 0.8);
  }

  &__actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 36px;

    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
      max-width: 320px;
      margin-left: auto;
      margin-right: auto;

      :deep(.btn) {
        width: 100%;
      }
    }
  }

  &__badges {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
  }
}

.hero-badge {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 16px;
  color: #fff;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);

  &__value {
    display: block;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  &__label {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.7);
  }
}

@media (max-width: 768px) {
  .hero-slide {
    height: 100vh;
    max-height: 650px;
    min-height: 550px;
    background-position: 40% center;

    &__overlay {
      padding: 100px 0 40px;
      background: linear-gradient(120deg, rgba(21, 24, 36, 0.92), rgba(255, 197, 115, 0.4));
    }

    &__content {
      max-width: 100%;
      text-align: center;
      padding: 20px 0 40px;
    }

    &__eyebrow {
      font-size: 11px;
      padding: 6px 14px;
      letter-spacing: 0.15em;
    }

    &__title {
      font-size: clamp(28px, 8vw, 42px);
      margin-bottom: 16px;
    }

    &__subtitle {
      font-size: 16px;
      margin-bottom: 24px;
      padding: 0 10px;
    }

    &__actions {
      justify-content: center;
      gap: 12px;
      margin-bottom: 28px;

      :deep(.btn) {
        font-size: 14px;
        padding: 12px 24px;
      }
    }

    &__badges {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
  }

  .hero-badge {
    padding: 12px 8px;

    &__value {
      font-size: 20px;
      margin-bottom: 4px;
    }

    &__label {
      font-size: 10px;
      letter-spacing: 0.05em;
    }
  }
}

@media (max-width: 480px) {
  .hero-slide {
    height: 100vh;
    max-height: 600px;
    min-height: 500px;

    &__overlay {
      padding: 80px 0 30px;
    }

    &__content {
      padding: 15px 0 30px;
    }

    &__badges {
      grid-template-columns: 1fr;
      gap: 10px;
      max-width: 280px;
      margin: 0 auto;
    }
  }

  .hero-badge {
    padding: 14px 16px;

    &__value {
      font-size: 24px;
    }

    &__label {
      font-size: 11px;
    }
  }
}

@media (max-width: 360px) {
  .hero-carousel {
    margin-top: -70px;
  }

  .hero-slide {
    height: 100vh;
    max-height: 550px;
    min-height: 480px;

    &__overlay {
      padding: 70px 0 25px;
    }

    &__content {
      padding: 10px 0 25px;
    }

    &__title {
      font-size: clamp(24px, 8vw, 36px);
    }

    &__subtitle {
      font-size: 14px;
      margin-bottom: 18px;
    }

    &__actions {
      margin-bottom: 20px;
      gap: 10px;

      :deep(.btn) {
        font-size: 13px;
        padding: 10px 20px;
      }
    }

    &__badges {
      max-width: 260px;
      gap: 8px;
    }
  }

  .hero-badge {
    padding: 12px 14px;

    &__value {
      font-size: 22px;
    }

    &__label {
      font-size: 10px;
    }
  }
}
</style>
  