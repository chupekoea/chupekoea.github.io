<template>
  <Section id="map" title="Наши пасеки">
    <div class="map-wrapper">
      <yandex-map
          v-model="map"
          :settings="settings"
          width="100%"
          height="600px"
          :zoom="9"
          :center="centerCoordinates"
      >
        <yandex-map-default-scheme-layer />
        <yandex-map-default-features-layer />

        <yandex-map-controls :settings="{ position: 'right' }">
          <yandex-map-zoom-control />
        </yandex-map-controls>

        <yandex-map-marker
            v-for="apiary in apiaries"
            :key="apiary.id"
            :settings="{
            coordinates: apiary.coordinates,
            draggable: false,
          }"
        >
          <div class="map-marker">
            <div class="map-marker__icon">🍯</div>
          </div>

<!--          <template #popup>-->
<!--            <div class="map-popup">-->
<!--              <ApiaryCard :apiary="apiary" />-->
<!--            </div>-->
<!--          </template>-->
        </yandex-map-marker>
      </yandex-map>

      <div class="apiaries-list">
        <h3 class="apiaries-list__title">Список пасек</h3>
        <div
            v-for="apiary in apiaries"
            :key="apiary.id"
            class="apiary-item"
            @click="focusOnApiary(apiary)"
        >
          <ApiaryCard :apiary="apiary" />
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapControls,
  YandexMapZoomControl,
  YandexMapMarker
} from 'vue-yandex-maps'
import type { YMap } from '@yandex/ymaps3-types'
import Section from '@/shared/ui/Section.vue'
import ApiaryCard from '@/entities/apiary/ui/ApiaryCard.vue'
import { APIARIES } from '@/shared/lib/constants'
import type { Apiary } from '@/entities/apiary/model/types'

const apiaries = APIARIES
const map = shallowRef<null | YMap>(null)

// Центр карты - средняя точка между пасеками
const centerCoordinates = ref<[number, number]>([55.7558, 37.6173])

const settings = {
  location: {
    center: centerCoordinates.value,
    zoom: 9,
  },
}

const focusOnApiary = (apiary: Apiary) => {
  if (map.value) {
    map.value.setLocation({
      center: apiary.coordinates,
      zoom: 12,
      duration: 500,
    })
  }
}
</script>

<style scoped lang="scss">
.map-wrapper {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.map-marker {
  &__icon {
    font-size: 32px;
    cursor: pointer;
    transition: transform 0.2s;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

    &:hover {
      transform: scale(1.2);
    }
  }
}

.map-popup {
  min-width: 280px;
  max-width: 350px;
}

.apiaries-list {
  background: #f9f9f9;
  padding: 24px;
  border-radius: 12px;
  max-height: 600px;
  overflow-y: auto;

  &__title {
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 20px;
  }
}

.apiary-item {
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
