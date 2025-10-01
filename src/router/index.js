import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Catalog from '@/views/Catalog.vue'
import Product from '@/views/Product.vue'
import Cart from '@/views/Cart.vue'
import Success from '@/views/Success.vue'
import AboutUs from '@/views/AboutUs.vue'
import NotFound from '@/views/NotFound.vue'
import Contact from '@/views/Contact.vue'
import ProfileView from '@/views/ProfileView.vue'

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
        {
            path: '/profile',
            component: ProfileView,
            meta: { requiresAuth: true },
        },
        {
            path: '/order-success/:id',
            name: 'order-success',
            component: () => import('@/views/OrderSuccessView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/order/:id',
            name: 'order-details',
            component: () => import('@/views/OrderDetailsView.vue'),
            meta: { requiresAuth: true },
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
