<template>
  <Section id="value" title="Почему наш мёд выбирают чаще" accent class="value-block">
    <div class="value-props">
      <article
          v-for="prop in props"
          :key="prop.id"
          class="value-card"
      >
        <span class="value-card__icon">{{ prop.icon }}</span>
        <p class="value-card__accent">{{ prop.accent }}</p>
        <h3 class="value-card__title">{{ prop.title }}</h3>
        <p class="value-card__description">{{ prop.description }}</p>
      </article>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import { VALUE_PROPS } from '@/shared/lib/constants'

const props = VALUE_PROPS
</script>

<style scoped lang="scss">
.value-block {
  margin-top: 10px;
}

.value-props {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.value-card {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 24px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 18px 25px rgba(0, 0, 0, 0.15);
  min-height: 240px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__icon {
    font-size: 32px;
  }

  &__accent {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #f7c066;
  }

  &__title {
    font-size: 20px;
    color: #fff;
    margin: 0;
  }

  &__description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 15px;
    line-height: 1.6;
    margin: 0;
  }
}
</style>

