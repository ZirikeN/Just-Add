import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)
    const url = 'https://5220dc4fa3a59570.mokky.dev/products'
    const activeFilter = ref('all')
    const sortBy = ref('default')

    //Получение с API
    const getProducts = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await axios.get(url)
            products.value = response.data
        } catch (err) {
            error.value = err.message || 'Ошибка при загрузке данных'
            console.error('Ошибка:', err)
        } finally {
            loading.value = false
        }
    }

    //Активный таб
    const filteredProducts = computed(() => {
        let filtered = products.value

        if (activeFilter.value !== 'all') {
            filtered = filtered.filter((product) => product.type === activeFilter.value)
        }
        
        switch (sortBy.value) {
            case 'price_asc':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'price_desc':
                filtered.sort((a, b) => b.price - a.price)
                break
            case 'default':
                filtered.sort((a, b) => a.id - b.id)
                break
            default:
                break
        }

        return filtered
    })

    const setFilter = (filterType) => {
        activeFilter.value = filterType
    }

    const setSort = (sortType) => {
        sortBy.value = sortType
    }

    return { products, loading, error, getProducts, filteredProducts, setFilter, activeFilter, sortBy, setSort }
})
