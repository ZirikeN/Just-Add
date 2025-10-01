<template>
    <transition name="fade">
        <div
            v-if="isLoading"
            class="fixed inset-0 bg-[var(--neutral-color-20)] z-50 flex items-center justify-center"
        >
            <div class="text-center">
                <!-- Анимированный логотип -->
                <div class="mb-8 animate-bounce">
                    <img src="@/assets/img/logo-full.svg" alt="Logo" class="w-32 h-32 mx-auto" />
                </div>

                <!-- Анимированные точки -->
                <div class="flex justify-center space-x-2">
                    <div
                        class="w-4 h-4 bg-[#FF921C] rounded-full animate-pulse"
                        style="animation-delay: 0s"
                    ></div>
                    <div
                        class="w-4 h-4 bg-[#FF921C] rounded-full animate-pulse"
                        style="animation-delay: 0.2s"
                    ></div>
                    <div
                        class="w-4 h-4 bg-[#FF921C] rounded-full animate-pulse"
                        style="animation-delay: 0.4s"
                    ></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
defineProps({
    isLoading: {
        type: Boolean,
        required: true,
    },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Кастомная анимация пульсации */
@keyframes pulse {
    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(0.8);
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 1.5s ease-in-out infinite;
}
</style>
