import { ref, computed } from 'vue'
import type { Product } from '@/entities/product/model/types'

export interface CartItem extends Product {
    quantity: number
}

const cart = ref<CartItem[]>([])

export const useCart = () => {
    const addToCart = (product: Product, quantity: number = 1) => {
        console.log({product, quantity})
        const existingItem = cart.value.find(item => item.id === product.id)

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.value.push({
                ...product,
                quantity
            })
        }
    }

    const removeFromCart = (productId: number) => {
        cart.value = cart.value.filter(item => item.id !== productId)
    }

    const updateQuantity = (productId: number, quantity: number) => {
        const item = cart.value.find(item => item.id === productId)
        if (item) {
            item.quantity = Math.max(1, quantity)
        }
    }

    const clearCart = () => {
        cart.value = []
    }

    const cartItems = computed(() => cart.value)

    const totalPrice = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    })

    const itemsCount = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.quantity, 0)
    })

    return {
        cart: cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        itemsCount
    }
}
