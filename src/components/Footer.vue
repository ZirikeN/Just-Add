<template>
    <footer class="bg-black m-4 rounded-[16px] pt-8 pb-4 pr-20 pl-20 text-white">
        <div class="footer__top flex justify-between gap-14 pb-[50px]">
            <div class="footer__top-left flex justify-between w-1/2">
                <a href="/">
                    <img class="w-[140px]" src="@/assets/img/logo-footer.svg" alt="Logo" />
                </a>

                <ul class="mont-regular text-[16px] flex gap-2 flex-col">
                    <li>
                        <router-link to="/catalog" class="hover:text-[#FF921C] transition-all">Товары</router-link>
                    </li>
                    <li>
                        <a href="#" class="hover:text-[#FF921C] transition-all">О нас</a>
                    </li>
                    <li>
                        <a href="#" class="hover:text-[#FF921C] transition-all">Контакты</a>
                    </li>
                </ul>
            </div>
            <div class="footer__top-right flex justify-between w-1/2">
                <ul class="mont-regular text-[16px] flex gap-2 flex-col ">
                    <li>
                        <a href="tel:+79999999999" class="hover:text-[#FF921C] transition-all">+7 (999) 999-99-99</a>
                    </li>
                    <li>
                        <a href="mailto:sales@justadd.eu" class="hover:text-[#FF921C] transition-all">sales@justadd.eu</a>
                    </li>
                </ul>
                
                <ul class="flex gap-4">
                    <li class="w-[40px] h-[40px] flex justify-center items-center">
                        <a href="#" class="border-1 rounded-[50%] pt-3 pb-3 pr-3 pl-3 hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)] hover:border-[#FF921C] transition-all duration-300">
                            <img class="w-[16px] h-[16px]" src="@/assets/img/in.svg" alt="in">
                        </a>
                    </li>
                    <li class="w-[40px] h-[40px] flex justify-center items-center">
                        <a href="#" class="border-1 flex-grow items-center rounded-[50%] pt-3 pb-3 pr-3 pl-3 hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)] hover:border-[#FF921C] transition-all duration-300">
                            <img class="w-[16px] h-[16px]" src="@/assets/img/facebook.svg" alt="facebook">
                        </a>
                    </li>
                    <li class="w-[40px] h-[40px] flex justify-center items-center">
                        <a href="#" class="border-1 rounded-[50%] pt-3 pb-3 pr-3 pl-3 hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)] hover:border-[#FF921C] transition-all duration-300">
                            <img class="w-[16px] h-[16px]" src="@/assets/img/instagram.svg" alt="instagram">
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="footer__bottom flex justify-between">
            <img src="@/assets/img/logo-footer-2.svg" alt="Logo">
            <span>© Just Add 2025</span>
            <a class="inline-block hover:rotate-10 transition-transform duration-500" href="https://github.com/ZirikeN/Just-Add">made by ZirikeN &#128190;</a>
        </div>
    </footer>
</template>

<script setup></script>

<style></style>
