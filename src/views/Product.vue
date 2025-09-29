<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow">
            <div class="mb-4 mr-4 ml-4 rounded-[16px]">
                <div v-if="product" class="flex gap-4">
                    <div class="w-1/2 bg-[#e8e0a1] flex justify-center rounded-[16px]">
                        <img :src="product.URL" :alt="product.title" class="w-[650px] h-[650px]" />
                    </div>
                    <div
                        class="w-1/2 bg-[var(--neutral-color-20)] rounded-[16px] flex flex-col gap-4 pt-[48px] pb-[48px] pr-[40px] pl-[40px]"
                    >
                        <span
                            class="flex justify-end text-[18px] text-[var(--neutral-color-30)] mont-medium"
                            >Артикул: {{ product.id }}</span
                        >

                        <h1 class="mont-medium text-[76px] text-[var(--neutral-color-30)]">
                            {{ product.title }}
                        </h1>
                        <h2 class="text-[24px] mont-medium text-[var(--neutral-color-30)]">
                            {{ product.description }}
                        </h2>
                        <p class="text-[16px] mont-regular text-[var(--neutral-color-30)]">
                            Это насыщенный и бодрящий чай, сочетающий в себе яркую кислинку облепихи
                            и солнечные цитрусовые нотки апельсина. Напиток не только согревает, но
                            и насыщает организм витаминами, повышая иммунитет и придавая энергию.
                            Идеален для холодных дней или как освежающий компаньон для утренней
                            чашки чая.
                        </p>
                        <p class="text-[42px] mont-semibold text-[var(--neutral-color-30)]">
                            Цена: {{ product.price }}€
                        </p>

                        <div class="flex items-center gap-4 mb-6">
                            <div
                                class="flex items-center border border-gray-300 rounded-[32px] px-3 py-2"
                            >
                                <button
                                    @click="decreaseQuantity"
                                    class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                >
                                    −
                                </button>
                                <span class="mx-4 text-lg text-[var(--neutral-color-30)]">{{ quantity }}</span>
                                <button
                                    @click="increaseQuantity"
                                    class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                @click="addToCart"
                                class="bg-[var(--neutral-color-30)] text-[var(--neutral-color-10)] px-8 py-3 rounded-full hover:bg-gray-300 hover:text-black transition-colors cursor-pointer"
                            >
                                Добавить в корзину
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>Товар загружается или не найден...</p>
                </div>
            </div>

            <Contact></Contact>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'

import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const quantity = ref(1)

const product = computed(() => {
    const productId = +route.params.id
    return productsStore.getProductById(productId)
})

const increaseQuantity = () => {
    quantity.value++
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

const addToCart = () => {
    for (let i = 0; i < quantity.value; i++) {
        cartStore.addTocart(product.value)
    }
    quantity.value = 1
}

onMounted(() => {
    productsStore.getProducts()
})
</script>

<style></style>
