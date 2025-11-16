<template>
  <div class="admin-page">
    <Container>
      <div class="admin-header">
        <h1>Админ-панель</h1>
        <Button @click="showAddForm = true">Добавить продукт</Button>
      </div>

      <div class="admin-content">
        <ProductsTable 
          :products="products" 
          @edit="handleEdit"
          @delete="handleDelete"
        />

        <ProductForm 
          v-if="showAddForm || editingProduct"
          :product="editingProduct"
          @save="handleSave"
          @cancel="handleCancel"
        />
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/app/stores/products'
import Container from '@/shared/ui/Container.vue'
import Button from '@/shared/ui/Button.vue'
import ProductsTable from '@/widgets/admin/ProductsTable.vue'
import ProductForm from '@/widgets/admin/ProductForm.vue'
import type { Product } from '@/entities/product/model/types'

const productsStore = useProductsStore()
// Используем storeToRefs для сохранения реактивности
const { products } = storeToRefs(productsStore)

const showAddForm = ref(false)
const editingProduct = ref<Product | null>(null)

const handleEdit = (product: Product) => {
  editingProduct.value = { ...product }
  showAddForm.value = false
}

const handleDelete = (id: number) => {
  if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
    productsStore.deleteProduct(id)
  }
}

const handleSave = (product: Omit<Product, 'id'> | Product) => {
  if (editingProduct.value) {
    productsStore.updateProduct(editingProduct.value.id, product)
  } else {
    productsStore.addProduct(product as Omit<Product, 'id'>)
  }
  handleCancel()
}

const handleCancel = () => {
  showAddForm.value = false
  editingProduct.value = null
}
</script>

<style lang="scss" scoped>
.admin-page {
  min-height: 100vh;
  padding: 40px 0;
  background: #f5f5f5;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;

  h1 {
    font-size: 32px;
    color: #2c3e50;
    margin: 0;
  }
}

.admin-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
}
</style>

