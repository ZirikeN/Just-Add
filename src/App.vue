<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow">
            <Hero></Hero>
            <Details></Details>
            <Goods></Goods>
            <Advantages></Advantages>
            <AboutUs></AboutUs>
            <div class="m-4 rounded-[16px]">
                <img
                    class="w-full h-full rounded-[16px]"
                    src="@/assets/img/enticement-img.jpg"
                    alt="Enticement"
                />
            </div>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
            <Contact></Contact>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import { ref, provide } from 'vue'

import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Details from './components/Details.vue'
import Goods from './components/Goods.vue'
import Advantages from './components/Advantages.vue'
import AboutUs from './components/AboutUs.vue'
import Testimonials from './components/Testimonials.vue'
import FAQ from './components/FAQ.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

const isModalOpen = ref(false)

provide('modalState', {
    isModalOpen,
    openModal: () => {
        isModalOpen.value = true
        console.log(isModalOpen.value)
    },
    closeModal: () => (isModalOpen.value = false),
})
</script>

<style></style>
