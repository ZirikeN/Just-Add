import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Catalog from '@/views/Catalog.vue'
import Product from '@/views/Product.vue'
import Cart from '@/views/Cart.vue'
import Success from '@/views/Success.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/catalog',
      component: Catalog,
    },
    {
      path: '/product/:id',
      component: Product,
    },
    {
      path: '/cart',
      component: Cart,
    },
    {
      path: '/order-success',
      component: Success,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
