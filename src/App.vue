<template>
    <div id="app">
        <!-- Прелоудер  -->
        <AppLoader :isLoading="userStore.appLoading" />

        <!-- Основное приложение -->
        <div
            :class="{ 'opacity-0': userStore.appLoading, 'opacity-100': !userStore.appLoading }"
            class="transition-opacity duration-300"
        >
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { useUserStore } from './stores/userStore'

import AppLoader from './components/AppLoader.vue'

const isModalOpen = ref(false)
const userStore = useUserStore()

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
