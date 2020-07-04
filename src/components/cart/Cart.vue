<template>
    <div class="cart">
        <router-link :to="{name: 'home'}">Back to home</router-link>

        <h1 class="mb-3">CART</h1>

        <h2 v-if="!cart_data.length">There are no products in your cart</h2>

        <CartItem
            v-for="(item, index) in cart_data"
            :key="index"
            :item="item"
            @deleteFromCart="deleteFromCart(index)"
            @decreaseCartItem="decreaseItem(index)"
            @increaseCartItem="increaseItem(index)"
        ></CartItem>

        <div v-if="cart_data.length" class="cart__total mt-4">
            <span>Total: <mark>{{cartTottalCost}}</mark></span>
        </div>

        <div v-if="cart_data.length" class="d-flex mt-3 justify-content-between">
            <b-button variant="danger">Clear cart</b-button>
            <b-button variant="success">Make order</b-button>
        </div>

        <div>
            <Order></Order>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import CartItem from './CartItem';
    import Order from '../Order';

    export default {
        name: 'Cart',
        props: {
            cart_data: {
                type: Array,
                default() { return [] }
            }
        },
        components: {
            CartItem,
            Order,
        },
        computed: {
            cartTottalCost() {
                if (this.cart_data.length) {
                    let result = []

                    for (let item of this.cart_data) {
                        result.push(item.price * item.quantity)
                    }

                    result = result.reduce(function(sum, el) {
                        return sum + el
                    }).toFixed(2)

                    return result 
                } else {
                    return 0
                }
            }
        },
        methods: {
            ...mapActions(['RemoveFromCart', 'DecreaseCartItem', 'IncreaseCartItem']),

            deleteFromCart(index) {
                this.RemoveFromCart(index)
            },

            decreaseItem(index) {
                this.DecreaseCartItem(index)
            },

            increaseItem(index) {
                this.IncreaseCartItem(index)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .cart {
        &_item {
            margin-bottom: 10px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>