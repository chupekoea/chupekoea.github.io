<template>
    <Section id="contacts" title="Контакты" dark>
      <div class="contacts">
        <div class="contacts__info">
          <div class="contact-item">
            <div class="contact-item__icon">📞</div>
            <div>
              <h4 class="contact-item__title">Телефон</h4>
              <a href="tel:+79001234567" class="contact-item__value">+7 (900) 123-45-67</a>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-item__icon">✉️</div>
            <div>
              <h4 class="contact-item__title">Email</h4>
              <a href="mailto:honey@example.ru" class="contact-item__value">honey@example.ru</a>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-item__icon">📍</div>
            <div>
              <h4 class="contact-item__title">Адрес</h4>
              <p class="contact-item__value">Московская область, Луговой район</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-item__icon">⏰</div>
            <div>
              <h4 class="contact-item__title">Режим работы</h4>
              <p class="contact-item__value">Ежедневно с 9:00 до 20:00</p>
            </div>
          </div>
        </div>
  
        <form class="contacts__form" @submit.prevent="handleSubmit">
          <h3 class="contacts__form-title">Оставьте заявку</h3>
          <input type="text" placeholder="Ваше имя" class="form-input" required />
          <input type="tel" placeholder="Телефон" class="form-input" required />
          <textarea placeholder="Комментарий" class="form-textarea" rows="4"></textarea>
          <Button type="submit">Отправить</Button>
        </form>
      </div>
    </Section>
  </template>
  
  <script setup lang="ts">
  import Section from '@/shared/ui/Section.vue'
  import Button from '@/shared/ui/Button.vue'
  
  const handleSubmit = () => {
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')
  }
  </script>
  
  <style scoped lang="scss">
  .contacts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  
    &__info {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  
    &__form {
      background: #fff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  
    &__form-title {
      font-size: 28px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 30px;
    }
  }
  
  .contact-item {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  
    &__icon {
      font-size: 32px;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: 50%;
      flex-shrink: 0;
    }
  
    &__title {
      font-size: 14px;
      font-weight: 600;
      color: #999;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
  
    &__value {
      font-size: 18px;
      color: #2c3e50;
      text-decoration: none;
      font-weight: 500;
  
      &:hover {
        color: #f5a623;
      }
    }
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 20px;
    transition: border-color 0.3s;
  
    &:focus {
      outline: none;
      border-color: #f5a623;
    }
  }
  
  .form-textarea {
    resize: vertical;
    font-family: inherit;
  }
  </style>
  