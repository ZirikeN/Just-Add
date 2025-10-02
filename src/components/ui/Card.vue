<template>
    <div class="slide-content bg-[var(--neutral-color-40)] rounded-[20px] relative">
        <img :src="getImageUrl(product.URL)" :alt="product.title" class="w-[380px] h-[345px] m-auto" />

        <!-- Кнопка избранного -->
        <div
            class="absolute w-[40px] h-[40px] top-[24px] right-[24px] bg-white rounded-[50%] flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            @click="toggleFavorite"
        >
            <img
                :src="isFavorite ? likeFilledIcon : likeIcon"
                :alt="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
            />
        </div>

        <div class="p-[24px]">
            <router-link
                :to="`/product/${product.id}`"
                class="flex justify-between text-[20px] text-[var(--neutral-color-30)] mont-semibold"
            >
                <h3>{{ product.title }}</h3>
                <span>€{{ product.price }}</span>
            </router-link>
            <p class="text-[16px] text-[var(--neutral-color-30)] mont-regular pb-[24px]">
                {{ product.description }}
            </p>

            <div class="flex justify-between">
                <button
                    v-if="!isInCart"
                    @click="addToCart"
                    class="pt-[14px] pb-[14px] pr-[36px] mont-regular pl-[36px] bg-black text-white rounded-[200px] border-1 border-black hover:bg-transparent hover:text-[var(--neutral-color-30)] transform hover:-translate-y-1 transition-all duration-200"
                >
                    В корзину
                </button>

                <div v-else class="flex items-center gap-4">
                    <div class="flex flex-col gap-2">
                        <div
                            class="flex items-center border border-gray-300 rounded-[32px] px-2 h-[48px]"
                        >
                            <button
                                @click.stop="decreaseQuantity"
                                class="py-1 px-2 text-black text-[26px] mont-medium cursor-pointer rounded-[50%] bg-[#F7F7F7] hover:bg-[#d9d9d9] transition w-[40px] h-[40px] flex items-center justify-center"
                            >
                                −
                            </button>
                            <span
                                class="mx-2 pr-3 pl-3 quantity text-[var(--neutral-color-30)] text-[22px] mont-medium"
                            >
                                {{ cartItemQuantity }}
                            </span>
                            <button
                                @click.stop="increaseQuantity"
                                class="py-1 px-3 text-black text-[26px] mont-medium cursor-pointer rounded-[50%] bg-[#F7F7F7] hover:bg-[#d9d9d9] transition w-[40px] h-[40px] flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <router-link
                    :to="`/product/${product.id}`"
                    class="pt-[14px] pb-[14px] pr-[36px] pl-[36px] mont-regular rounded-[200px] border-1 border-black text-[var(--neutral-color-30)] hover:bg-black hover:text-white transform hover:-translate-y-1 transition-all duration-200"
                    >Подробнее</router-link
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'
import { inject } from 'vue'

import likeIcon from '@/assets/img/like.svg'
import likeFilledIcon from '@/assets/img/like-filled.svg'

const props = defineProps(['product'])
const cartStore = useCartStore()
const userStore = useUserStore()

const getImageUrl = (filename) => {
    return new URL(`/src/assets/img/${filename}`, import.meta.url).href
}

// Получаем modalState для открытия PopUp при необходимости
const { openModal } = inject('modalState', { openModal: () => {} })

// Computed свойства для корзины
const isInCart = computed(() => {
    return cartStore.items.some((item) => item.id === props.product.id)
})

const cartItemQuantity = computed(() => {
    const item = cartStore.items.find((item) => item.id === props.product.id)
    return item ? item.quantity : 0
})

// Computed свойства для избранного
const isFavorite = computed(() => {
    return userStore.isInFavorites(props.product.id)
})

// Методы для избранного
const toggleFavorite = async () => {
    if (!userStore.isAuthenticated) {
        // Если пользователь не авторизован, открываем PopUp
        openModal()
        return
    }

    try {
        await userStore.toggleFavorite(props.product)
    } catch (error) {
        console.error('Error toggling favorite:', error)
    }
}

// Методы для корзины
const addToCart = () => {
    if (!userStore.isAuthenticated) {
        // Если пользователь не авторизован, открываем PopUp
        openModal()
        return
    }
    cartStore.addTocart(props.product)
}

const increaseQuantity = () => {
    cartStore.updateQuantity(props.product.id, cartItemQuantity.value + 1)
}

const decreaseQuantity = () => {
    if (cartItemQuantity.value > 1) {
        cartStore.updateQuantity(props.product.id, cartItemQuantity.value - 1)
    } else {
        removeFromCart()
    }
}

const removeFromCart = () => {
    cartStore.removeFromCart(props.product.id)
}
</script>

<style scoped>
.slide-content {
    position: relative;
}

/* Анимация для кнопки избранного */
.like-button {
    transition: all 0.3s ease;
}

.like-button:hover {
    transform: scale(1.1);
}
</style>
