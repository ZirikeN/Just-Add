<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow flex flex-col">
            <div class="flex-grow flex">
                <div
                    class="w-1/2 mr-4 ml-4 rounded-[16px] bg-[var(--neutral-color-20)] pt-[32px] pb-[32px] flex-grow flex items-center justify-center flex-col"
                >
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Aec7141d209aa7aedb2c780c19262badcd59ef90c0b99f19950e2c94471281732&amp;source=constructor"
                        width="95%"
                        height="500"
                        frameborder="0"
                    ></iframe>
                </div>
                <div
                    class="w-1/2 mr-4 ml-4 rounded-[16px] bg-[var(--neutral-color-20)] pt-[32px] pb-[32px] pr-[40px] pl-[40px] flex-grow flex flex-col"
                >
                    <h1 class="mont-medium text-[64px] text-[var(--neutral-color-30)] mb-[16px]">
                        Контакты
                    </h1>
                    <p class="text-[24px] mont-medium text-[var(--neutral-color-30)]">
                        Наш адрес: <span class="font-bold">Вокзальная площадь, 13</span>
                    </p>
                    <p class="text-[24px] mont-medium text-[var(--neutral-color-30)]">
                        Наша почта: <span class="font-bold">sales@justadd.eu</span>
                    </p>
                    <p class="text-[24px] mont-medium text-[var(--neutral-color-30)] mb-[10px]">
                        Время работы: 8:00 - 20:00
                    </p>

                    <ul class="flex gap-4">
                        <li
                            class="w-[40px] h-[40px] flex justify-center items-center bg-[#FF921C] rounded-[50%]"
                        >
                            <a
                                href="#"
                                class="border-1 border-[#FF921C] rounded-[50%] pt-3 pb-3 pr-3 pl-3 hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)] hover:border-[#FF921C] transition-all duration-300"
                            >
                                <img class="w-[16px] h-[16px]" src="@/assets/img/in.svg" alt="in" />
                            </a>
                        </li>
                        <li
                            class="w-[40px] h-[40px] flex justify-center items-center bg-[#FF921C] rounded-[50%]"
                        >
                            <a
                                href="#"
                                class="border-1 border-[#FF921C] flex-grow items-center rounded-[50%] pt-3 pb-3 pr-3 pl-3 hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)] hover:border-[#FF921C] transition-all duration-300"
                            >
                                <img
                                    class="w-[16px] h-[16px]"
                                    src="@/assets/img/facebook.svg"
                                    alt="facebook"
                                />
                            </a>
                        </li>
                        <li
                            class="w-[40px] h-[40px] flex justify-center items-center bg-[#FF921C] rounded-[50%]"
                        >
                            <a
                                href="#"
                                class="border-1 border-[#FF921C] rounded-[50%] pt-3 pb-3 pr-3 pl-3 hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)] hover:border-[#FF921C] transition-all duration-300"
                            >
                                <img
                                    class="w-[16px] h-[16px]"
                                    src="@/assets/img/instagram.svg"
                                    alt="instagram"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Contact></Contact>
        </main>

        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Contact from '@/components/Contact.vue'
</script>

<style></style>
