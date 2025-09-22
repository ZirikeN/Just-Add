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
                        <Card :product="product" />
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
import Card from '@/components/ui/Card.vue'
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

<style>
</style>
