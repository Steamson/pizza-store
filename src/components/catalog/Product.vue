<template>
    <div class="product d-flex align-items-stretch">
        <b-card
            img-top
            tag="div"
            bg-variant="dark"
            :header="params.name"
            class="text-center my-3"
            text-variant="white"
            :img-src="'https://pizzastore-e062.restdb.io/media/' + params.image[0] + '?s=w'"
        >
            <b-card-title>{{params['price_' + currency.toLowerCase()].toFixed(2)}}{{symbol}}</b-card-title>
            <b-card-text>{{params.description}}</b-card-text>
            <b-button href="#" class="button button_red w-100" @click="addToCart">Add to cart</b-button>
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
        &/deep/ {
            @include media-breakpoint-down(sm) {
                max-width: 300px;
            }

            .card {
                &-header {
                    background-color: $venetian_red;
                    text-transform: uppercase;
                    font-weight: bold;
                }

                &-body {
                    background-color: $black_odd;
                }

                &-title {

                }
            }
        }
    }
</style>