<template>
    <div class="cart_item d-flex align-items-center">
        <div class="d-flex align-items-center w-100 flex-grow-1">
            <h3 class="mb-0 mr-3">{{item.name}}</h3>
            <span>{{item.price_usd.toFixed(2)}}</span>
        </div>
        <div class="d-flex align-items-center">
            <b-button variant="outline-primary" @click="decrease">-</b-button>
            <b-form-input class="cart_item__num mx-3" type="number" v-model.number="item.quantity" min="1" max="99"></b-form-input>
            <b-button variant="outline-primary" @click="increase">+</b-button>
        </div>
        <b-button class="ml-3" variant="danger" @click="deleteFromCart">Delete</b-button>
    </div>
</template>

<script>
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
        }
    }
</script>

<style lang="scss" scoped>
    .cart_item {
        &__num {
            text-align: center;
            width: 60px;
        }
    }
</style>