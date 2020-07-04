<template>
    <div class="product">
        <b-card tag="div" bg-variant="dark" :header="params.name" class="text-center my-3" text-variant="white">
            <!-- <b-card-title>{{params.article}}</b-card-title> -->
            <b-card-text>Price: {{params.price.toFixed(2)}}</b-card-text>
            <b-button href="#" variant="primary" @click="addToCart">Add to cart</b-button>
        </b-card>
    </div>
</template>

<script>
// If I want to add Image from assets I need to use:
// :src=" require('../assets/images/' + params.image) "

    export default {
        name: 'Product',
        props: {
            params: {
                type: Object,
                default() {return {}}
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
    }
</script>

<style lang="scss" scoped>
    .product {

    }
</style>