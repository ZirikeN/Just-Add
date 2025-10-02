<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow">
            <div
                class="flex flex-col mr-4 ml-4 rounded-[16px] bg-[var(--neutral-color-20)] pl-[48px] pr-[48px] pt-[64px] pb-4"
            >
                <!-- Заголовок -->
                <div class="mb-8">
                    <h1 class="text-[48px] mont-semibold text-[var(--neutral-color-30)]">
                        Личный кабинет
                    </h1>
                    <p class="text-[var(--neutral-color-30)] mt-2 text-[22px] mont-medium">
                        Управление вашими данными, заказами и избранным
                    </p>
                </div>

                <!-- Информация о пользователе -->
                <div class="border-[#FF921C] rounded-[16px] border-3 p-6 mb-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-[32px] mont-semibold text-[var(--neutral-color-30)]">
                                {{ userProfile?.name || 'Пользователь' }}
                            </h2>
                            <p class="text-[22px] mont-medium text-[var(--neutral-color-30)]">
                                {{ userProfile?.email }}
                            </p>
                            <p class="text-[22px] mont-medium text-[var(--neutral-color-30)] mt-1">
                                Зарегистрирован: {{ formatDate(userProfile?.createdAt) }}
                            </p>
                        </div>
                        <button
                            @click="handleLogout"
                            class="border-3 border-transparent flex items-center gap-2 text-[22px] mont-medium text-[#fb2c36] hover:border-[rgba(251,44,54,0.5)] transform hover:shadow-[0_0_15px_5px_rgba(251,44,54,0.5)] transition-all duration-200 px-4 py-2 rounded-lg transition-colors"
                        >
                            <img src="@/assets/img/logout.svg" alt="logout" />
                            Выход
                        </button>
                    </div>
                </div>

                <!-- Навигация по разделам -->
                <div class="flex space-x-4 py-2 px-4 rounded-[16px] mb-4 border-2 border-[#FF921C]">
                    <button
                        v-for="tab in tabs"
                        :key="tab.id"
                        @click="activeTab = tab.id"
                        :class="[
                            'px-4 py-2 mont-medium text-[22px] transition-colors border-b-2',
                            activeTab === tab.id
                                ? 'border-[#FF921C] text-[#FF921C]'
                                : 'border-transparent hover:text-[#FF921C] text-[var(--neutral-color-30)]',
                        ]"
                    >
                        {{ tab.label }}
                    </button>
                </div>

                <!-- Содержимое активного раздела -->
                <div class="rounded-[16px] border-[#FF921C] border-3 shadow-md p-6">
                    <!-- Избранное -->
                    <div v-if="activeTab === 'favorites'">
                        <h3 class="text-[32px] text-[var(--neutral-color-30)] mont-semibold mb-4">
                            Избранные товары
                        </h3>

                        <div v-if="favorites.length === 0" class="text-center py-8">
                            <div class="text-gray-400 mb-4">
                                <svg
                                    class="w-16 h-16 mx-auto"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                                    />
                                </svg>
                            </div>
                            <p class="text-[var(--neutral-color-30)] text-[22px] mont-medium mb-4">
                                В избранном пока ничего нет
                            </p>
                            <router-link
                                to="/catalog"
                                class="bg-orange-500 hover:bg-orange-600 text-white text-[22px] mont-medium px-6 py-3 rounded-lg transition-colors inline-block"
                            >
                                Перейти к товарам
                            </router-link>
                        </div>

                        <div v-else v-auto-animate class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div
                                v-for="product in favorites"
                                :key="product.id"
                                class="border-3 rounded-[20px] p-4 border-[#FF921C] relative"
                            >
                                <img
                                    :src="getImageUrl(product.imageUrl)"
                                    :alt="product.title"
                                    class="w-[380px] h-[345px] m-auto object-cover"
                                />
                                <div class="flex items-center justify-between mt-3">
                                    <router-link :to="`/product/${product.id}`" class="flex-grow">
                                        <h4
                                            class="mont-semibold text-[24px] text-[var(--neutral-color-30)] mb-1 line-clamp-2"
                                        >
                                            {{ product.title }}
                                        </h4>
                                        <p
                                            class="text-[var(--neutral-color-30)] mont-regular text-[16px] mb-2 text-sm line-clamp-2"
                                        >
                                            {{ product.description }}
                                        </p>
                                    </router-link>
                                    <p class="text-[#FF921C] mont-medium text-[28px] ml-4">
                                        {{ product.price }}€
                                    </p>
                                </div>
                                <div class="flex space-x-2">
                                    <button
                                        @click="removeFromFavorites(product.id)"
                                        class="bg-gray-200 hover:bg-gray-300 p-2 rounded-[50%] transition-colors absolute top-6 right-6"
                                        title="Удалить из избранного"
                                    >
                                        <svg
                                            class="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Заказы -->
                    <div v-if="activeTab === 'orders'">
                        <h3 class="text-[32px] text-[var(--neutral-color-30)] mont-semibold mb-4">
                            История заказов
                        </h3>

                        <div v-if="orders.length === 0" class="text-center py-8">
                            <p class="text-[var(--neutral-color-30)] mont-medium text-[22px]">
                                У вас еще нет заказов
                            </p>
                            <router-link
                                to="/catalog"
                                class="text-[#FF921C] hover:text-orange-600 text-[22px] mont-medium mt-2 inline-block"
                            >
                                Сделать первый заказ
                            </router-link>
                        </div>

                        <div v-else class="space-y-4">
                            <div
                                v-for="order in sortedOrders"
                                :key="order.id"
                                class="border-3 rounded-[16px] border-[#FF921C] p-4"
                            >
                                <div class="flex justify-between items-start mb-3">
                                    <div>
                                        <p
                                            class="mont-semibold text-[24px] text-[var(--neutral-color-30)] mb-1"
                                        >
                                            Заказ #{{ order.orderNumber || order.id.slice(-6) }}
                                        </p>
                                        <p
                                            class="mont-medium text-[16px] text-[var(--neutral-color-30)] mb-1"
                                        >
                                            {{ formatDate(order.createdAt) }}
                                        </p>
                                        <router-link
                                            :to="`/order/${order.id}`"
                                            class="text-[#FF921C] hover:text-orange-600 text-[20px] mont-medium"
                                        >
                                            Подробнее
                                        </router-link>
                                    </div>
                                    <div class="text-right">
                                        <p
                                            class="mont-semibold text-[24px] text-[var(--neutral-color-30)] mb-3"
                                        >
                                            {{ order.total }} €
                                        </p>
                                        <span
                                            :class="[
                                                'px-2 py-1 rounded-full text-xs font-medium',
                                                order.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.status === 'pending'
                                                      ? 'bg-yellow-100 text-yellow-800'
                                                      : 'bg-blue-100 text-blue-800',
                                            ]"
                                        >
                                            {{ getStatusText(order.status) }}
                                        </span>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <p
                                        class="text-[16px] mont-medium text-[var(--neutral-color-30)]"
                                    >
                                        Адрес: {{ order.address }}, Телефон: {{ order.phone }}
                                    </p>
                                </div>

                                <div class="border-t-2 border-[#FF921C] pt-3">
                                    <p
                                        class="mont-medium mb-2 text-[var(--neutral-color-30)] text-[20px]"
                                    >
                                        Товары:
                                    </p>
                                    <div class="space-y-2">
                                        <div
                                            v-for="item in order.items"
                                            :key="item.id"
                                            class="flex justify-between text-sm"
                                        >
                                            <span
                                                class="text-[var(--neutral-color-30)] mont-medium text-[22px]"
                                                >{{ item.title }} × {{ item.quantity }}</span
                                            >
                                            <span
                                                class="text-[var(--neutral-color-30)] mont-medium text-[22px]"
                                                >{{
                                                    (item.price * item.quantity).toFixed(2)
                                                }}
                                                €</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Личные данные -->
                    <div v-if="activeTab === 'profile'">
                        <h3 class="text-[32px] text-[var(--neutral-color-30)] mont-semibold mb-4">
                            Личные данные
                        </h3>

                        <div class="max-w-md space-y-6">
                            <!-- Уведомление об успешном сохранении -->
                            <div
                                v-if="updateMessage"
                                :class="[
                                    'p-3 rounded-md text-center font-medium',
                                    updateMessage.type === 'success'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800',
                                ]"
                            >
                                {{ updateMessage.text }}
                            </div>

                            <div>
                                <label
                                    class="block text-[18px] mont-medium text-[var(--neutral-color-30)] mb-2"
                                    >Имя</label
                                >
                                <input
                                    type="text"
                                    v-model="profileForm.name"
                                    :disabled="isUpdating"
                                    class="w-full px-4 py-3 mont-medium text-[20px] text-[var(--neutral-color-30)] border-2 border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#FF921C] focus:border-[#FF921C] transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Введите ваше имя"
                                />
                                <p class="text-sm text-gray-500 mt-1">Минимум 2 символа</p>
                            </div>

                            <div>
                                <label
                                    class="block text-[18px] mont-medium text-[var(--neutral-color-30)] mb-2"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    :value="userProfile?.email"
                                    disabled
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-[12px] text-gray-500 mont-medium text-[20px] bg-gray-100 cursor-not-allowed"
                                />
                                <p class="text-sm text-gray-500 mt-1">Email нельзя изменить</p>
                            </div>

                            <div class="bg-gray-50 p-4 rounded-[12px]">
                                <h4 class="text-[16px] mont-semibold text-gray-700 mb-2">
                                    Информация об аккаунте
                                </h4>
                                <div class="space-y-1 text-sm text-gray-600">
                                    <p>
                                        ID пользователя: {{ userStore.user?.uid?.slice(0, 8) }}...
                                    </p>
                                    <p>Заказов: {{ orders.length }}</p>
                                    <p>Избранных товаров: {{ favorites.length }}</p>
                                    <p v-if="userProfile?.updatedAt">
                                        Последнее обновление:
                                        {{ formatDate(userProfile.updatedAt) }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex gap-3">
                                <button
                                    @click="updateProfile"
                                    :disabled="!isProfileChanged || isUpdating || !isNameValid"
                                    class="bg-[#FF921C] hover:bg-orange-600 disabled:bg-gray-400 text-white mont-medium text-[20px] px-6 py-3 rounded-[12px] transition-colors flex items-center gap-2 min-w-[200px] justify-center"
                                >
                                    <svg
                                        v-if="isUpdating"
                                        class="animate-spin h-5 w-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        ></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span>{{
                                        isUpdating ? 'Сохранение...' : 'Сохранить изменения'
                                    }}</span>
                                </button>

                                <button
                                    @click="resetForm"
                                    :disabled="!isProfileChanged || isUpdating"
                                    class="border-2 border-gray-300 hover:border-gray-400 text-[var(--neutral-color-30)] mont-medium text-[20px] px-6 py-3 rounded-[12px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Отмена
                                </button>
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

import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

// Состояние
const activeTab = ref('favorites')
const isUpdating = ref(false)
const updateMessage = ref(null)

const profileForm = reactive({
    name: '',
})

// Табы навигации
const tabs = [
    { id: 'favorites', label: 'Избранное' },
    { id: 'orders', label: 'Мои заказы' },
    { id: 'profile', label: 'Личные данные' },
]

// Computed свойства
const userProfile = computed(() => userStore.userProfile)
const favorites = computed(() => userStore.favorites)
const orders = computed(() => userStore.orders)

const getImageUrl = (filename) => {
    return new URL(`/src/assets/img/${filename}`, import.meta.url).href
}

const sortedOrders = computed(() => {
    return [...orders.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const isProfileChanged = computed(() => {
    return profileForm.name !== userProfile.value?.name && profileForm.name.trim() !== ''
})

const isNameValid = computed(() => {
    return profileForm.name.trim().length >= 2
})

// Методы
const handleLogout = async () => {
    await userStore.logout()
    cartStore.clearCart()
    router.push('/')
}

const removeFromFavorites = (productId) => {
    userStore.removeFromFavorites(productId)
}

const showMessage = (text, type = 'success') => {
    updateMessage.value = { text, type }
    setTimeout(() => {
        updateMessage.value = null
    }, 3000)
}

const updateProfile = async () => {
    if (!isProfileChanged.value || !isNameValid.value) return

    isUpdating.value = true
    updateMessage.value = null

    try {
        const result = await userStore.updateProfile({
            name: profileForm.name.trim(),
        })

        if (result.success) {
            showMessage('Профиль успешно обновлен!', 'success')
        } else {
            showMessage(result.error || 'Ошибка при обновлении профиля', 'error')
        }
    } catch (error) {
        console.error('Error updating profile:', error)
        showMessage('Произошла ошибка при сохранении', 'error')
    } finally {
        isUpdating.value = false
    }
}

const resetForm = () => {
    if (userStore.userProfile) {
        profileForm.name = userStore.userProfile.name
    }
    updateMessage.value = null
}

const formatDate = (dateString) => {
    if (!dateString) return 'Не указано'
    return new Date(dateString).toLocaleDateString('ru-RU', {
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
        completed: 'Завершен',
        shipped: 'Отправлен',
        confirmed: 'Подтвержден',
        cancelled: 'Отменен',
    }
    return statusMap[status] || status
}

// Инициализация
onMounted(() => {
    if (!userStore.isAuthenticated) {
        router.push('/')
        return
    }

    // Заполняем форму профиля
    resetForm()
})

// Следим за изменениями профиля и обновляем форму
watch(
    userProfile,
    (newProfile) => {
        if (newProfile) {
            profileForm.name = newProfile.name || ''
        }
    },
    { deep: true }
)
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Стили для плавной анимации */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
