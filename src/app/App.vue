<template>
  <div id="app">
    <header class="header">
      <div class="header__top">
        <Container>
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
              Пасека Чубаровых
            </div>
            <ul class="nav-menu">
              <li><a href="#products">Каталог</a></li>
              <li><a href="#certificates">Сертификаты</a></li>
              <li><a href="#map">Пасеки</a></li>
              <li><a href="#contacts">Контакты</a></li>
            </ul>
            <div class="nav-controls">
              <div class="nav-cta">
                <Button variant="secondary" class="nav-cta__btn" @click="fetchApiText">Скачать прайс</Button>
                <Button class="nav-cta__btn" @click="scrollToContacts">Заказать мёд</Button>
              </div>
              <CartWidget class="nav-cart" compact />
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
import Container from '@/shared/ui/Container.vue'
import HomePage from '@/pages/home/HomePage.vue'
import CartWidget from "@/widgets/cart/CartWidget.vue";
import Button from '@/shared/ui/Button.vue'

const fetchApiText = async () => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/api/text`)
    const data = await response.json()
    // alert(data.message)
  } catch (error) {
    // alert('Ошибка при получении данных: ' + error)
  }
}

const scrollToContacts = () => {
  document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
  
<style lang="scss">
@import './styles/main.scss';

html {
  scroll-behavior: smooth;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
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
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: nowrap;
  min-width: 0;
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

  @media (max-width: 900px) {
    display: none;
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
}
</style>
  