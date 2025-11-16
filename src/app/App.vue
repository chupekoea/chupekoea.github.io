<template>
    <div id="app">
      <CartWidget />
      <header class="header">
        <Container>
          <nav class="nav">
            <div class="logo">🍯 Пасека "Золотой мёд"</div>
            <ul class="nav-menu">
              <li><a href="#products">Каталог</a></li>
              <li><a href="#certificates">Сертификаты</a></li>
              <li><a href="#map">Пасеки</a></li>
              <li><a href="#contacts">Контакты</a></li>
            </ul>
          </nav>
        </Container>
      </header>
      <main>
        <HomePage />
      </main>
      <footer class="footer">
        <Container>
          <p>&copy; 2025 Пасека "Золотой мёд". Натуральный мёд с заботой о качестве.</p>
        </Container>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import Container from '@/shared/ui/Container.vue'
  import HomePage from '@/pages/home/HomePage.vue'
  import CartWidget from "@/widgets/cart/CartWidget.vue";
  </script>
  
  <style lang="scss">
  @import './styles/main.scss';

  html {
    scroll-behavior: smooth; /* Плавная прокрутка при клике на якорь */
  }
  
  .header {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 24px;
    font-weight: 700;
    color: #f5a623;
  }
  
  .nav-menu {
    display: flex;
    list-style: none;
    gap: 40px;
  
    a {
      color: #2c3e50;
      font-weight: 500;
      transition: color 0.3s;
  
      &:hover {
        color: #f5a623;
      }
    }
  
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  .footer {
    background: #2c3e50;
    color: #fff;
    text-align: center;
    padding: 40px 0;
    margin-top: 80px;
  }
  </style>
  