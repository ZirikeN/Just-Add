<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow py-8">
            <div class="max-w-4xl mx-auto px-4 mont-medium">
                <div class="mb-6">
                    <router-link
                        to="/profile"
                        class="text-orange-500 hover:text-orange-600 flex items-center gap-2"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            ></path>
                        </svg>
                        Назад к заказам
                    </router-link>
                </div>

                <div v-if="!order" class="text-center py-12">
                    <p class="text-xl text-gray-600">Заказ не найден</p>
                </div>

                <div v-else class="bg-white rounded-[20px] shadow-lg overflow-hidden">
                    <!-- Заголовок заказа -->
                    <div class="bg-[#FF921C] text-white p-6">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 class="text-2xl mb-2 font-semibold">
                                    Заказ {{ order.orderNumber }}
                                </h1>
                                <p class="text-[16px] font-medium">
                                    Создан: {{ formatDate(order.createdAt) }}
                                </p>
                            </div>
                            <div class="mt-4 md:mt-0 text-right">
                                <span
                                    :class="[
                                        'px-3 py-1 rounded-full text-sm font-medium',
                                        statusClasses[order.status],
                                    ]"
                                >
                                    {{ getStatusText(order.status) }}
                                </span>
                                <p class="text-2xl font-bold mt-2">€{{ order.total.toFixed(2) }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Информация о заказе -->
                    <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Информация о доставке -->
                        <div>
                            <h3 class="text-lg font-semibold mb-4">Информация о доставке</h3>
                            <div class="space-y-2 text-gray-600">
                                <p><strong>Получатель:</strong> {{ order.customerName }}</p>
                                <p><strong>Email:</strong> {{ order.customerEmail }}</p>
                                <p><strong>Телефон:</strong> {{ order.phone }}</p>
                                <p><strong>Адрес:</strong> {{ order.address }}</p>
                                <p>
                                    <strong>Ориентировочная доставка:</strong>
                                    {{ formatDate(order.estimatedDelivery) }}
                                </p>
                            </div>
                        </div>

                        <!-- Детали заказа -->
                        <div>
                            <h3 class="text-lg font-semibold mb-4">Детали заказа</h3>
                            <div class="space-y-2 text-gray-600">
                                <div class="flex justify-between">
                                    <span>Товары:</span>
                                    <span>€{{ order.subtotal.toFixed(2) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Доставка:</span>
                                    <span>€{{ order.delivery.toFixed(2) }}</span>
                                </div>
                                <div
                                    class="flex justify-between border-t pt-2 font-semibold text-gray-800"
                                >
                                    <span>Итого:</span>
                                    <span>€{{ order.total.toFixed(2) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Список товаров -->
                    <div class="p-6 border-t">
                        <h3 class="text-lg font-semibold mb-4">Товары в заказе</h3>
                        <div class="space-y-4">
                            <div
                                v-for="item in order.items"
                                :key="item.id"
                                class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                            >
                                <img
                                    :src="getImageUrl(item.imageUrl)"
                                    :alt="item.title"
                                    class="w-16 h-16 object-cover rounded"
                                />
                                <div class="flex-grow">
                                    <h4 class="font-medium text-gray-800">{{ item.title }}</h4>
                                    <p class="text-sm text-gray-600">{{ item.description }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold">€{{ item.price }}</p>
                                    <p class="text-sm text-gray-600">
                                        Количество: {{ item.quantity }}
                                    </p>
                                    <p class="font-medium">
                                        €{{ (item.price * item.quantity).toFixed(2) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- История статусов -->
                    <div class="p-6 border-t bg-gray-50">
                        <h3 class="text-lg font-semibold mb-4">История заказа</h3>
                        <div class="space-y-2">
                            <div class="flex items-center gap-3">
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span class="text-sm"
                                    >Заказ создан - {{ formatDateTime(order.createdAt) }}</span
                                >
                            </div>
                            <div v-if="order.status !== 'pending'" class="flex items-center gap-3">
                                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span class="text-sm">Заказ подтвержден</span>
                            </div>
                        </div>
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()

const orderId = route.params.id

const order = computed(() => {
    return userStore.getOrderById(orderId)
})

const getImageUrl = (filename) => {
    return new URL(`/src/assets/img/${filename}`, import.meta.url).href
}

const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

const getStatusText = (status) => {
    const statusMap = {
        pending: 'В обработке',
        confirmed: 'Подтвержден',
        shipped: 'Отправлен',
        delivered: 'Доставлен',
        cancelled: 'Отменен',
    }
    return statusMap[status] || status
}
</script>
