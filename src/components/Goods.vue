<template>
    <div class="flex flex-col m-4 rounded-[16px] bg-[var(--neutral-color-20)] pl-20 pt-[64px] pb-4">
        <div class="flex flex-wrap justify-between pb-[40px]">
            <h1 class="mont-medium text-[64px] text-[var(--neutral-color-30)]">Наши вкусы (популярное)</h1>

            <div class="flex flex-col max-w-[750px] gap-[16px]">
                <p class="mont-medium text-[16px] text-[var(--neutral-color-30)]">
                    В наших разделах Signature Tea и Signature Lemonade вы найдете восхитительное
                    разнообразие вкусов, разработанных для удовлетворения любого вкуса. Независимо
                    от того, находитесь ли вы дома, на работе или в пути, наши восхитительные
                    напитки идеально впишутся в ваш образ жизни. С JDrink вам нужно всего лишь
                    добавить горячую воду или газировку, и вы получите восхитительный напиток за
                    считанные секунды!
                </p>

                <div class="flex">
                    <router-link to="/catalog" class="flex items-center mont-semibold text-[20px] gap-[14px] text-[var(--neutral-color-30)]">
                        Посмотреть все
                        <img src="@/assets/img/arrow-right.svg" alt="Arrow Right" />
                    </router-link>
                </div>
            </div>
        </div>

        <div class="swiper-wrapper flex flex-col">
            <Loader v-if="loading"></Loader>
            <swiper
                v-else
                :modules="modules"
                :slides-per-view="slidesPerView"
                :slides-per-group="1"
                :space-between="spaceBetween"
                :pagination="paginationOptions"
                :navigation="navigationOptions"
                @swiper="onSwiperInitialized"
                @slide-change="onSlideChange"
                :speed="300"
                :long-swipes-ratio="0.1"
            >
                <swiper-slide v-for="product in recommendedProducts" :key="product.id">
                    <Card :product="product" />
                </swiper-slide>
            </swiper>

            <div class="slider__attributes flex items-center pt-[48px] pb-[64px] pr-20 gap-[24px]">
                <!-- Прогресс-бар -->
                <div class="w-full bg-gray-200 h-1 mt-4">
                    <div
                        class="bg-[#FF921C] h-full transition-all duration-300"
                        :style="{ width: progress + '%' }"
                    ></div>
                </div>

                <div class="navigation flex nowrap gap-[8px]">
                    <button class="custom-prev">
                        <img class="rotate-180" src="@/assets/img/arrow.svg" alt="Arrow" />
                    </button>
                    <button class="custom-next">
                        <img src="@/assets/img/arrow.svg" alt="Arrow" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Loader from './layout/Loader.vue'
import Card from './ui/Card.vue'

import { useProductsStore } from '../stores/products'
import { storeToRefs } from 'pinia'
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
// Импорт основных компонентов Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
// Импорт необходимых модулей
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
// Импорт стилей
import 'swiper/css'
import 'swiper/css/navigation'

const activeIndex = ref(0)
const productsStore = useProductsStore()
const { loading, recommendedProducts } = storeToRefs(productsStore)

const progress = computed(() => {
    return recommendedProducts.value.length ? ((activeIndex.value + 4) / recommendedProducts.value.length) * 100 : 0
})

const onSlideChange = (swiper) => {
    activeIndex.value = swiper.activeIndex
}

// Настройки Swiper
const modules = [Navigation, Pagination, Autoplay]
const spaceBetween = 30
const slidesPerView = computed(() => {
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2 // например, 2 на планшетах
    return 4
})

// Опции пагинации с кастомным рендерингом
const paginationOptions = {
    clickable: true,
    type: 'progressbar', // Включаем прогресс-бар
}

// Опции навигации с кастомными селекторами
const navigationOptions = {
    nextEl: '.swiper-wrapper .slider__attributes .navigation .custom-next',
    prevEl: '.swiper-wrapper .slider__attributes .navigation .custom-prev',
    disabledClass: 'custom-navigation-disabled',
    enabled: true,
    hideOnClick: false,
    disabledClass: 'swiper-button-disabled',
}

// Ссылка на инстанс Swiper
const swiperInstance = ref(null)

// Обработчики событий Swiper
const onSwiperInitialized = (swiper) => {
    swiperInstance.value = swiper
}

// Адаптация к изменению размера окна
const handleResize = () => {
    if (swiperInstance.value) {
        swiperInstance.value.update()
    }
}

// Хуки жизненного цикла
onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    if (swiperInstance.value) {
        swiperInstance.value.destroy()
    }
})
</script>

<style scoped>
.swiper {
    overflow: visible;
    width: 100%;
}

.swiper-slide {
    width: 100% !important;
    max-width: 420px;
    margin: 0 auto;
}

.slide-content {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
}

.navigation {
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    pointer-events: none; /* Чтобы не перекрывать слайды */
}

.custom-prev,
.custom-next {
    pointer-events: all; /* Разрешаем клики */
    width: 64px;
    height: 64px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border: none;
}

.swiper-button-disabled {
    opacity: 0.5;
    cursor: default;
}
</style>

<style>
/* Глобальные стили для Swiper */
.swiper-wrapper {
    transition-timing-function: linear !important;
}
</style>
