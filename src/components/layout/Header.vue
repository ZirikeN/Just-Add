<template>
    <header
        class="bg-white m-4 rounded-[16px] pt-4 pb-4 pr-20 pl-20 flex justify-between items-center"
    >
        <a href="/">
            <img src="@/assets/img/logo.svg" alt="Logo" />
        </a>

        <div class="flex gap-16">
            <ul class="flex gap-4">
                <li>
                    <a
                        href="#"
                        class="border-1 border-[#FF921C] rounded-[200px] pt-3 pb-3 pr-8 pl-8 mont-semibold text-[20px] inline-block hover:text-[#fa8302] transform hover:-translate-y-1 transition-all duration-200"
                        >Товары</a
                    >
                </li>
                <li>
                    <a
                        href="#"
                        class="border-1 border-[#FF921C] rounded-[200px] pt-3 pb-3 pr-8 pl-8 mont-semibold text-[20px] inline-block hover:text-[#fa8302] transform hover:-translate-y-1 transition-all duration-200"
                        >О нас</a
                    >
                </li>
                <li>
                    <a
                        href="#"
                        class="border-1 border-[#FF921C] rounded-[200px] pt-3 pb-3 pr-8 pl-8 mont-semibold text-[20px] inline-block hover:text-[#fa8302] transform hover:-translate-y-1 transition-all duration-200"
                        >Контакты</a
                    >
                </li>
            </ul>

            <div class="flex gap-4">
                <a
                    href="#"
                    class="flex border-1 border-[#FF921C] rounded-[200px] pt-3 pb-3 pr-14 pl-14 transform hover:-translate-y-1 transition-all duration-200"
                >
                    <img src="@/assets/img/user.svg" alt="User" />
                </a>
                <a
                    href="#"
                    class="flex justify-center items-center gap-2 border-1 border-[#FF921C] rounded-[200px] pt-3 pb-3 pr-14 pl-14 mont-semibold text-[20px] hover:text-[#fa8302] transform hover:-translate-y-1 transition-all duration-200"
                >
                    <img src="@/assets/img/cart.svg" alt="Cart" />
                    <span>0</span>
                </a>
            </div>
        </div>
    </header>
</template>

<script setup></script>
<style></style>
