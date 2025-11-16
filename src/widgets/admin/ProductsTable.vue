<template>
  <div class="products-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Изображение</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Цена</th>
          <th>Вес</th>
          <th>В наличии</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>
            <img :src="product.image" :alt="product.name" class="product-image" />
          </td>
          <td>{{ product.name }}</td>
          <td class="description-cell">{{ product.description }}</td>
          <td>{{ product.price }} ₽</td>
          <td>{{ product.weight }}</td>
          <td>
            <span :class="['status-badge', product.inStock ? 'in-stock' : 'out-of-stock']">
              {{ product.inStock ? 'В наличии' : 'Нет в наличии' }}
            </span>
          </td>
          <td class="actions-cell">
            <button @click="$emit('edit', product)" class="btn-edit">Редактировать</button>
            <button @click="$emit('delete', product.id)" class="btn-delete">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="products.length === 0" class="empty-state">
      <p>Продуктов пока нет. Добавьте первый продукт!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/entities/product/model/types'

defineProps<{
  products: Product[]
}>()

defineEmits<{
  edit: [product: Product]
  delete: [id: number]
}>()
</script>

<style lang="scss" scoped>
.products-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f5a623;
  color: white;
}

th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
}

td {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

tbody tr:hover {
  background: #f9f9f9;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.description-cell {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  &.in-stock {
    background: #d4edda;
    color: #155724;
  }

  &.out-of-stock {
    background: #f8d7da;
    color: #721c24;
  }
}

.actions-cell {
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;

  &.btn-edit {
    background: #f5a623;
    color: white;

    &:hover {
      background: #e0951d;
    }
  }

  &.btn-delete {
    background: #dc3545;
    color: white;

    &:hover {
      background: #c82333;
    }
  }
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
  color: #6c757d;

  p {
    font-size: 18px;
    margin: 0;
  }
}

@media (max-width: 1024px) {
  .description-cell {
    max-width: 200px;
  }
}

@media (max-width: 768px) {
  table {
    font-size: 12px;
  }

  th, td {
    padding: 8px;
  }

  .product-image {
    width: 40px;
    height: 40px;
  }

  .actions-cell {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>

