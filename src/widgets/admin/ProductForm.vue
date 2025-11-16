<template>
  <div class="product-form-overlay" @click.self="handleCancel">
    <div class="product-form">
      <div class="form-header">
        <h2>{{ editingProduct ? 'Редактировать продукт' : 'Добавить продукт' }}</h2>
        <button @click="handleCancel" class="close-btn">×</button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Название *</label>
          <input 
            id="name"
            v-model="formData.name" 
            type="text" 
            required 
            placeholder="Например: Липовый мёд"
          />
        </div>

        <div class="form-group">
          <label for="description">Описание *</label>
          <textarea 
            id="description"
            v-model="formData.description" 
            required 
            rows="3"
            placeholder="Описание продукта"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="price">Цена (₽) *</label>
            <input 
              id="price"
              v-model.number="formData.price" 
              type="number" 
              required 
              min="0"
              step="10"
              placeholder="850"
            />
          </div>

          <div class="form-group">
            <label for="weight">Вес *</label>
            <input 
              id="weight"
              v-model="formData.weight" 
              type="text" 
              required 
              placeholder="0.5 кг"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="image">URL изображения *</label>
          <input 
            id="image"
            v-model="formData.image" 
            type="url" 
            required 
            placeholder="https://example.com/image.jpg"
          />
          <div v-if="formData.image" class="image-preview">
            <img :src="formData.image" alt="Preview" @error="imageError = true" />
            <span v-if="imageError" class="image-error">Ошибка загрузки изображения</span>
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input 
              v-model="formData.inStock" 
              type="checkbox"
            />
            <span>В наличии</span>
          </label>
        </div>

        <div class="form-actions">
          <Button type="button" @click="handleCancel" variant="secondary">Отмена</Button>
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import Button from '@/shared/ui/Button.vue'
import type { Product } from '@/entities/product/model/types'

const props = defineProps<{
  product?: Product | null
}>()

const emit = defineEmits<{
  save: [product: Omit<Product, 'id'> | Product]
  cancel: []
}>()

const formData = ref({
  name: '',
  description: '',
  price: 0,
  weight: '',
  image: '',
  inStock: true
})

const imageError = ref(false)

const editingProduct = computed(() => props.product)

watch(() => props.product, (product) => {
  if (product) {
    formData.value = {
      name: product.name,
      description: product.description,
      price: product.price,
      weight: product.weight,
      image: product.image,
      inStock: product.inStock
    }
  } else {
    resetForm()
  }
  imageError.value = false
}, { immediate: true })

onMounted(() => {
  if (props.product) {
    formData.value = {
      name: props.product.name,
      description: props.product.description,
      price: props.product.price,
      weight: props.product.weight,
      image: props.product.image,
      inStock: props.product.inStock
    }
  }
})

const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    price: 0,
    weight: '',
    image: '',
    inStock: true
  }
  imageError.value = false
}

const handleSubmit = () => {
  if (editingProduct.value) {
    emit('save', { ...formData.value, id: editingProduct.value.id } as Product)
  } else {
    emit('save', formData.value)
  }
}

const handleCancel = () => {
  resetForm()
  emit('cancel')
}
</script>


<style lang="scss" scoped>
.product-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.product-form {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    font-size: 24px;
    color: #2c3e50;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 32px;
    color: #6c757d;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #2c3e50;
    }
  }
}

form {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c3e50;
    font-size: 14px;
  }

  input[type="text"],
  input[type="number"],
  input[type="url"],
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #f5a623;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  span {
    font-weight: 500;
  }
}

.image-preview {
  margin-top: 12px;

  img {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  .image-error {
    display: block;
    color: #dc3545;
    font-size: 12px;
    margin-top: 8px;
  }
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
}
</style>

