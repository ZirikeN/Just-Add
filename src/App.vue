<template>
    <div class="min-h-screen flex flex-col bg-[#F9F9F9]">
        <Header></Header>
        <main class="flex-grow">
            <Hero></Hero>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Hero from './components/layout/Hero.vue'
import Footer from './components/layout/Footer.vue'


</script>

<style>

</style>