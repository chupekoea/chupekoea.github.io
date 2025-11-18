<template>
  <Section id="testimonials" title="Нам доверяют шефы и магазины" dark>
    <div class="testimonials">
      <article
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="testimonial-card"
      >
        <div class="testimonial-card__header">
          <img :src="testimonial.avatar" :alt="testimonial.name" />
          <div>
            <h3>{{ testimonial.name }}</h3>
            <p>{{ testimonial.city }}</p>
          </div>
        </div>
        <div class="testimonial-card__rating">
          <span
              v-for="star in 5"
              :key="star"
              :class="['star', { 'star--active': star <= testimonial.rating }]"
          >
            ★
          </span>
        </div>
        <p class="testimonial-card__quote">“{{ testimonial.quote }}”</p>
      </article>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import { TESTIMONIALS } from '@/shared/lib/constants'

const testimonials = TESTIMONIALS
</script>

<style scoped lang="scss">
.testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.testimonial-card {
  background: #fff;
  border-radius: 24px;
  padding: 28px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 25px 45px rgba(31, 42, 55, 0.08);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: -60px auto auto -60px;
    width: 140px;
    height: 140px;
    background: rgba(247, 192, 102, 0.15);
    border-radius: 50%;
    z-index: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 14px;
    z-index: 1;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
    }

    h3 {
      margin: 0;
      font-size: 18px;
      color: #1f2a37;
    }

    p {
      margin: 4px 0 0;
      color: #9ca3af;
      font-size: 14px;
    }
  }

  &__rating {
    display: flex;
    gap: 6px;
    font-size: 16px;
    color: #f7c066;
    z-index: 1;
  }

  &__quote {
    margin: 0;
    font-size: 16px;
    line-height: 1.7;
    color: #4b5563;
    z-index: 1;
  }
}

.star {
  color: #e5e7eb;

  &--active {
    color: #f5a623;
  }
}
</style>

