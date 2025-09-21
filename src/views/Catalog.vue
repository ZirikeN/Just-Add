<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow">
            <div
                class="flex flex-col mb-4 mr-4 ml-4 rounded-[16px] bg-[var(--neutral-color-20)] pl-[48px] pr-[48px] pt-[64px] pb-4"
            >
                <h1 class="mont-medium text-[64px] text-[var(--neutral-color-30)] pb-[48px]">
                    Наши вкусы
                </h1>

                <Loader v-if="loading"></Loader>
                <div v-else class="grid grid-cols-3 grid-rows-3 gap-6">
                    <div class="relative" v-for="(product, index) in products" :key="index">
                        <div class="slide-content bg-[var(--neutral-color-40)] rounded-[20px]">
                            <img :src="product.URL" :alt="product.title" class="w-[380px] h-[345px]" />
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
                                    <span>€2</span>
                                </a>
                                <p
                                    class="text-[16px] text-[var(--neutral-color-30)] mont-regular pb-[24px]"
                                >
                                    {{ product.description }}
                                </p>
    
                                <div class="flex justify-between">
                                    <a
                                        href="#"
                                        class="pt-[14px] pb-[14px] pr-[36px] pl-[36px] bg-black text-white rounded-[200px] border-1 border-black hover:bg-transparent hover:text-[var(--neutral-color-30)] transform hover:-translate-y-1 transition-all duration-200"
                                        >В корзину</a
                                    >
                                    <a
                                        href="#"
                                        class="pt-[14px] pb-[14px] pr-[36px] pl-[36px] rounded-[200px] border-1 border-black text-[var(--neutral-color-30)] hover:bg-black hover:text-white transform hover:-translate-y-1 transition-all duration-200"
                                        >Подробнее</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Contact></Contact>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Contact from '@/components/Contact.vue'
import Loader from '@/components/layout/Loader.vue'

import { useProductsStore } from '../stores/products'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const productsStore = useProductsStore()
const { products, loading } = storeToRefs(productsStore)


onMounted(() => {
    productsStore.getProducts()
})
</script>

<style></style>
