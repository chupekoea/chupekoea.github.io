<template>
    <Section id="contacts" title="Контакты" dark>
      <div class="contacts" :class="{'contacts--one-column': !isContactFormEnabled}">
        <div class="contacts__info">
          <div class="contact-item">
            <div class="contact-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                    d="M5.25 3.75h4l1.5 4.5-3 1.5a10.5 10.5 0 0 0 6 6l1.5-3 4.5 1.5v4a2.25 2.25 0 0 1-2.25 2.25A14.25 14.25 0 0 1 3 8.25 2.25 2.25 0 0 1 5.25 6z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <h4 class="contact-item__title">Телефон</h4>
              <a href="tel:+79001234567" class="contact-item__value">+7 (900) 123-45-67</a>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                    d="M3.75 6.75h16.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                />
                <path
                    d="m4.5 8.25 7.5 5.25 7.5-5.25"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <h4 class="contact-item__title">Email</h4>
              <a href="mailto:honey@example.ru" class="contact-item__value">honey@example.ru</a>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                    d="M12 12.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                />
                <path
                    d="M12 2.25a7.5 7.5 0 0 1 7.5 7.5c0 4.5-7.5 12-7.5 12s-7.5-7.5-7.5-12a7.5 7.5 0 0 1 7.5-7.5z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <h4 class="contact-item__title">Адрес</h4>
              <p class="contact-item__value">Московская область, Луговой район</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation">
                <circle
                    cx="12"
                    cy="12"
                    r="8.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                />
                <path
                    d="M12 7.5v4.5l3 1.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <h4 class="contact-item__title">Режим работы</h4>
              <p class="contact-item__value">Ежедневно с 9:00 до 20:00</p>
            </div>
          </div>
        </div>
  
        <form v-if="isContactFormEnabled" class="contacts__form" @submit.prevent="handleSubmit">
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
import { computed } from 'vue'
import { useFeatures } from '@/shared/composables/useFeatures'
const { isFeatureEnabled } = useFeatures()

  const isContactFormEnabled = computed(() => isFeatureEnabled('CONTACT_FORM_ENABLED'));
  
  const handleSubmit = () => {
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')
  }
  </script>
  
  <style scoped lang="scss">
  .contacts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  
    &--one-column {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  
    &__info {
      display: flex;
      flex-direction: column;
      gap: 30px;

      @media (max-width: 768px) {
        gap: 16px;
      }
    }
  
    &__form {
      background: linear-gradient(145deg, #ffffff, #fff7e8);
      padding: 40px;
      border-radius: 28px;
      box-shadow: 0 35px 60px rgba(31, 42, 55, 0.15);
      border: 1px solid rgba(247, 192, 102, 0.25);

      @media (max-width: 768px) {
        padding: 24px;
        border-radius: 20px;
      }
    }

    &__form-title {
      font-size: 30px;
      font-weight: 700;
      color: #1f2a37;
      margin-bottom: 28px;

      @media (max-width: 768px) {
        font-size: 24px;
        margin-bottom: 20px;
      }
    }
  }
  
  .contact-item {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 18px 22px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0 16px 30px rgba(31, 42, 55, 0.08);
  
    &__icon {
      font-size: 32px;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(120deg, #f7c066, #f5a623);
      color: #fff;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 12px 24px rgba(245, 166, 35, 0.4);

      svg {
        width: 26px;
        height: 26px;
      }
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

    @media (max-width: 768px) {
      padding: 14px 16px;
      gap: 16px;

      &__icon {
        width: 44px;
        height: 44px;

        svg {
          width: 22px;
          height: 22px;
        }
      }

      &__title {
        font-size: 12px;
        margin-bottom: 6px;
      }

      &__value {
        font-size: 16px;
      }
    }

    @media (max-width: 480px) {
      &__value {
        font-size: 15px;
        word-break: break-word;
      }
    }
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid rgba(31, 42, 55, 0.15);
    border-radius: 16px;
    font-size: 16px;
    margin-bottom: 20px;
    transition: border-color 0.3s, box-shadow 0.3s;
    background: rgba(255, 255, 255, 0.9);
  
    &:focus {
      outline: none;
      border-color: #f5a623;
      box-shadow: 0 0 0 4px rgba(245, 166, 35, 0.15);
    }

    @media (max-width: 768px) {
      padding: 12px 14px;
      font-size: 15px;
      margin-bottom: 16px;
    }
  }
  
  .form-textarea {
    resize: vertical;
    font-family: inherit;
  }
  </style>
  