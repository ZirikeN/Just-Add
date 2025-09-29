import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Catalog from '@/views/Catalog.vue'
import Product from '@/views/Product.vue'
import Cart from '@/views/Cart.vue'
import Success from '@/views/Success.vue'
import AboutUs from '@/views/AboutUs.vue'
import NotFound from '@/views/NotFound.vue'
import Contact from '@/views/Contact.vue'

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
        {
            path: '/about-us',
            component: AboutUs,
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound,
        },
        {
            path: '/contact',
            component: Contact,
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
