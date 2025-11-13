<template>
  <div class="cart-widget">
    <button class="cart-btn" @click="isOpen = !isOpen">
      🛒 Корзина ({{ itemsCount }})
    </button>

    <div v-if="isOpen" class="cart-modal" @click.self="isOpen = false">
      <div class="cart-content">
        <div class="cart-header">
          <h3>Корзина</h3>
          <button class="close-btn" @click="isOpen = false">✕</button>
        </div>

        <div v-if="cartItems.length === 0" class="cart-empty">
          Корзина пуста
        </div>

        <div v-else>
          <div class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" class="cart-item__img" />
              <div class="cart-item__info">
                <h4 class="cart-item__name">{{ item.name }}</h4>
                <p class="cart-item__price">{{ item.price }} ₽</p>
              </div>

              <div class="cart-item__quantity">
                <button @click="updateQuantity(item.id, item.quantity - 1)">−</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>

              <div class="cart-item__total">
                {{ item.price * item.quantity }} ₽
              </div>

              <button
                  class="cart-item__remove"
                  @click="removeFromCart(item.id)"
              >
                ✕
              </button>
            </div>
          </div>

          <div class="cart-footer">
            <div class="cart-total">
              <strong>Итого:</strong>
              <strong class="total-price">{{ totalPrice }} ₽</strong>
            </div>
            <Button class="checkout-btn">
              Оформить заказ
            </Button>
            <button class="clear-btn" @click="handleClear">
              Очистить корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/shared/ui/Button.vue'
import { useCart } from '@/entities/cart/model/useCart'
// import { httpsCallable } from 'firebase/functions'
// import { functions } from '@/app/main'

const isOpen = ref(false)
const { cart: cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, itemsCount } = useCart()

const handleClear = () => {
  if (confirm('Вы уверены, что хотите очистить корзину?')) {
    clearCart()
  }
}

// const sendOrder = httpsCallable(functions, 'sendOrderEmail')

// const handleSubmitOrder = async () => {
//   try {
//     await sendOrder({
//       customerName: orderForm.name,
//       customerEmail: orderForm.email,
//       customerPhone: orderForm.phone,
//       items: cartItems.value,
//       totalPrice: totalPrice.value
//     })
//     // Успех
//   } catch (error) {
//     console.error('Ошибка:', error)
//   }
// }

</script>

<style scoped lang="scss">
.cart-widget {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.cart-btn {
  padding: 12px 20px;
  background: #f5a623;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #e09612;
  }
}

.cart-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1001;
}

.cart-content {
  background: #fff;
  width: 100%;
  max-width: 450px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    max-width: 100%;
  }
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;

  h3 {
    margin: 0;
    font-size: 24px;
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
}

.cart-empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 12px;
  align-items: center;

  &__img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
  }

  &__info {
    flex: 1;
  }

  &__name {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: #2c3e50;
  }

  &__price {
    margin: 0;
    color: #f5a623;
    font-weight: 600;
  }

  &__quantity {
    display: flex;
    align-items: center;
    gap: 6px;

    button {
      width: 24px;
      height: 24px;
      border: 1px solid #ddd;
      background: #fff;
      cursor: pointer;
      border-radius: 4px;
      font-weight: 600;

      &:hover {
        background: #f5a623;
        color: #fff;
        border-color: #f5a623;
      }
    }
  }

  &__total {
    font-weight: 600;
    color: #2c3e50;
    min-width: 70px;
    text-align: right;
  }

  &__remove {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      color: #f5a623;
    }
  }
}

.cart-footer {
  padding: 20px;
  border-top: 2px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.total-price {
  color: #f5a623;
  font-size: 24px;
}

.checkout-btn {
  width: 100%;
}

.clear-btn {
  padding: 10px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  color: #666;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: #ffe0e0;
    border-color: #f5a623;
  }
}
</style>
