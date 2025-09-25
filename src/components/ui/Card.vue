<template>
    <div class="slide-content bg-[var(--neutral-color-40)] rounded-[20px]">
        <img :src="product.URL" :alt="product.title" class="w-[380px] h-[345px] m-auto" />
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
                <span>€{{ product.price }}</span>
            </a>
            <p class="text-[16px] text-[var(--neutral-color-30)] mont-regular pb-[24px]">
                {{ product.description }}
            </p>

            <div class="flex justify-between">
                <a
                    href="#"
                    class="pt-[14px] pb-[14px] pr-[36px] pl-[36px] bg-black text-white rounded-[200px] border-1 border-black hover:bg-transparent hover:text-[var(--neutral-color-30)] transform hover:-translate-y-1 transition-all duration-200"
                    >В корзину</a
                >
                <router-link
                    :to="`/product/${product.id}`"
                    class="pt-[14px] pb-[14px] pr-[36px] pl-[36px] rounded-[200px] border-1 border-black text-[var(--neutral-color-30)] hover:bg-black hover:text-white transform hover:-translate-y-1 transition-all duration-200"
                    >Подробнее</router-link
                >
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['product'])
</script>

<style></style>
