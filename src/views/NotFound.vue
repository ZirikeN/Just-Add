<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <div class="flex-grow flex">
            <div
                class="mr-4 ml-4 rounded-[16px] bg-[var(--neutral-color-20)] pb-[64px] flex-grow flex items-center justify-center flex-col"
            >
                <h1 class="mont-medium text-[64px] text-[var(--neutral-color-30)] mb-[32px]">
                    404, страница не найдена
                </h1>
                <router-link
                    to="/"
                    class="flex items-center mont-semibold text-[20px] gap-[14px] text-[var(--neutral-color-30)] border-1 border-[#FF921C] bg-[#FF921C] text-white rounded-[200px] pt-4 pb-4 pr-8 pl-8 transform hover:-translate-y-1 hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)] transition-all duration-200"
                    >Вернуться на главную</router-link
                >
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style></style>
