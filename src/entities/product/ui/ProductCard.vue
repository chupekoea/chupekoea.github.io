<template>
  <div class="product-card">
    <div class="product-card__image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-card__image" />
      <div v-if="!product.inStock && isSalesEnabled" class="product-card__badge">Нет в наличии</div>
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <p class="product-card__description">{{ product.description }}</p>
      <div v-if="isSalesEnabled" class="product-card__info">
        <span class="product-card__weight">{{ product.weight }}</span>
        <span class="product-card__price">{{ product.price }} ₽</span>
      </div>

      <!-- Показываем выбор количества и кнопку заказа только если продажи включены -->
      <div v-if="isSalesEnabled">
        <div v-if="showQuantitySelector" class="quantity-selector">
          <button
              class="quantity-btn"
              @click="quantity = Math.max(1, quantity - 1)"
              :disabled="quantity <= 1"
          >
            −
          </button>
          <input
              v-model.number="quantity"
              type="number"
              min="1"
              class="quantity-input"
          />
          <button class="quantity-btn" @click="quantity++">
            +
          </button>
        </div>

        <Button
            :disabled="!product.inStock"
            @click="handleAddToCart"
        >
          {{ product.inStock ? 'Заказать' : 'Недоступно' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../model/types'
import Button from '@/shared/ui/Button.vue'
import { useCart } from '@/entities/cart/model/useCart'
import { useFeatures } from '@/shared/composables/useFeatures'

interface Props {
  product: Product
}

const { product } = defineProps<Props>()

const { isFeatureEnabled } = useFeatures()
const quantity = ref(1)
const showQuantitySelector = ref(false)
const { addToCart } = useCart()

const isSalesEnabled = isFeatureEnabled('SALES_ENABLED')

const handleAddToCart = () => {
  addToCart(product, quantity.value)
  showQuantitySelector.value = false
  quantity.value = 1
  // alert(`${product.name} добавлен в корзину!`)
}
</script>

<style scoped lang="scss">
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, #fffaf4, #fff);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(245, 166, 35, 0.15);
  box-shadow:
    0 18px 40px rgba(21, 34, 66, 0.08),
    0 4px 12px rgba(255, 255, 255, 0.8) inset;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-10px) scale(1.01);
    box-shadow:
      0 24px 45px rgba(21, 34, 66, 0.12),
      0 4px 16px rgba(247, 192, 102, 0.4);
  }

  &__image-wrapper {
    position: relative;
    height: 260px;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 100%);
      pointer-events: none;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover &__image {
    transform: scale(1.05);
  }

  &__badge {
    position: absolute;
    top: 18px;
    right: 18px;
    background: rgba(15, 23, 42, 0.8);
    color: #fff;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 13px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 28px 28px 32px;
  }

  &__title {
    font-size: 22px;
    font-weight: 600;
    color: #1f2a37;
    letter-spacing: 0.01em;
    margin: 0;
  }

  &__description {
    color: rgba(31, 42, 55, 0.7);
    font-size: 15px;
    line-height: 1.7;
    letter-spacing: 0.01em;
    min-height: 48px;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-top: 20px;
    margin-top: 10px;
    border-top: 1px solid rgba(15, 23, 42, 0.08);
  }

  &__weight {
    font-size: 14px;
    font-weight: 500;
    color: rgba(31, 42, 55, 0.8);
    background: rgba(247, 192, 102, 0.15);
    padding: 6px 14px;
    border-radius: 999px;
  }

  &__price {
    font-size: 32px;
    font-weight: 700;
    color: #f7c066;
    text-shadow: 0 6px 14px rgba(247, 192, 102, 0.45);
  }

  :deep(.btn) {
    border-radius: 999px;
    background: linear-gradient(120deg, #f7c066, #f5a623);
    box-shadow: 0 14px 28px rgba(245, 166, 35, 0.35);
    padding: 14px 36px;

    &:hover:not(:disabled) {
      box-shadow: 0 18px 32px rgba(245, 166, 35, 0.45);
    }

    &:disabled {
      box-shadow: none;
      background: #f1f1f1;
      color: #9ca3af;
    }
  }
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: inset 0 2px 4px rgba(247, 192, 102, 0.15);
}

.quantity-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #fff;
  color: #f5a623;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: #fff6eb;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    box-shadow: none;
  }
}

.quantity-input {
  width: 64px;
  padding: 8px 12px;
  border: none;
  border-radius: 999px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  background: #fffdf8;
  color: #1f2a37;
  box-shadow: inset 0 1px 3px rgba(15, 23, 42, 0.08);

  &:focus {
    outline: 2px solid rgba(247, 192, 102, 0.5);
  }
}
</style>
