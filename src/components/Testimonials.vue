<template>
    <div class="m-4 rounded-[16px] bg-[var(--neutral-color-20)] pb-[64px]">
        <h2 class="pt-[64px] pb-[48px] text-center mont-medium text-[64px] text-[var(--neutral-color-30)]">
            Отзывы наших клиентов
        </h2>

        <div class="reviews-slider-container">
            <swiper
                :modules="modules"
                :slides-per-view="3"
                :centered-slides="true"
                :loop="true"
                :space-between="30"
                :speed="500"
                @swiper="setSwiperInstance"
                @slide-change="updateActiveIndex"
            >
                <swiper-slide v-for="(review, index) in reviews" :key="index">
                    <div
                        class="slide-content border-1 border-[var(--neutral-color-40)] rounded-[16px] bg-[var(--neutral-color-40)]! text-[var(--neutral-color-30)] p-[24px]"
                        :class="{ 'center-slide': isCenterSlide(index) }"
                    >
                        <p class="text-[16px] mont-medium pb-[24px]">{{ review.text }}</p>
                        <div class="flex gap-[16px]">
                            <img
                                class="w-[56px] h-[56px] rounded-[50%]"
                                :src="review.img"
                                :alt="review.img"
                            />
                            <div class="flex flex-col">
                                <p class="text-[16px] mont-medium">{{ review.author }}</p>
                                <span class="text-[12px] mont-regular">Локация</span>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCreative } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'

const reviews = ref([
    {
        text: 'Качественный продукт. Выбрал чёрный чай с бергамотом – свежий, с ярким вкусом. Магазин порадовал ассортиментом и оперативной доставкой. Обязательно вернусь за новыми сортами.',
        author: 'Иван Иванов',
        img: new URL('@/assets/img/testimonial-1.jpg', import.meta.url),
    },
    {
        text: 'Доволен на 100%. Купил матчу – качество на высоте, вкус насыщенный, без горечи. Доставка быстрая, курьер вежливый. Обязательно закажу ещё что-нибудь!',
        author: 'Игорь Петров',
        img: new URL('@/assets/img/testimonial-2.jpg', import.meta.url),
    },
    {
        text: 'Супер! Заказал чайный набор – все сорта свежие, упаковка стильная. Доставили раньше срока, всё аккуратно. Цены адекватные, выбор огромный. Рекомендую всем любителям чая!',
        author: 'Алексей Смирнов',
        img: new URL('@/assets/img/testimonial-3.jpg', import.meta.url),
    },
    {
        text: 'Отличный выбор. Попробовал фруктовый сбор – аромат просто волшебный! Чай свежий, без лишних добавок. Доставка без задержек, упаковка надёжная. Буду заказывать ещё.',
        author: 'Олег Козлов',
        img: new URL('@/assets/img/testimonial-1.jpg', import.meta.url),
    },
    {
        text: 'Отличный чай! Заказал улун – аромат потрясающий, вкус насыщенный. Доставили быстро, упаковка герметичная. Цены приятные, буду покупать ещё. Рекомендую!',
        author: 'Дмитрий Волков',
        img: new URL('@/assets/img/testimonial-2.jpg', import.meta.url),
    },
])

// Swiper логика
const swiperInstance = ref(null)
const activeIndex = ref(0)

const setSwiperInstance = (swiper) => {
    swiperInstance.value = swiper
}

const updateActiveIndex = () => {
    if (swiperInstance.value) {
        activeIndex.value = swiperInstance.value.realIndex
    }
}

const isCenterSlide = (index) => {
    if (!swiperInstance.value) return false

    const realIndex = swiperInstance.value.realIndex
    const slidesCount = reviews.value.length

    return (
        index === realIndex % slidesCount ||
        (realIndex === 0 && index === slidesCount - 1) ||
        (realIndex === slidesCount - 1 && index === 0)
    )
}

const modules = [EffectCreative]
</script>

<style scoped>
.reviews-slider-container {
    width: 100%;
    margin: 0 auto;
}

.swiper {
    width: 100%;
    padding: 20px 0;
}

.slide-content {
    background: #ffffff;
    border-radius: 16px;
    padding: 30px;
    transition: all 0.4s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.center-slide {
    z-index: 1;
}

.swiper-slide{
    height: auto !important;
}
</style>
