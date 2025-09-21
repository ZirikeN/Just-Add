<template>
    <router-view></router-view>
</template>

<script setup>
import { ref, provide } from 'vue'

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
