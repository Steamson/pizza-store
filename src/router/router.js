import Vue from 'vue';
import VueRouter from 'vue-router'

import Cart from '../components/cart/Cart';
import Menu from '../components/catalog/Menu';

Vue.use(VueRouter)

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Menu,
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            props: true,
        },
        // {
        //     path: '*',
        //     component: NotFoundView
        // }
    ]
})

export default router