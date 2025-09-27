import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref(JSON.parse(localStorage.getItem('cart')) || [])
    const deliveryCost = 10

    // Сохранение в localStorage при изменении
    watch(
        items,
        (newItems) => {
            localStorage.setItem('cart', JSON.stringify(newItems))
        },
        { deep: true }
    )

    // Добавление товара в корзину
    const addTocart = (product) => {
        const existingItem = items.value.find((item) => item.id === product.id)

        if (existingItem) {
            existingItem.quantity++
        } else {
            items.value.push({ ...product, quantity: 1 })
        }
    }

    // Удаление товара из корзины
    const removeFromCart = (productId) => {
        const index = items.value.findIndex((item) => item.id === productId)

        if (index !== -1) {
            items.value.splice(index, 1)
        }
    }

    // Изменение кол-ва товара
    const updateQuantity = (productId, quantity) => {
        const item = items.value.find((item) => item.id === productId)

        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId)
            } else {
                item.quantity = quantity
            }
        }
    }

    // Получение количества конкретного товара
    const getItemQuantity = (productId) => {
        const item = items.value.find((item) => item.id === productId)
        return item ? item.quantity : 0
    }

    // Проверка наличия товара в корзине
    const isItemInCart = (productId) => {
        return items.value.some((item) => item.id === productId)
    }

    // Очистка корзины
    const clearCart = () => {
        items.value = []
    }

    // Вычисляемые св-ва
    const totalItems = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0)
    })

    const subtotal = computed(() => {
        return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
    })

    const totalPrice = computed(() => {
        return subtotal.value + deliveryCost
    })

    const isEmpty = computed(() => items.value.length === 0)

    return {
        items,
        deliveryCost,
        addTocart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalPrice,
        isEmpty,
        getItemQuantity,
        isItemInCart
    }
})
