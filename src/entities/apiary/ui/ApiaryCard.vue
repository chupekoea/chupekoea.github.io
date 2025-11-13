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
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
  }

  &__area {
    color: #f5a623;
    font-size: 14px;
    margin-bottom: 12px;
  }

  &__description {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 12px;
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
  background: #fff3e0;
  color: #f5a623;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}
</style>
