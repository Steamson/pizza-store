<template>
    <div class="cart_item d-flex flex-column flex-sm-row align-items-center">
        <div class="d-flex align-items-center w-100 flex-grow-1 justify-content-between mr-sm-3">
            <h5 class="mb-0 mr-3">{{item.name}}</h5>
            <h5  class="mb-0">{{item.price_usd.toFixed(2) + MainCurrencySymbolGet}}</h5>
        </div>

        <div class="cart_item__buttons d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center order-2 order-sm-1">
                <b-button variant="outline-primary" @click="decrease">-</b-button>
                <b-form-input
                    class="cart_item__num mx-3"
                    type="number"
                    min="1"
                    max="99"
                    disabled
                    v-model.number="item.quantity"
                ></b-form-input>
                <b-button variant="outline-primary" @click="increase">+</b-button>
            </div>
            
            <div class="order-1 order-sm-2">
                <b-button class="ml-sm-3" variant="danger" @click="deleteFromCart">Delete</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'CartItem',
        props: {
            item: {
                type: Object,
                default() { return {} }
            },
        },
        methods: {
            deleteFromCart() {
                this.$emit('deleteFromCart')
            },

            decrease() {
                this.$emit('decreaseCartItem')
            },

            increase() {
                this.$emit('increaseCartItem')
            },
        },
        computed: {
            ...mapGetters(['MainCurrencySymbolGet'])
        },
    }
</script>

<style lang="scss" scoped>
    .cart_item {
        &__num {
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            -webkit-appearance: none;
            appearance: none;

            text-align: center;
            width: 60px;

            &[disabled] {
                background-color: $black_odd;
                color: $white_smoke;
                font-weight: 600;
            }
        }

        &__buttons {
            @include media-breakpoint-down(sm) {
                margin-top: 10px;
                width: 100%;
            }
        }
    }
</style>