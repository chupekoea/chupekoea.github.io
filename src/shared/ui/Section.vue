<template>
  <section :class="['section', { 'section--dark': dark, 'section--accent': accent }]">
    <Container>
      <h2 v-if="title" class="section__title">{{ title }}</h2>
      <slot />
    </Container>
  </section>
</template>

<script setup lang="ts">
import Container from './Container.vue'

interface Props {
  title?: string
  dark?: boolean
  accent?: boolean
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.section {
  position: relative;
  padding: 96px 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 40px 10%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(247, 192, 102, 0.12), transparent 60%);
    opacity: 0.7;
    pointer-events: none;
  }

  &--dark {
    background: linear-gradient(135deg, #fff9f1 0%, #fef4e6 100%);
  }

  &--accent {
    background: #1f2a37;
    color: #fff;

    .section__title {
      color: #fff;

      &::after {
        background: rgba(255, 255, 255, 0.35);
      }
    }
  }

  &__title {
    position: relative;
    font-size: clamp(32px, 4vw, 46px);
    font-weight: 700;
    color: #1f2a37;
    text-align: center;
    margin-bottom: 56px;
    letter-spacing: 0.02em;

    &::after {
      content: '';
      display: block;
      width: 120px;
      height: 6px;
      background: linear-gradient(120deg, #f7c066, #f5a623);
      margin: 24px auto 0;
      border-radius: 999px;
      box-shadow: 0 8px 16px rgba(245, 166, 35, 0.25);
    }
  }
}
</style>