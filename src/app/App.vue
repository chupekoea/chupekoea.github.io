<template>
  <div id="app">
    <header class="header">
      <div class="header__top">
        <Container v-if="false">
          <div class="header__top-content">
            <span>🐝 20+ лет семейного пчеловодства</span>
            <span>🌿 Контроль на каждом этапе</span>
            <span>🚚 Доставка по РФ до 24 часов</span>
          </div>
        </Container>
      </div>
      <div class="header__main">
        <Container>
          <nav class="nav">
            <div class="logo">
              <span class="logo__icon">🍯</span>
              <span class="logo__text">Пасека Чубаровых</span>
            </div>
            <div v-if="mobileMenuOpen" class="nav-menu-backdrop" @click="closeMobileMenu"></div>
            <ul class="nav-menu" :class="{ 'nav-menu--open': mobileMenuOpen }">
              <li><a href="#products" @click="closeMobileMenu">Каталог</a></li>
              <li><a href="#certificates" @click="closeMobileMenu">Сертификаты</a></li>
              <li><a href="#map" @click="closeMobileMenu">Пасеки</a></li>
              <li><a href="#contacts" @click="closeMobileMenu">Контакты</a></li>
              <li class="nav-menu__mobile-actions">
                <Button variant="secondary" class="nav-cta__btn" @click="fetchApiText">Скачать прайс</Button>
                <Button v-if="isSalesEnabled" class="nav-cta__btn" @click="handleMobileOrder">Заказать мёд</Button>
              </li>
            </ul>
            <div class="nav-controls">
              <div class="nav-cta">
                <Button variant="secondary" class="nav-cta__btn" @click="fetchApiText">Скачать прайс</Button>
                <Button v-if="isSalesEnabled" class="nav-cta__btn" @click="scrollToContacts">Заказать мёд</Button>
              </div>
              <CartWidget class="nav-cart" compact />
              <button class="burger-menu" :class="{ 'burger-menu--open': mobileMenuOpen }" @click="toggleMobileMenu">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
      <main>
        <HomePage />
      </main>
      <footer class="footer">
        <Container>
          <div class="footer__content">
            <p>&copy; 2025 Пасека «Золотой мёд». Натуральный мёд с заботой о качестве.</p>
            <small>ИП Чубаровы · ОГРН 1234567890123 · Мед с сертифицированных пасек Подмосковья</small>
          </div>
        </Container>
      </footer>
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue'
import Container from '@/shared/ui/Container.vue'
import HomePage from '@/pages/home/HomePage.vue'
import CartWidget from "@/widgets/cart/CartWidget.vue";
import Button from '@/shared/ui/Button.vue'
import { useFeatures } from '@/shared/composables/useFeatures'

const { isFeatureEnabled } = useFeatures()
const mobileMenuOpen = ref(false)

const fetchApiText = async () => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/api/text`)
    const data = await response.json()
    console.log(data.message)
  } catch (error) {
    // alert('Ошибка при получении данных: ' + error)
  }
}

const scrollToContacts = () => {
  document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

const handleMobileOrder = () => {
  closeMobileMenu()
  scrollToContacts()
}

const isSalesEnabled = isFeatureEnabled('SALES_ENABLED')
</script>
  
<style lang="scss">
@import './styles/main.scss';

html {
  scroll-behavior: smooth;
}

#app {
  overflow-x: hidden;
  width: 100%;
}

main {
  overflow-x: hidden;
  width: 100%;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(25, 15, 1, 0.08);

  &__top {
    background: linear-gradient(90deg, rgba(247, 192, 102, 0.32), rgba(255, 249, 241, 0));
    border-bottom: 1px solid rgba(245, 166, 35, 0.25);
  }

  &__top-content {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 14px;
    font-weight: 600;
    color: black;
    padding: 8px 0;
    text-transform: uppercase;
    letter-spacing: 0.04em;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  &__main {
    background: rgba(255, 255, 255, 0.92);
    border-bottom: 1px solid rgba(21, 34, 66, 0.05);
    padding: 16px 0;

    @media (max-width: 768px) {
      padding: 12px 0;
    }
  }

  @media (max-width: 768px) {
    box-shadow: 0 8px 20px rgba(25, 15, 1, 0.06);
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: nowrap;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
}

.logo {
  font-size: 22px;
  font-weight: 700;
  color: #1f2a37;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  flex-shrink: 0;

  &__icon {
    font-size: 32px;
    filter: drop-shadow(0 6px 12px rgba(247, 192, 102, 0.4));
  }

  &__text {
    @media (max-width: 480px) {
      font-size: 16px;
      letter-spacing: 0.04em;
    }
  }
}

.nav-menu-backdrop {
  display: none;

  @media (max-width: 900px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9998;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.nav-menu {
  display: flex;
  flex: 1;
  list-style: none;
  gap: 32px;
  justify-content: center;

  a {
    color: rgba(31, 42, 55, 0.8);
    font-weight: 600;
    position: relative;
    padding-bottom: 6px;
    transition: color 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(120deg, #f7c066, #f5a623);
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    &:hover {
      color: #f5a623;

      &::after {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &__mobile-actions {
    display: none;
  }

  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: max-content;
    background: linear-gradient(180deg, #ffffff 0%, #fffbf5 100%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    padding: max(80px, env(safe-area-inset-top) + 60px) max(40px, env(safe-area-inset-right) + 20px) max(40px, env(safe-area-inset-bottom) + 20px) max(40px, env(safe-area-inset-left) + 20px);
    z-index: 9999;
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.4s ease, visibility 0.4s;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &--open {
      transform: translateX(0);
      visibility: visible;
    }

    li {
      width: 100%;
      text-align: center;
    }

    a {
      font-size: 24px;
      color: #1f2a37;
      display: block;
      padding: 16px 24px;
      border-radius: 12px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(247, 192, 102, 0.15);
        color: #f5a623;
      }

      &::after {
        display: none;
      }
    }

    &__mobile-actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      max-width: 320px;
      margin-top: 24px;

      .nav-cta__btn {
        width: 100%;
        min-width: auto;
      }
    }
  }
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.nav-cta {
  display: flex;
  align-items: center;
  gap: 12px;

  &__btn {
    min-width: 150px;
    padding: 10px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-cart {
  display: inline-flex;

  @media (max-width: 480px) {
    :deep(.cart-widget) {
      font-size: 14px;
    }
  }
}

.burger-menu {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 10000;
  position: relative;

  span {
    width: 28px;
    height: 3px;
    background: #1f2a37;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &--open {
    span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    span:nth-child(2) {
      opacity: 0;
      transform: translateX(-20px);
    }

    span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }

  @media (max-width: 900px) {
    display: flex;
  }
}

.footer {
  background: linear-gradient(160deg, #0f172a 0%, #0b1220 45%, #05070c 100%);
  color: #fefce8;
  text-align: center;
  padding: 56px 0 64px;
  margin-top: 80px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 20px 40px rgba(0, 0, 0, 0.45);

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 760px;
    margin: 0 auto;
    line-height: 1.7;

    p {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #fef3c7;
    }

    small {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.82);
      letter-spacing: 0.01em;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 0 48px;
    margin-top: 60px;

    &__content {
      padding: 0 20px;

      p {
        font-size: 16px;
      }

      small {
        font-size: 13px;
        line-height: 1.6;
      }
    }
  }
}
</style>
  