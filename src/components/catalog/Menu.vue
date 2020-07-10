<template>
    <div class="catalog">
        <h1 class="mb-3">Online Food Delivery </h1>

        <b-row>
            <div class="col-12 col-sm-6 col-md-4 d-flex justify-content-center" v-for="product in ProductsGet" :key="product.id">
                <Product
                    :params="product"
                    :currency="MainCurrencyGet"
                    :symbol="MainCurrencySymbolGet"
                    @addToCart="addToCart"
                />
            </div>
        </b-row>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    
    import Product from './Product';

    export default {
        name: 'Menu',
        components: {
            Product,
        },
        mounted() {
            this.PreloaderShow(true)
            this.GetProductsFromApi().then((result) => {
                this.PreloaderShow(false)
            }).catch((error) => {
                console.log(error)
            });
        },
        computed: {
            ...mapGetters(['ProductsGet', 'CartGet', 'MainCurrencyGet', 'MainCurrencySymbolGet']),
        },
        methods: {
            ...mapActions(['GetProductsFromApi', 'AddNewItemToCart', 'PreloaderShow']),

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