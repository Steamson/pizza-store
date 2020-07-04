<template>
    <div class="catalog">
        <router-link :to="{name: 'cart', params: {cart_data: CartGet}}">
            <div class="cart_info">Products in cart: {{CartGet.length}}</div>
        </router-link>

        <h1 class="mb-3">Menu</h1>

        <b-row>
            <div class="col-12 col-sm-6 col-md-4" v-for="product in ProductsGet" :key="product.id">
                <Product :params="product" v-on:addToCart="addToCart"/>
            </div>
        </b-row>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Product from './Product'

    export default {
        name: 'Menu',
        data() {
            return {
                
            }
        },
        components: {
            Product,
        },
        mounted() {
            this.GetProductsFromApi()
        },
        computed: {
            ...mapGetters(['ProductsGet', 'CartGet']),
        },
        methods: {
            ...mapActions(['GetProductsFromApi', 'AddNewItemToCart']),

            addToCart(data) {
                this.AddNewItemToCart(data)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .catalog {
        .cart_info {
            position: absolute;
            right: 20px;
            top: 20px;
        }
    }
</style>