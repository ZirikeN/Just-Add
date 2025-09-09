import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null) 
    const url = 'https://5220dc4fa3a59570.mokky.dev/products'

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

    return { products, loading, error, getProducts }
})