<template>
  <div class="product-card">
    <div class="product-card__image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-card__image" />
      <div v-if="!product.inStock" class="product-card__badge">Нет в наличии</div>
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <p class="product-card__description">{{ product.description }}</p>
      <div class="product-card__info">
        <span class="product-card__weight">{{ product.weight }}</span>
        <span class="product-card__price">{{ product.price }} ₽</span>
      </div>

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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../model/types'
import Button from '@/shared/ui/Button.vue'
import { useCart } from '@/entities/cart/model/useCart'

interface Props {
  product: Product
}

const { product } = defineProps<Props>()

const quantity = ref(1)
const showQuantitySelector = ref(false)
const { addToCart } = useCart()

const handleAddToCart = () => {
  addToCart(product, quantity.value)
  showQuantitySelector.value = false
  quantity.value = 1

  // Опционально: показать уведомление
  alert(`${product.name} добавлен в корзину!`)
}
</script>

<style scoped lang="scss">
.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  &__image-wrapper {
    position: relative;
    height: 250px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
  }

  &__content {
    padding: 24px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 12px;
  }

  &__description {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 16px;
    min-height: 48px;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__weight {
    color: #999;
    font-size: 14px;
  }

  &__price {
    font-size: 28px;
    font-weight: 700;
    color: #f5a623;
  }
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  background: #f5f5f5;
  padding: 8px;
  border-radius: 6px;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f5a623;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #e09612;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.quantity-input {
  width: 50px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #f5a623;
  }
}
</style>
