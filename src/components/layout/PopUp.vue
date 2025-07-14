<template>
    <div
        v-if="isModalOpen"
        @click="handleBackdropClick"
        class="z-10 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
    >
        <div 
            class="wrapper z-100"
            @click.stop
        >
            <div class="card-switch">
                <label class="switch">
                    <input type="checkbox" class="toggle cursor-pointer" />
                    <span class="slider"></span>
                    <span class="card-side cursor-pointer"></span>
                    <div class="flip-card__inner">
                        <div class="flip-card__front">
                            <div class="flex justify-end">
                                <button @click="closeModal" class="w-[38px] h-[38px] cursor-pointer">
                                    <img src="@/assets/img/close.svg" alt="Close">
                                </button>
                            </div>
                            <div class="title mont-medium text-[32px] text-white">Вход</div>
                            <form class="flip-card__form" action="">
                                <input
                                    class="flip-card__input"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                />
                                <input
                                    class="flip-card__input"
                                    name="password"
                                    placeholder="Пароль"
                                    type="password"
                                />
                                <button class="flip-card__btn">Войти</button>
                            </form>
                        </div>
                        <div class="flip-card__back">
                            <div class="flex justify-end">
                                <button @click="closeModal" class="w-[38px] h-[38px] cursor-pointer">
                                    <img src="@/assets/img/close.svg" alt="Close">
                                </button>
                            </div>
                            <div class="title mont-medium text-[26px] text-white">Зарегистрироваться</div>
                            <form class="flip-card__form" action="">
                                <input class="flip-card__input" placeholder="Имя" type="name" />
                                <input
                                    class="flip-card__input"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                />
                                <input
                                    class="flip-card__input"
                                    name="password"
                                    placeholder="Пароль"
                                    type="password"
                                />
                                <button class="flip-card__btn">Войти</button>
                            </form>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, watch } from 'vue'

const { isModalOpen, closeModal } = inject('modalState')

// Функция для отключения/включения скролла
const toggleBodyScroll = (disable) => {
    if (disable) {
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px'
    } else {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }
}

// Следим за изменениями состояния модального окна
watch(isModalOpen, (newVal) => {
    toggleBodyScroll(newVal)
})

// Закрытие при клике на пустую область
const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal()
    }
}
</script>

<style scoped>
.wrapper {
    --input-focus: #FF921C;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
}
/* switch card */
.switch {
    transform: translateY(-200px);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
}

.card-side::before {
    position: absolute;
    content: 'Log in';
    left: -70px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: #ffffffd7;
    font-weight: 600;
}

.card-side::after {
    position: absolute;
    content: 'Sign up';
    left: 70px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: #ffffffd7;
    font-weight: 600;
}

.toggle {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid black;
    box-shadow: 4px 4px #00000092;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-colorcolor);
    transition: 0.3s;
}

.slider:before {
    box-sizing: border-box;
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
}

.toggle:checked + .slider {
    background-color: var(--input-focus);
}

.toggle:checked + .slider:before {
    transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
    text-decoration: none;
}

.toggle:checked ~ .card-side:after {
    text-decoration: underline;
}

/* card */

.flip-card__inner {
    width: 380px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
}

.toggle:checked ~ .flip-card__front {
    box-shadow: none;
}

.flip-card__front,
.flip-card__back {
    width: 100%;
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: rgba(194, 193, 193, 0.708);
    gap: 10px;
    border-radius: 16px;
}

.flip-card__back {
    width: 100%;
    transform: rotateY(180deg);
}

.flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.title {
    margin: 5px 0 20px 0;
    text-align: center;
}

.flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: #ffffffd6;
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
}

.flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
}

.flip-card__input:focus {
    border: 2px solid var(--input-focus);
}

.flip-card__btn:active,
.button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
}

.flip-card__btn {
    margin: 20px 0 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
}
</style>