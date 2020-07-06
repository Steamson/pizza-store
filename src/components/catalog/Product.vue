<template>
    <div class="product">
        <b-card
            tag="div"
            bg-variant="dark"
            :header="params.name"
            class="text-center my-3"
            text-variant="white"
            img-top
            :img-src="'https://pizzastore-e062.restdb.io/media/' + params.image[0] + '?s=w'"
        >
            <b-card-text>{{params.description}}</b-card-text>
            <b-card-title>Price: {{params['price_' + currency.toLowerCase()].toFixed(2)}}{{symbol}}</b-card-title>
            <b-button href="#" variant="primary" @click="addToCart">Add to cart</b-button>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: 'Product',
        props: {
            symbol: {
                type: String,
                default: ''
            },
            currency:  {
                type: String,
                default: ''
            },
            params: {
                type: Object,
                default() { return {} }
            },
        },
        mounted () {
            this.$set(this.params, 'quantity', 1);
        },
        methods: {
            addToCart() {
                this.$emit('addToCart', this.params)
            },
        },
        computed: {
            
        },
    }
</script>

<style lang="scss" scoped>
    .product {

    }
</style>