<template>
    <div
        class="bg-[#FF921C] m-4 rounded-[16px] flex justify-between items-center gap-[48px] p-[48px]"
    >
        <div class="flex flex-col w-[49%]">
            <h3 class="text-[44px] mont-medium text-white mb-[48px]">
                Подпишитесь на наши обновления и получите скидку 15% на первый заказ
            </h3>
            <div class="email-input">
                <span class="icon start-icon bg-white">
                    <img src="@/assets/img/contact.svg" alt="contact">
                </span>
                <input type="email" placeholder="Your email" class="input-field" />
                <button class="icon send-button">
                    <img src="@/assets/img/contact-arrow.svg" alt="Contact arrow">
                </button>
            </div>
        </div>
        <div>
            <img
                class="w-full h-full rounded-[16px]"
                src="@/assets/img/contact-img.jpg"
                alt="Contact"
            />
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.email-input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 350px;
    height: 48px;
    border-radius: 200px;
    background-color: #000;
}

.input-field {
    flex: 1;
    padding: 12px 20px;
    border: none;
    background: transparent;
    font-size: 16px;
    outline: none;
    color: grey;
}

.input-field::placeholder {
    color: grey;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #666;
}

.start-icon {
    margin-left: 5px;
}

.send-button {
    margin-right: 5px;
    background-color: #FF921C;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.send-button:hover {
    transform: scale(1.05);
}

.send-button:active {
    transform: scale(0.95);
}
</style>
