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

                <div class="flex justify-between items-center mb-[48px]">
                    <div class="flex gap-4">
                        <button @click="setActiveFilter('all')" :class="getTabClasses('all')">
                            Вся продукция
                        </button>
                        <button @click="setActiveFilter('tea')" :class="getTabClasses('tea')">
                            Чай
                        </button>
                        <button @click="setActiveFilter('lemonade')" :class="getTabClasses('lemonade')">
                            Лимонад
                        </button>
                        <button @click="setActiveFilter('pack')" :class="getTabClasses('pack')">
                            Наборы
                        </button>
                    </div>

                    <div class="">
                        <select
                            v-model="selectedSort"
                            @change="handleSortChange"
                            class="appearance-none bg-[var(--neutral-color-50)] border-1 border-[#C2CFDB] rounded-[12px] py-4 pl-4 pr-10 mont-medium text-[18px] text-[var(--neutral-color-30)] focus:outline-none focus:border-[#FF921C] focus:ring-2 focus:ring-[#FF921C] focus:ring-opacity-20 cursor-pointer transition-all duration-200 hover:border-[#FF921C] hover:shadow-md"
                        >
                            <option class="text-black" value="default">По умолчанию</option>
                            <option class="text-black" value="price_asc">Цена: по возрастанию</option>
                            <option class="text-black" value="price_desc">Цена: по убыванию</option>
                        </select>
                    </div>
                </div>

                <Loader v-if="loading"></Loader>
                <div v-else v-auto-animate class="grid grid-cols-3 grid-rows-3 gap-6">
                    <div class="relative" v-for="product in filteredProducts" :key="product.id">
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
import { onMounted, watch, ref } from 'vue'

const productsStore = useProductsStore()
const { products, loading, filteredProducts, activeFilter, sortBy } = storeToRefs(productsStore)
const { setFilter, setSort } = productsStore
const selectedSort = ref('default')

const setActiveFilter = (filterType) => {
    setFilter(filterType)
}

const handleSortChange = () => {
    productsStore.setSort(selectedSort.value)
}

const getTabClasses = (tabType) => {
    const isActive = productsStore.activeFilter === tabType
    const baseClasses =
        'flex justify-center items-center mont-medium text-[18px] rounded-[200px] pt-4 pb-4 pr-8 pl-8 transform transition-all duration-200 cursor-pointer hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)]'

    if (isActive) {
        return `${baseClasses} border-1 border-[#FF921C] bg-[#FF921C] text-white`
    } else {
        return `${baseClasses} border-1 border-[#C2CFDB] bg-transparent text-[var(--neutral-color-30)] hover:-translate-y-1`
    }
}

onMounted(() => {
    productsStore.getProducts()
    selectedSort.value = sortBy.value
})

watch(sortBy, (newValue) => {
    selectedSort.value = newValue
})
</script>

<style></style>
