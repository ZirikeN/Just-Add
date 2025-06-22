<template>
    <div class="flex flex-col m-4 rounded-[16px] bg-white pr-20 pl-20 pt-[64px] pb-4">
        <div class="flex flex-wrap justify-between pb-[40px]">
            <h1 class="mont-medium text-[64px]">Наши вкусы</h1>

            <div class="flex flex-col max-w-[750px] gap-[16px]">
                <p class="mont-medium text-[16px]">
                    В наших разделах Signature Tea и Signature Lemonade вы найдете восхитительное
                    разнообразие вкусов, разработанных для удовлетворения любого вкуса. Независимо
                    от того, находитесь ли вы дома, на работе или в пути, наши восхитительные
                    напитки идеально впишутся в ваш образ жизни. С JDrink вам нужно всего лишь
                    добавить горячую воду или газировку, и вы получите восхитительный напиток за
                    считанные секунды!
                </p>

                <div class="flex">
                    <a href="#" class="flex items-center mont-semibold text-[20px] gap-[14px]">
                        Посмотреть все
                        <img src="@/assets/img/arrow-right.svg" alt="Arrow Right" />
                    </a>
                </div>
            </div>
        </div>

        <div class="swiper-wrapper">
            <swiper
                :modules="modules"
                :slides-per-view="slidesPerView"
                :slides-per-group="1"
                :space-between="spaceBetween"
                :pagination="paginationOptions"
                :navigation="navigationOptions"
                @swiper="onSwiperInitialized"
                @slide-change="onSlideChange"
                @reach-beginning="onReachBeginning"
                @reach-end="onReachEnd"
                :speed="300"
                :long-swipes-ratio="0.1"
            >
                <swiper-slide v-for="(slide, index) in slides" :key="index">
                    <div class="slide-content">
                        <img :src="slide.URL" :alt="slide.title" />
                        <h3>{{ slide.title }}</h3>
                        <p>{{ slide.description }}</p>
                    </div>
                </swiper-slide>

                <div class="navigation">
                    <button class="custom-prev">
                        <img class="rotate-180" src="@/assets/img/arrow.svg" alt="Arrow" />
                    </button>
                    <button class="custom-next">
                        <img src="@/assets/img/arrow.svg" alt="Arrow" />
                    </button>
                </div>

                <div class="relative">
                    <!-- Прогресс-бар -->
                    <div class="w-full bg-gray-200 h-1 mt-4">
                        <div
                            class="bg-black h-full transition-all duration-300"
                            :style="{ width: progress + '%' }"
                        ></div>
                    </div>
                </div>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
// Импорт основных компонентов Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
// Импорт необходимых модулей
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
// Импорт стилей
import 'swiper/css'
import 'swiper/css/navigation'

const activeIndex = ref(0)

const progress = computed(() => {
    return slides.value.length ? ((activeIndex.value + 4) / slides.value.length) * 100 : 0
})

const onSlideChange = (swiper) => {
    activeIndex.value = swiper.activeIndex
}

// Данные слайдов
const slides = ref([
    {
        title: 'Облепиха-апельсин',
        URL: new URL('@/assets/img/tea-1.jpg', import.meta.url),
        description: 'Цитрусовый, сладкий, кислый',
    },
    {
        title: 'Смородина-базилик',
        URL: new URL('@/assets/img/tea-2.jpg', import.meta.url),
        description: 'Цитрусовый, сладкий, кислый',
    },
    {
        title: 'Черника-малина',
        URL: new URL('@/assets/img/tea-3.jpg', import.meta.url),
        description: 'Цитрусовый, сладкий, кислый',
    },
    {
        title: 'Имбирь-лайм-мед',
        URL: new URL('@/assets/img/tea-4.jpg', import.meta.url),
        description: 'Цитрусовый, сладкий, кислый',
    },
    {
        title: 'Облепиха-апельсин',
        URL: new URL('@/assets/img/tea-1.jpg', import.meta.url),
        description: 'Цитрусовый, сладкий, кислый',
    },
    {
        title: 'Смородина-базилик',
        URL: new URL('@/assets/img/tea-2.jpg', import.meta.url),
        description: 'Цитрусовый, сладкий, кислый',
    },
    {
        title: 'Черника-малина',
        URL: new URL('@/assets/img/tea-3.jpg', import.meta.url),
        description: 'Цитрусовый, сладкий, кислый',
    },
    {
        title: 'Имбирь-лайм-мед',
        URL: new URL('@/assets/img/tea-4.jpg', import.meta.url),
        description: 'Цитрусовый, сладкий, кислый',
    },
])

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
    progressbarFillClass: 'custom-progressbar-fill', // Класс для заполненной части
    progressbarOppositeClass: 'custom-progressbar', // Класс для всей линии
}

// Опции навигации с кастомными селекторами
const navigationOptions = {
    nextEl: '.navigation .custom-next',
    prevEl: '.navigation .custom-prev',
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
.swiper-overflow-container {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    overflow: visible;
    padding: 20px 0;
}

.swiper {
    overflow: visible;
    width: 100%;
}

.swiper-slide {
    width: 100% !important;
    max-width: 380px;
    margin: 0 auto;
}

.slide-content {
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
}

.navigation {
    position: absolute;
    top: 50%;
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

.custom-prev {
    transform: translateX(-50%);
}

.custom-next {
    transform: translateX(50%);
}

.swiper-button-disabled {
    opacity: 0.5;
    cursor: default;
}

/* Стили для прогресс-бара */
.custom-progressbar {
    height: 4px;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 2px;
}

.custom-progressbar-fill {
    height: 100%;
    background-color: #000; /* Цвет заполненной части */
    border-radius: 2px;
    transition: width 0.3s ease;
}

/* Скрываем стандартные буллеты */
.swiper-pagination-bullets {
    display: none;
}

/* Контейнер для прогресс-бара */
.swiper-pagination {
    position: relative;
    margin-top: 20px;
}
</style>

<style>
/* Глобальные стили для Swiper */
.swiper-wrapper {
    transition-timing-function: linear !important;
}
</style>
