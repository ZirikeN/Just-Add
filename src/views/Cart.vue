<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow flex">
            <div class="flex gap-4 mr-4 ml-4 flex-grow">
                <div
                    class="w-3/4 rounded-[16px] bg-[var(--neutral-color-20)] flex flex-col pt-[48px] pb-[48px] pr-[40px] pl-[40px]"
                >
                    <h1 class="mont-medium text-[64px] text-[var(--neutral-color-30)] mb-[48px]">
                        Корзина
                    </h1>

                    <div class="w-full rounded-lg overflow-hidden">
                        <table
                            class="min-w-full divide-y divide-[var(--neutral-color-30)] bg-[var(--neutral-color-20)]"
                        >
                            <thead>
                                <tr>
                                    <th
                                        class="px-4 py-2 text-left mont-semibold text-[16px] text-[var(--neutral-color-30)] uppercase tracking-wider"
                                    >
                                        Товар
                                    </th>
                                    <th
                                        class="px-4 py-2 text-left mont-semibold text-[16px] text-[var(--neutral-color-30)] uppercase tracking-wider"
                                    >
                                        Цена
                                    </th>
                                    <th
                                        class="px-4 py-2 text-left mont-semibold text-[16px] text-[var(--neutral-color-30)] uppercase tracking-wider"
                                    >
                                        Количество
                                    </th>
                                    <th
                                        class="px-4 py-2 text-left mont-semibold text-[16px] text-[var(--neutral-color-30)] uppercase tracking-wider"
                                    >
                                        Всего
                                    </th>
                                    <th class="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-[var(--neutral-color-30)]">
                                <tr
                                    v-for="item in cartStore.items"
                                    class="bg-[var(--neutral-color-20)]"
                                    :key="item.id"
                                >
                                    <td class="px-4 py-3 flex gap-4 items-center">
                                        <img
                                            class="w-[100px] h-[100px]"
                                            :src="item.URL"
                                            :alt="item.title"
                                        />
                                        <span
                                            class="text-[var(--neutral-color-30)] text-[22px] mont-medium"
                                            >{{ item.title }}</span
                                        >
                                    </td>
                                    <td
                                        class="px-4 py-3 text-[var(--neutral-color-30)] text-[20px] mont-medium"
                                    >
                                        €{{ item.price }}
                                    </td>
                                    <td class="pt-4 py-3">
                                        <div
                                            class="flex items-center border border-gray-300 rounded-[32px] max-w-fit px-3 py-2"
                                        >
                                            <button
                                                @click="decreaseQuantity(item.id)"
                                                class="py-1 px-2 text-black text-[26px] mont-medium cursor-pointer rounded-[50%] bg-[#F7F7F7] hover:bg-[#d9d9d9] transition w-[48px] h-[48px] flex items-center justify-center"
                                            >
                                                −
                                            </button>
                                            <span
                                                class="mx-2 pr-3 pl-3 quantity text-[var(--neutral-color-30)] text-[22px] mont-medium"
                                                >{{ item.quantity }}</span
                                            >
                                            <button
                                                @click="increaseQuantity(item.id)"
                                                class="py-1 px-3 text-black text-[26px] mont-medium cursor-pointer rounded-[50%] bg-[#F7F7F7] hover:bg-[#d9d9d9] transition w-[48px] h-[48px] flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td
                                        class="px-4 py-3 text-[var(--neutral-color-30)] text-[20px] mont-medium"
                                    >
                                        €{{ (item.price * item.quantity).toFixed(2) }}
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <button
                                            @click="removeItem(item.id)"
                                            class="cursor-pointer focus:outline-none close-btn"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34"
                                                height="34"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <g clip-path="url(#clip0_109_1076)">
                                                    <path
                                                        d="M12.0001 23C18.0748 23 23.0001 18.0748 23.0001 12C23.0001 5.92525 18.0748 1 12.0001 1C5.92531 1 1.00006 5.92525 1.00006 12C1.00006 18.0748 5.92531 23 12.0001 23Z"
                                                        stroke="#9B9B9B"
                                                        stroke-miterlimit="10"
                                                    />
                                                    <path
                                                        d="M16.0001 8L8.00006 16"
                                                        stroke="#9B9B9B"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M16.0001 16L8.00006 8"
                                                        stroke="#9B9B9B"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_109_1076">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div
                    class="w-1/4 rounded-[16px] bg-[var(--neutral-color-20)] flex flex-col pt-[48px] pb-[48px] pr-[40px] pl-[40px]"
                >
                    <h2 class="mont-medium text-[48px] text-[var(--neutral-color-30)] mb-[32px]">
                        Всего
                    </h2>

                    <div class="flex flex-col gap-[8px] mb-[32px]">
                        <div class="flex justify-between">
                            <p class="text-[22px] mont-medium text-[var(--neutral-color-30)]">
                                Итого:
                            </p>
                            <p class="text-[22px] mont-medium text-[var(--neutral-color-30)]">
                                €{{ cartStore.subtotal.toFixed(2) }}
                            </p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-[22px] mont-medium text-[var(--neutral-color-30)]">
                                Доставка:
                            </p>
                            <p class="text-[22px] mont-medium text-[var(--neutral-color-30)]">
                                €{{ cartStore.deliveryCost }}
                            </p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-[22px] mont-medium text-[var(--neutral-color-30)]">
                                Общая стоимость:
                            </p>
                            <p class="text-[22px] mont-medium text-[var(--neutral-color-30)]">
                                €{{ cartStore.totalPrice.toFixed(2) }}
                            </p>
                        </div>
                    </div>

                    <button
                        @click="checkout"
                        :disabled="cartStore.isEmpty || isCheckingOut"
                        class="flex justify-center items-center border-1 border-[#FF921C] bg-[#FF921C] text-white mont-medium text-[18px] rounded-[200px] pt-4 pb-4 pr-8 pl-8 transform hover:-translate-y-1 hover:shadow-[0_0_15px_5px_rgba(255,146,28,0.5)] transition-all duration-200 cursor-pointer"
                    >
                        {{ isCheckingOut ? 'Оформление...' : 'Оформить заказ' }}
                    </button>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const isCheckingOut = ref(false)

const increaseQuantity = (productId) => {
    const item = cartStore.items.find((item) => item.id === productId)
    cartStore.updateQuantity(productId, item.quantity + 1)
}

const decreaseQuantity = (productId) => {
    const item = cartStore.items.find((item) => item.id === productId)
    cartStore.updateQuantity(productId, item.quantity - 1)
}

const removeItem = (productId) => {
    cartStore.removeFromCart(productId)
}

const checkout = async () => {
    if (cartStore.isEmpty) return

    isCheckingOut.value = true

    try {
        // Подготовка данных для отправки
        const orderData = {
            items: cartStore.items.map((item) => ({
                productId: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                type: item.type,
            })),
            subtotal: cartStore.subtotal,
            delivery: cartStore.deliveryCost,
            total: cartStore.totalPrice,
            timestamp: new Date().toISOString(),
        }

        // Отправка данных на API
        const response = await fetch('https://5220dc4fa3a59570.mokky.dev/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })

        if (response.ok) {
            // Очистка корзины после успешного оформления
            cartStore.clearCart()

            // Переход на страницу подтверждения
            router.push('/order-success')
        } else {
            throw new Error('Ошибка при оформлении заказа')
        }
    } catch (error) {
        console.error('Ошибка:', error)
        alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.')
    } finally {
        isCheckingOut.value = false
    }
}
</script>

<style></style>
