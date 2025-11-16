import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Product } from '@/entities/product/model/types'
import { PRODUCTS } from '@/shared/lib/constants'

const STORAGE_KEY = 'honey-landing-products'

// Функция для загрузки продуктов из localStorage или использования константы
const loadProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Проверяем, что загруженные данные валидны
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (error) {
    console.warn('Ошибка при загрузке продуктов из localStorage:', error)
  }
  // Если нет сохраненных данных или произошла ошибка, используем константу
  return PRODUCTS
}

// Функция для сохранения продуктов в localStorage
const saveProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (error) {
    console.error('Ошибка при сохранении продуктов в localStorage:', error)
  }
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>(loadProducts())
  const isLoading = ref(false)

  // Синхронизация между вкладками через событие storage
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          if (Array.isArray(parsed)) {
            products.value = parsed
          }
        } catch (error) {
          console.warn('Ошибка при синхронизации продуктов из другой вкладки:', error)
        }
      }
    })
  }

  // Автоматически сохраняем изменения в localStorage
  watch(
    products,
    (newProducts) => {
      saveProducts(newProducts)
    },
    { deep: true }
  )

  const getProductById = (id: number): Product | undefined => {
    return products.value.find(p => p.id === id)
  }

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.value.map(p => p.id), 0) + 1
    const newProduct: Product = {
      ...product,
      id: newId
    }
    products.value.push(newProduct)
    // Сохранение происходит автоматически через watch
    return newProduct
  }

  const updateProduct = (id: number, updates: Partial<Product>) => {
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updates }
      // Сохранение происходит автоматически через watch
      return products.value[index]
    }
    return null
  }

  const deleteProduct = (id: number) => {
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) {
      products.value.splice(index, 1)
      // Сохранение происходит автоматически через watch
      return true
    }
    return false
  }

  // Функция для сброса к исходным данным из константы
  const resetToDefaults = () => {
    products.value = [...PRODUCTS]
    // Сохранение происходит автоматически через watch
  }

  return {
    products,
    isLoading,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaults
  }
})

