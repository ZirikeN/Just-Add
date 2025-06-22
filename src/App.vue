<template>
    <div class="min-h-screen flex flex-col bg-[#F9F9F9]">
        <Header></Header>
        <main class="flex-grow">
            <Hero></Hero>
            <Details></Details>
            <Goods></Goods>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Hero from './components/layout/Hero.vue'
import Details from './components/layout/Details.vue'
import Goods from './components/layout/Goods.vue'
import Footer from './components/layout/Footer.vue'

</script>

<style>

</style>