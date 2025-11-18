<template>
  <div class="apiary-card">
    <h4 class="apiary-card__title">{{ apiary.name }}</h4>
    <p class="apiary-card__area">📍 {{ apiary.area }}</p>
    <p class="apiary-card__description">{{ apiary.description }}</p>
    <div class="apiary-card__honey-types">
      <span
          v-for="type in apiary.honeyTypes"
          :key="type"
          class="honey-tag"
      >
        {{ type }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Apiary } from '../model/types'

interface Props {
  apiary: Apiary
}

const { apiary} = defineProps<Props>()
</script>

<style scoped lang="scss">
.apiary-card {
  background: linear-gradient(135deg, #fff, #fff8ed);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 18px 28px rgba(31, 42, 55, 0.08);
  border: 1px solid rgba(247, 192, 102, 0.2);

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: #1f2a37;
    margin-bottom: 6px;
  }

  &__area {
    color: #f5a623;
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  &__description {
    color: rgba(31, 42, 55, 0.7);
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 14px;
  }

  &__honey-types {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}

.honey-tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(247, 192, 102, 0.15);
  color: #c7791f;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
