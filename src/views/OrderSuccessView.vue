<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow flex items-center justify-center py-12">
            <div class="max-w-2xl mx-auto text-center px-4">
                <div class="bg-white rounded-[20px] p-8 shadow-lg">
                    <!-- Иконка успеха -->
                    <div
                        class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <svg
                            class="w-10 h-10 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    </div>

                    <h1 class="text-3xl font-bold text-gray-800 mb-4">Заказ успешно оформлен!</h1>

                    <div v-if="order" class="mb-6">
                        <p class="text-lg text-gray-600 mb-2">
                            Номер вашего заказа:
                            <span class="font-semibold text-orange-500">{{
                                order.orderNumber
                            }}</span>
                        </p>
                        <p class="text-gray-600 mb-4">
                            Мы отправили подтверждение на email: {{ order.customerEmail }}
                        </p>

                        <div class="bg-gray-50 rounded-lg p-4 mb-4">
                            <h3 class="font-semibold text-lg mb-2">Детали заказа:</h3>
                            <p class="text-gray-700">
                                Статус:
                                <span class="font-medium capitalize">{{
                                    getStatusText(order.status)
                                }}</span>
                            </p>
                            <p class="text-gray-700">
                                Общая сумма:
                                <span class="font-medium">€{{ order.total.toFixed(2) }}</span>
                            </p>
                            <p class="text-gray-700">
                                Адрес доставки: <span class="font-medium">{{ order.address }}</span>
                            </p>
                            <p class="text-gray-700">
                                Ориентировочная дата доставки:
                                <span class="font-medium">{{
                                    formatDate(order.estimatedDelivery)
                                }}</span>
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <router-link
                            to="/profile?tab=orders"
                            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            Перейти к моим заказам
                        </router-link>
                        <router-link
                            to="/catalog"
                            class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors"
                        >
                            Продолжить покупки
                        </router-link>
                    </div>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()

const orderId = route.params.id

const order = computed(() => {
    return userStore.getOrderById(orderId)
})

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const getStatusText = (status) => {
    const statusMap = {
        pending: 'в обработке',
        confirmed: 'подтвержден',
        shipped: 'отправлен',
        delivered: 'доставлен',
        cancelled: 'отменен',
    }
    return statusMap[status] || status
}

onMounted(() => {
    if (!order.value) {
        console.warn('Order not found:', orderId)
    }
})
</script>
