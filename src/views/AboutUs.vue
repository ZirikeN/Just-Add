<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow">
            <div class="flex gap-4 mr-4 ml-4">
                <div class="w-1/2">
                    <img class="rounded-[16px] w-full" src="@/assets/img/about-us-img.jpg" alt="" />
                </div>
                <div
                    class="w-1/2 bg-[var(--neutral-color-20)] rounded-[16px] flex flex-col gap-4 pt-[48px] pb-[48px] pr-[40px] pl-[40px]"
                >
                    <h1 class="mont-medium text-[76px] text-[var(--neutral-color-30)]">О JDrink</h1>
                    <p class="text-[20px] mont-regular text-[var(--neutral-color-30)] mb-[24px]">
                        В JDrink мы верим, что отличный вкус должен быть естественным и
                        непринужденным. Откройте для себя нашу изысканную коллекцию фирменных чаев и
                        фирменных лимонадов, тщательно приготовленных только из лучших натуральных
                        ингредиентов — без искусственных консервантов и добавок. Каждый глоток — это
                        праздник чистого вкуса и освежающих ощущений.
                    </p>
                    <router-link
                        to="/catalog"
                        class="w-fit flex justify-center items-center border-1 border-[#FF921C] bg-[#FF921C] text-white mont-medium text-[18px] rounded-[200px] pt-4 pb-4 pr-10 pl-10 transform hover:-translate-y-1 hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)] transition-all duration-200"
                        >Купить сейчас</router-link
                    >
                </div>
            </div>

            <div class="flex justify-between m-4 gap-[16px]">
                <div
                    class="bg-[var(--neutral-color-20)] rounded-[16px] w-full flex flex-col gap-[24px] items-center pt-[52px] pb-[52px] pr-[28px] pl-[28px]"
                >
                    <span class="text-[52px] mont-semibold text-[#FF921C]">100%</span>
                    <p class="text-[16px] mont-medium text-center text-[var(--neutral-color-30)]">
                        Только натуральные ингредиенты, не каких добавок
                    </p>
                </div>
                <div
                    class="bg-[var(--neutral-color-20)] rounded-[16px] w-full flex flex-col gap-[48px] items-center pt-[52px] pb-[52px] pr-[40px] pl-[40px]"
                >
                    <span class="text-[52px] mont-semibold text-[#FF921C]">100%</span>
                    <p class="text-[16px] mont-medium text-center text-[var(--neutral-color-30)]">
                        Уникальные и разнообразные вкусы
                    </p>
                </div>
                <div
                    class="bg-[var(--neutral-color-20)] rounded-[16px] w-full flex flex-col gap-[48px] items-center pt-[52px] pb-[52px] pr-[40px] pl-[40px]"
                >
                    <span class="text-[52px] mont-semibold text-[#FF921C]">100%</span>
                    <p class="text-[16px] mont-medium text-center text-[var(--neutral-color-30)]">
                        Охлаждающие лимонады - согревающие чаи
                    </p>
                </div>
                <div
                    class="bg-[var(--neutral-color-20)] rounded-[16px] w-full flex flex-col gap-[48px] items-center pt-[52px] pb-[52px] pr-[40px] pl-[40px]"
                >
                    <span class="text-[52px] mont-semibold text-[#FF921C]">100%</span>
                    <p class="text-[16px] mont-medium text-center text-[var(--neutral-color-30)]">
                        Доступны для покупки с доставкой по всей Эстонии, Латвии и Литве
                    </p>
                </div>
            </div>

            <div
                class="lemonade ml-4 mr-4 rounded-[16px] pt-[64px] pl-[48px] pr-[48px] pb-[82px] mb-4"
            >
                <h2 class="mont-medium text-[64px] text-white w-1/2">
                    Откройте для себя наши фирменные чаи
                </h2>
                <p class="text-[20px] mont-regular text-white mt-[24px] w-1/2 mb-[48px]">
                    Наши фирменные лимонадные концентраты, изготовленные из натуральных сиропов,
                    ягод и кусочков фруктов, поставляются в герметичных упаковках. Просто добавьте
                    газировку и лёд, чтобы получить бодрящий напиток на ходу. Эти восхитительные
                    купажи идеально подходят для переноски и еды на вынос, позволяя вам наслаждаться
                    освежающим вкусом в любое время и в любом месте.
                </p>

                <router-link
                    to="/catalog"
                    class="w-fit text-[22px] mont-medium pt-[18px] pb-[18px] pr-[48px] pl-[48px] bg-black text-white rounded-[200px] border-1 border-black hover:bg-transparent transform hover:-translate-y-1 transition-all duration-200"
                    >Лемонады</router-link
                >
            </div>

            <div class="tea ml-4 mr-4 rounded-[16px] pt-[64px] pl-[48px] pr-[48px] pb-[82px]">
                <h2 class="mont-medium text-[64px] text-white w-1/2">
                    Откройте для себя наши фирменные лимонады
                </h2>
                <p class="text-[20px] mont-regular text-white mt-[24px] w-1/2 mb-[48px]">
                    Наши фирменные чайные концентраты, изготовленные из высококачественных чайных
                    листьев, ягод и специй, герметично упакованы для сохранения свежести. Просто
                    добавьте горячей воды, чтобы насладиться согревающим и полезным напитком в
                    дороге. Идеально подходит для путешествий и еды на вынос.
                </p>

                <router-link
                    to="/catalog"
                    class="w-fit text-[22px] mont-medium pt-[18px] pb-[18px] pr-[48px] pl-[48px] bg-white text-black rounded-[200px] border-1 border-white hover:bg-transparent transform hover:-translate-y-1 hover:text-white transition-all duration-200"
                    >Чаи</router-link
                >
            </div>

            <div class="m-4 rounded-[16px]">
                <img
                    class="w-full h-full rounded-[16px]"
                    src="@/assets/img/enticement-img.jpg"
                    alt="Enticement"
                />
            </div>
            <Testimonials></Testimonials>
            <Contact></Contact>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Testimonials from '@/components/Testimonials.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'
</script>

<style></style>
