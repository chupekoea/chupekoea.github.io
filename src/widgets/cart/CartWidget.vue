<template>
  <!-- Скрываем всю корзину, если продажи отключены -->
  <div
      v-if="isFeatureEnabled('SALES_ENABLED')"
      :class="['cart-widget', { 'cart-widget--compact': compact }]"
  >
    <button
        v-if="compact"
        class="cart-icon-btn"
        type="button"
        @click="isOpen = !isOpen"
        aria-label="Корзина"
      >
      <span class="cart-icon">🛒</span>
      <span class="cart-count" v-if="itemsCount > 0">{{ itemsCount }}</span>
      <span class="sr-only">Корзина, товаров {{ itemsCount }}</span>
    </button>
    <button
        v-else
        class="cart-btn"
        type="button"
        @click="isOpen = !isOpen"
    >
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
            <Button class="checkout-btn" @click="showCheckoutForm = true">
              Оформить заказ
            </Button>
            <button class="clear-btn" @click="handleClear">
              Очистить корзину
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Форма оформления заказа -->
    <div v-if="showCheckoutForm" class="checkout-modal" @click.self="closeCheckout">
      <div class="checkout-content">
        <div class="checkout-header">
          <h3>Оформление заказа</h3>
          <button class="close-btn" type="button" @click="closeCheckout">✕</button>
        </div>

        <div class="checkout-body">
          <div v-if="cartItems.length > 0" class="checkout-items">
            <div
                v-for="item in cartItems"
                :key="item.id"
                class="checkout-item"
            >
              <div class="checkout-item__info">
                <p class="checkout-item__name">{{ item.name }}</p>
                <span class="checkout-item__meta">
                  {{ item.quantity }} × {{ item.price }} ₽
                </span>
              </div>
              <strong class="checkout-item__sum">
                {{ item.price * item.quantity }} ₽
              </strong>
            </div>
          </div>

          <div v-else class="checkout-empty">
            Корзина пуста. Добавьте товары и попробуйте снова.
          </div>

          <div class="checkout-total">
            <span>Итого</span>
            <strong>{{ totalPrice }} ₽</strong>
          </div>

          <form class="checkout-form" @submit.prevent="handleCheckoutSubmit">
            <label class="checkout-form__label" for="checkout-email">
              Email для связи
              <input
                  id="checkout-email"
                  v-model.trim="customerEmail"
                  type="email"
                  placeholder="you@example.com"
                  @blur="emailTouched = true"
                  :disabled="isSending"
                  required
              />
            </label>
            <p v-if="emailError" class="checkout-form__error">
              {{ emailError }}
            </p>

            <p
                v-if="statusMessage"
                :class="['status-message', `status-message--${statusMessage.type}`]"
            >
              {{ statusMessage.text }}
            </p>

            <Button
                class="checkout-form__submit"
                type="submit"
                :disabled="isSubmitDisabled"
            >
              {{ isSending ? 'Отправляем…' : 'Отправить заказ' }}
            </Button>

            <button
                class="checkout-form__cancel"
                type="button"
                @click="closeCheckout"
                :disabled="isSending"
            >
              Отмена
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import emailjs from 'emailjs-com'
import Button from '@/shared/ui/Button.vue'
import { useCart } from '@/entities/cart/model/useCart'
import { useFeatures } from '@/shared/composables/useFeatures'

interface Props {
  compact?: boolean
}

const { compact } = withDefaults(defineProps<Props>(), {
  compact: false
})

const { isFeatureEnabled } = useFeatures()
const isOpen = ref(false)
const showCheckoutForm = ref(false)
const { cart: cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, itemsCount } = useCart()

const customerEmail = ref('')
const emailTouched = ref(false)
const isSending = ref(false)
const statusMessage = ref<{ type: 'success' | 'error'; text: string } | null>(null)

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const hasCartItems = computed(() => cartItems.value.length > 0)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isEmailValid = computed(() => emailRegex.test(customerEmail.value))

const emailError = computed(() => {
  if (!emailTouched.value) {
    return ''
  }
  if (!customerEmail.value) {
    return 'Укажите email, чтобы мы могли связаться с вами'
  }
  if (!isEmailValid.value) {
    return 'Проверьте корректность адреса'
  }

  return ''
})

const isSubmitDisabled = computed(() => {
  return !hasCartItems.value || !isEmailValid.value || isSending.value
})

const orderItemsText = computed(() => {
  return cartItems.value
      .map(item => `${item.name} × ${item.quantity} = ${item.price * item.quantity} ₽`)
      .join('\n')
})

const closeCheckout = () => {
  showCheckoutForm.value = false
  statusMessage.value = null
  emailTouched.value = false
}

const handleClear = () => {
  if (confirm('Вы уверены, что хотите очистить корзину?')) {
    clearCart()
  }
}

const handleCheckoutSubmit = async () => {
  emailTouched.value = true
  statusMessage.value = null

  if (!hasCartItems.value) {
    statusMessage.value = {
      type: 'error',
      text: 'Корзина пуста. Добавьте товары и попробуйте снова.'
    }
    return
  }

  if (!isEmailValid.value || isSending.value) {
    return
  }

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    statusMessage.value = {
      type: 'error',
      text: 'EmailJS не настроен. Проверьте переменные окружения.'
    }
    return
  }

  isSending.value = true

  try {
    const templateParams = {
      customer_email: customerEmail.value,
      order_items: orderItemsText.value,
      total_price: `${totalPrice.value} ₽`
    }

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)

    statusMessage.value = {
      type: 'success',
      text: 'Заказ отправлен! Мы скоро свяжемся с вами.'
    }

    customerEmail.value = ''
    emailTouched.value = false
    isOpen.value = false
    clearCart()
  } catch (error) {
    console.error('Не удалось отправить заказ через EmailJS', error)
    statusMessage.value = {
      type: 'error',
      text: 'Не удалось отправить заказ. Попробуйте ещё раз позже.'
    }
  } finally {
    isSending.value = false
  }
}
</script>

<style scoped lang="scss">
.cart-widget {
  position: relative;
  display: inline-flex;
  align-items: center;
  z-index: 1000;
}

.cart-btn {
  padding: 12px 22px;
  background: linear-gradient(120deg, #f7c066, #f5a623);
  color: #1f1202;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 12px 24px rgba(245, 166, 35, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 32px rgba(245, 166, 35, 0.45);
  }
}

.cart-icon-btn {
  position: relative;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 16px rgba(31, 42, 55, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 22px rgba(31, 42, 55, 0.2);
  }
}

.cart-icon {
  font-size: 22px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.cart-count {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #f04d2c;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 12px rgba(240, 77, 44, 0.35);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.cart-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: rgba(12, 15, 23, 0.55);
  display: flex;
  justify-content: flex-end;
  z-index: 1001;
}

.cart-content {
  background: linear-gradient(165deg, #ffffff, #fff9f1);
  width: 100%;
  max-width: 480px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: -12px 0 30px rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(247, 192, 102, 0.25);
  border-radius: 32px 0 0 32px;

  @media (max-width: 600px) {
    max-width: 100%;
    border-radius: 0;
  }
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(31, 42, 55, 0.08);

  h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #1f2a37;
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #9ca3af;

  &:hover {
    color: #f5a623;
  }
}

.cart-empty {
  text-align: center;
  padding: 60px 20px;
  color: #9ca3af;
  font-size: 16px;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  align-items: center;
  border: 1px solid rgba(247, 192, 102, 0.2);
  box-shadow: 0 18px 30px rgba(31, 42, 55, 0.08);

  &__img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 16px;
  }

  &__info {
    flex: 1;
  }

  &__name {
    margin: 0 0 6px 0;
    font-size: 16px;
    font-weight: 600;
    color: #1f2a37;
  }

  &__price {
    margin: 0;
    color: #f5a623;
    font-weight: 700;
  }

  &__quantity {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      width: 30px;
      height: 30px;
      border: none;
      background: #fff7ea;
      cursor: pointer;
      border-radius: 50%;
      font-weight: 600;
      color: #f5a623;
      box-shadow: 0 6px 16px rgba(31, 42, 55, 0.12);

      &:hover {
        background: #f5a623;
        color: #fff;
      }
    }
  }

  &__total {
    font-weight: 700;
    color: #2c3e50;
    min-width: 70px;
    text-align: right;
  }

  &__remove {
    background: none;
    border: none;
    color: #cbd5f5;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      color: #f5a623;
    }
  }
}

.cart-footer {
  padding: 24px;
  border-top: 1px solid rgba(31, 42, 55, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: rgba(255, 255, 255, 0.9);
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed rgba(31, 42, 55, 0.2);
}

.total-price {
  color: #f5a623;
  font-size: 26px;
}

.checkout-btn {
  width: 100%;
}

.clear-btn {
  padding: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(31, 42, 55, 0.55);
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: #f5a623;
  }
}

.checkout-modal {
  position: fixed;
  inset: 0;
  background: rgba(12, 15, 23, 0.55);
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: flex-start;
  z-index: 1010;
  padding: clamp(16px, 5vh, 48px) 20px;
  backdrop-filter: blur(6px);
  overflow-y: auto;
}

.checkout-content {
  width: 100%;
  max-width: 520px;
  background: #fffdf7;
  border-radius: 28px;
  box-shadow: 0 24px 48px rgba(31, 42, 55, 0.2);
  border: 1px solid rgba(247, 192, 102, 0.35);
  overflow-y: auto;
  max-height: 90vh;
  margin: auto;
}

.checkout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  border-bottom: 1px solid rgba(31, 42, 55, 0.08);

  h3 {
    margin: 0;
    font-size: 22px;
  }
}

.checkout-body {
  padding: 24px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.checkout-items {
  max-height: 240px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-right: 6px;
}

.checkout-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(247, 192, 102, 0.25);
  border-radius: 18px;
  padding: 14px 18px;
  box-shadow: 0 12px 24px rgba(31, 42, 55, 0.06);

  &__name {
    margin: 0;
    font-weight: 600;
    color: #1f2a37;
  }

  &__meta {
    font-size: 13px;
    color: rgba(31, 42, 55, 0.6);
  }

  &__sum {
    color: #f5a623;
    font-size: 16px;
  }
}

.checkout-empty {
  text-align: center;
  padding: 24px;
  border: 1px dashed rgba(31, 42, 55, 0.2);
  border-radius: 18px;
  color: rgba(31, 42, 55, 0.7);
}

.checkout-total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 10px 0 4px;
  border-top: 1px dashed rgba(31, 42, 55, 0.2);
  border-bottom: 1px dashed rgba(31, 42, 55, 0.2);

  strong {
    color: #f5a623;
    font-size: 22px;
  }
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-weight: 600;
    color: #1f2a37;
    font-size: 14px;
  }

  input {
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid rgba(31, 42, 55, 0.15);
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      border-color: #f5a623;
      box-shadow: 0 0 0 3px rgba(245, 166, 35, 0.15);
    }

    &:disabled {
      background: #f6f6f6;
      cursor: not-allowed;
    }
  }

  &__error {
    margin: -4px 0 0;
    font-size: 13px;
    color: #d64545;
  }

  &__submit {
    width: 100%;
  }

  &__cancel {
    margin-top: 4px;
    padding: 12px 16px;
    border-radius: 12px;
    border: none;
    background: rgba(31, 42, 55, 0.08);
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;

    &:hover:enabled {
      background: rgba(31, 42, 55, 0.16);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.status-message {
  margin: 0;
  font-size: 14px;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 500;

  &--success {
    background: rgba(56, 161, 105, 0.1);
    color: #1c7c54;
    border: 1px solid rgba(56, 161, 105, 0.25);
  }

  &--error {
    background: rgba(214, 69, 69, 0.08);
    color: #962d2d;
    border: 1px solid rgba(214, 69, 69, 0.25);
  }
}
</style>
