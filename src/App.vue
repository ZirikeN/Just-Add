<template>
    <div class="min-h-screen flex flex-col bg-[#F9F9F9]">
        <Header></Header>
        <main class="flex-grow">
            <Hero></Hero>
            <Details></Details>
            <Goods></Goods>
            <Advantages></Advantages>
            <AboutUs></AboutUs>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Details from './components/Details.vue'
import Goods from './components/Goods.vue'
import Advantages from './components/Advantages.vue'
import AboutUs from './components/AboutUs.vue'
import Footer from './components/Footer.vue'
</script>

<style>
</style>