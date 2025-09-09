<template>
    <div class="flex flex-col m-4 rounded-[16px] bg-[var(--neutral-color-20)] pl-20 pt-[64px] pb-4">
        <div class="flex flex-wrap justify-between pb-[40px]">
            <h1 class="mont-medium text-[64px] text-[var(--neutral-color-30)]">Наши вкусы</h1>

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
                    <a
                        href="#"
                        class="flex items-center mont-semibold text-[20px] gap-[14px] text-[var(--neutral-color-30)]"
                    >
                        Посмотреть все
                        <img src="@/assets/img/arrow-right.svg" alt="Arrow Right" />
                    </a>
                </div>
            </div>
        </div>

        <div class="swiper-wrapper flex flex-col">
            <div class="loadingspinner" v-if="loading">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>
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
                <swiper-slide v-for="(product, index) in products" :key="index">
                    <div class="slide-content bg-[var(--neutral-color-40)] rounded-[20px]">
                        <img :src="product.URL" :alt="product.title" class="w-[380px] h-[345px]" />
                        <div
                            class="absolute w-[40px] h-[40px] top-[24px] right-[24px] bg-white rounded-[50%] flex justify-center items-center cursor-pointer"
                        >
                            <img src="@/assets/img/like.svg" alt="like" />
                        </div>
                        <div class="p-[24px]">
                            <a
                                href="#"
                                class="flex justify-between text-[20px] text-[var(--neutral-color-30)] mont-semibold"
                            >
                                <h3>{{ product.title }}</h3>
                                <span>€2</span>
                            </a>
                            <p
                                class="text-[16px] text-[var(--neutral-color-30)] mont-regular pb-[24px]"
                            >
                                {{ product.description }}
                            </p>

                            <div class="flex justify-between">
                                <a
                                    href="#"
                                    class="pt-[14px] pb-[14px] pr-[36px] pl-[36px] bg-black text-white rounded-[200px] border-1 border-black hover:bg-transparent hover:text-[var(--neutral-color-30)] transform hover:-translate-y-1 transition-all duration-200"
                                    >В корзину</a
                                >
                                <a
                                    href="#"
                                    class="pt-[14px] pb-[14px] pr-[36px] pl-[36px] rounded-[200px] border-1 border-black text-[var(--neutral-color-30)] hover:bg-black hover:text-white transform hover:-translate-y-1 transition-all duration-200"
                                    >Подробнее</a
                                >
                            </div>
                        </div>
                    </div>
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
const { products, loading, error } = storeToRefs(productsStore)
const { getProducts } = productsStore

// Функция для загрузки продуктов
const loadProducts = async () => {
    await getProducts()
}

const progress = computed(() => {
    return products.value.length ? ((activeIndex.value + 4) / products.value.length) * 100 : 0
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
    max-width: 380px;
    margin: 0 auto;
}

.slide-content {
    width: 100%;
    max-width: 380px;
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

/* Loader */

.loadingspinner {
    --square: 26px;
    --offset: 30px;
    --duration: 2.4s;
    --delay: 0.2s;
    --timing-function: ease-in-out;
    --in-duration: 0.4s;
    --in-delay: 0.1s;
    --in-timing-function: ease-out;
    width: calc(3 * var(--offset) + var(--square));
    height: calc(2 * var(--offset) + var(--square));
    padding: 0px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 30px;
    position: relative;
}

.loadingspinner div {
    display: inline-block;
    background: darkorange;
    /*background: var(--text-color);*/
    /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);*/
    border: none;
    border-radius: 2px;
    width: var(--square);
    height: var(--square);
    position: absolute;
    padding: 0px;
    margin: 0px;
    font-size: 6pt;
    color: black;
}

.loadingspinner #square1 {
    left: calc(0 * var(--offset));
    top: calc(0 * var(--offset));
    animation:
        square1 var(--duration) var(--delay) var(--timing-function) infinite,
        squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
}

.loadingspinner #square2 {
    left: calc(0 * var(--offset));
    top: calc(1 * var(--offset));
    animation:
        square2 var(--duration) var(--delay) var(--timing-function) infinite,
        squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
}

.loadingspinner #square3 {
    left: calc(1 * var(--offset));
    top: calc(1 * var(--offset));
    animation:
        square3 var(--duration) var(--delay) var(--timing-function) infinite,
        squarefadein var(--in-duration) calc(2 * var(--in-delay)) var(--in-timing-function) both;
}

.loadingspinner #square4 {
    left: calc(2 * var(--offset));
    top: calc(1 * var(--offset));
    animation:
        square4 var(--duration) var(--delay) var(--timing-function) infinite,
        squarefadein var(--in-duration) calc(3 * var(--in-delay)) var(--in-timing-function) both;
}

.loadingspinner #square5 {
    left: calc(3 * var(--offset));
    top: calc(1 * var(--offset));
    animation:
        square5 var(--duration) var(--delay) var(--timing-function) infinite,
        squarefadein var(--in-duration) calc(4 * var(--in-delay)) var(--in-timing-function) both;
}

@keyframes square1 {
    0% {
        left: calc(0 * var(--offset));
        top: calc(0 * var(--offset));
    }

    8.333% {
        left: calc(0 * var(--offset));
        top: calc(1 * var(--offset));
    }

    100% {
        left: calc(0 * var(--offset));
        top: calc(1 * var(--offset));
    }
}

@keyframes square2 {
    0% {
        left: calc(0 * var(--offset));
        top: calc(1 * var(--offset));
    }

    8.333% {
        left: calc(0 * var(--offset));
        top: calc(2 * var(--offset));
    }

    16.67% {
        left: calc(1 * var(--offset));
        top: calc(2 * var(--offset));
    }

    25.00% {
        left: calc(1 * var(--offset));
        top: calc(1 * var(--offset));
    }

    83.33% {
        left: calc(1 * var(--offset));
        top: calc(1 * var(--offset));
    }

    91.67% {
        left: calc(1 * var(--offset));
        top: calc(0 * var(--offset));
    }

    100% {
        left: calc(0 * var(--offset));
        top: calc(0 * var(--offset));
    }
}

@keyframes square3 {
    0%,
    100% {
        left: calc(1 * var(--offset));
        top: calc(1 * var(--offset));
    }

    16.67% {
        left: calc(1 * var(--offset));
        top: calc(1 * var(--offset));
    }

    25.00% {
        left: calc(1 * var(--offset));
        top: calc(0 * var(--offset));
    }

    33.33% {
        left: calc(2 * var(--offset));
        top: calc(0 * var(--offset));
    }

    41.67% {
        left: calc(2 * var(--offset));
        top: calc(1 * var(--offset));
    }

    66.67% {
        left: calc(2 * var(--offset));
        top: calc(1 * var(--offset));
    }

    75.00% {
        left: calc(2 * var(--offset));
        top: calc(2 * var(--offset));
    }

    83.33% {
        left: calc(1 * var(--offset));
        top: calc(2 * var(--offset));
    }

    91.67% {
        left: calc(1 * var(--offset));
        top: calc(1 * var(--offset));
    }
}

@keyframes square4 {
    0% {
        left: calc(2 * var(--offset));
        top: calc(1 * var(--offset));
    }

    33.33% {
        left: calc(2 * var(--offset));
        top: calc(1 * var(--offset));
    }

    41.67% {
        left: calc(2 * var(--offset));
        top: calc(2 * var(--offset));
    }

    50.00% {
        left: calc(3 * var(--offset));
        top: calc(2 * var(--offset));
    }

    58.33% {
        left: calc(3 * var(--offset));
        top: calc(1 * var(--offset));
    }

    100% {
        left: calc(3 * var(--offset));
        top: calc(1 * var(--offset));
    }
}

@keyframes square5 {
    0% {
        left: calc(3 * var(--offset));
        top: calc(1 * var(--offset));
    }

    50.00% {
        left: calc(3 * var(--offset));
        top: calc(1 * var(--offset));
    }

    58.33% {
        left: calc(3 * var(--offset));
        top: calc(0 * var(--offset));
    }

    66.67% {
        left: calc(2 * var(--offset));
        top: calc(0 * var(--offset));
    }

    75.00% {
        left: calc(2 * var(--offset));
        top: calc(1 * var(--offset));
    }

    100% {
        left: calc(2 * var(--offset));
        top: calc(1 * var(--offset));
    }
}

@keyframes squarefadein {
    0% {
        transform: scale(0.75);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
