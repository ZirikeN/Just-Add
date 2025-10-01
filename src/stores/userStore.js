import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const userProfile = ref(null)
    const isLoading = ref(false)
    const appLoading = ref(true)

    const isAuthenticated = computed(() => !!user.value)
    const favorites = computed(() => userProfile.value?.favorites || [])
    const orders = computed(() => userProfile.value?.orders || [])

    const register = async ({ email, password, name }) => {
        isLoading.value = true

        try {
            console.log('Starting registration for:', email)

            // Создаю пользователя в Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const newUser = userCredential.user
            console.log('Firebase user created:', newUser.uid)

            // Создаю профиль пользователя в Firestore
            await setDoc(doc(db, 'users', newUser.uid), {
                uid: newUser.uid,
                email: newUser.email,
                name: name,
                favorites: [],
                orders: [],
                createdAt: new Date().toISOString(),
            })

            console.log('Firestore profile created')

            // Загружаю профиль пользователя
            await fetchUserProfile(newUser.uid)

            return { success: true }
        } catch (error) {
            console.error('Ошибка при регистрации:', error)
            return { success: false, error: error.message }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Вход пользователя
     */
    const login = async ({ email, password }) => {
        isLoading.value = true
        try {
            console.log('Attempting login for:', email)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log('Login successful, fetching profile...')
            await fetchUserProfile(userCredential.user.uid)
            return { success: true }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, error: error.message }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Выход пользователя
     */
    const logout = async () => {
        try {
            await signOut(auth)
            user.value = null
            userProfile.value = null
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    /**
     * Загрузка профиля пользователя из Firestore
     */
    const fetchUserProfile = async (uid) => {
        try {
            console.log('Fetching profile for UID:', uid)
            const userDoc = await getDoc(doc(db, 'users', uid))
            if (userDoc.exists()) {
                userProfile.value = userDoc.data()
                console.log('Profile loaded:', userProfile.value)
            } else {
                console.warn('Profile not found for UID:', uid)
            }
        } catch (error) {
            console.error('Error fetching user profile:', error)
        }
    }

    /**
     * Проверка находится ли товар в избранном
     */
    const isInFavorites = (productId) => {
        const result = favorites.value.some((fav) => fav.id === productId)
        return result
    }

    /**
     * Переключение состояния избранного
     */
    const toggleFavorite = async (product) => {
        if (!user.value) {
            console.warn('Need authentication for favorites')
            return
        }

        console.log('Toggling favorite for product:', product.id)
        console.log('Current favorites:', favorites.value)

        try {
            if (isInFavorites(product.id)) {
                console.log('Removing from favorites')
                await removeFromFavorites(product.id)
            } else {
                console.log('Adding to favorites')
                await addToFavorites(product)
            }
        } catch (error) {
            console.error('Error in toggleFavorite:', error)
            throw error
        }
    }

    /**
     * Добавление товара в избранное
     */
    const addToFavorites = async (product) => {
        if (!user.value) {
            console.warn('User not authenticated')
            return
        }

        try {
            console.log('Adding to favorites:', product)

            // ИСПРАВЛЕНО: используем product.URL вместо imageUrl
            await updateDoc(doc(db, 'users', user.value.uid), {
                favorites: arrayUnion({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    imageUrl: product.URL,
                    description: product.description,
                    addedAt: new Date().toISOString(),
                }),
            })

            console.log('Successfully added to favorites in Firestore')

            // Обновляем локальный state
            await fetchUserProfile(user.value.uid)
            console.log('Local state updated')
        } catch (error) {
            console.error('Error adding to favorites:', error)
            throw error
        }
    }

    /**
     * Удаление товара из избранного
     */
    const removeFromFavorites = async (productId) => {
        if (!user.value) return

        try {
            console.log('Removing from favorites:', productId)

            // Находим товар который нужно удалить
            const favoriteToRemove = favorites.value.find((fav) => fav.id === productId)

            if (favoriteToRemove) {
                await updateDoc(doc(db, 'users', user.value.uid), {
                    favorites: arrayRemove(favoriteToRemove),
                })

                await fetchUserProfile(user.value.uid)
                console.log('Successfully removed from favorites')
            } else {
                console.warn('Favorite not found for removal:', productId)
            }
        } catch (error) {
            console.error('Error removing from favorites:', error)
            throw error
        }
    }

    /**
     * Добавление заказа в историю
     */
    const addOrder = async (orderData) => {
        if (!user.value) {
            throw new Error('User not authenticated')
        }

        try {
            const orderId = Date.now().toString() + Math.random().toString(36).substr(2, 9)

            const order = {
                id: orderId,
                items: orderData.items,
                subtotal: orderData.subtotal,
                delivery: orderData.delivery,
                total: orderData.total,
                status: 'pending',
                createdAt: new Date().toISOString(),
                address: orderData.address,
                phone: orderData.phone,
                customerName: orderData.customerName,
                customerEmail: orderData.customerEmail,
                // Дополнительные поля для отслеживания
                orderNumber: `ORD-${orderId.slice(-6).toUpperCase()}`,
                estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // +7 дней
            }

            console.log('Creating order in Firestore:', order)

            await updateDoc(doc(db, 'users', user.value.uid), {
                orders: arrayUnion(order),
            })

            console.log('Order successfully added to Firestore')

            // Обновляем локальный state
            await fetchUserProfile(user.value.uid)

            return order
        } catch (error) {
            console.error('Error adding order:', error)
            throw error
        }
    }

    /**
     * Получение заказа по ID
     */
    const getOrderById = (orderId) => {
        return orders.value.find((order) => order.id === orderId)
    }

    /**
     * Инициализация слушателя изменения состояния аутентификации
     */
    const initAuthListener = () => {
        console.log('Initializing auth listener...')

        // Сбрасываем состояние загрузки приложения через 3 секунды на всякий случай
        const loadingTimeout = setTimeout(() => {
            if (appLoading.value) {
                console.warn('Auth listener timeout - forcing app ready')
                appLoading.value = false
            }
        }, 3000)

        onAuthStateChanged(auth, async (firebaseUser) => {
            console.log('Auth state changed:', firebaseUser ? firebaseUser.uid : 'null')

            user.value = firebaseUser
            if (firebaseUser) {
                console.log('User logged in, fetching profile...')
                await fetchUserProfile(firebaseUser.uid)
            } else {
                console.log('User logged out')
                userProfile.value = null
            }

            // Загрузка приложения завершена
            appLoading.value = false
            clearTimeout(loadingTimeout)
            console.log('App loading completed')
        })
    }

    /**
     * Обновление профиля пользователя
     */
    const updateProfile = async (profileData) => {
        if (!user.value) {
            throw new Error('User not authenticated')
        }

        try {
            console.log('Updating profile for user:', user.value.uid)
            console.log('New profile data:', profileData)

            // Обновляем документ в Firestore
            await updateDoc(doc(db, 'users', user.value.uid), {
                name: profileData.name,
                updatedAt: new Date().toISOString(),
            })

            // Обновляем локальный state
            await fetchUserProfile(user.value.uid)

            return { success: true }
        } catch (error) {
            console.error('Error updating profile:', error)
            return { success: false, error: error.message }
        }
    }

    // Добавьте геттер для состояния загрузки приложения
    const isAppLoading = computed(() => appLoading.value)

    return {
        // State
        user,
        userProfile,
        isLoading,
        appLoading,
        isAppLoading,

        // Getters
        isAuthenticated,
        favorites,
        orders,
        getOrderById,

        // Actions
        register,
        login,
        logout,
        addToFavorites,
        removeFromFavorites,
        addOrder,
        isInFavorites,
        toggleFavorite,
        initAuthListener,
        updateProfile,
    }
})
