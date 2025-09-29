<template>
    <div class="slide-content bg-[var(--neutral-color-40)] rounded-[20px]">
        <img :src="product.URL" :alt="product.title" class="w-[380px] h-[345px] m-auto" />
        <div
            class="absolute w-[40px] h-[40px] top-[24px] right-[24px] bg-white rounded-[50%] flex justify-center items-center cursor-pointer"
        >
            <img src="@/assets/img/like.svg" alt="like" />
        </div>
        <div class="p-[24px]">
            <a
                href="#"
                class="flex justify-between text-[20px] text-[var(--neutral-color-30)] mont-semibold"
            >
                <h3>{{ product.title }}</h3>
                <span>€{{ product.price }}</span>
            </a>
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
                        <div class="flex items-center border border-gray-300 rounded-[32px] px-2 h-[48px]">
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
import { computed } from 'vue'

const props = defineProps(['product'])
const cartStore = useCartStore()

const isInCart = computed(() => {
    return cartStore.items.some((item) => item.id === props.product.id)
})

const cartItemQuantity = computed(() => {
    const item = cartStore.items.find((item) => item.id === props.product.id)
    return item ? item.quantity : 0
})

const addToCart = () => {
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

<style></style>
