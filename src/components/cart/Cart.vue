<template>
    <div class="cart">
        <h1 class="mb-3">CART</h1>

        <h2 v-if="!CartGet.length">There are no products in your cart</h2>

        <CartItem
            v-for="(item, index) in CartGet"
            :key="index"
            :item="item"
            @deleteFromCart="deleteFromCart(index)"
            @decreaseCartItem="decreaseItem(index)"
            @increaseCartItem="increaseItem(index)"
        ></CartItem>

        <div v-if="CartGet.length">
            <div class="cart__total mt-4">
                <span>Cart total: <mark>{{cartTottalCost + MainCurrencySymbolGet}}</mark></span>
                <span>Delivery price: <mark>{{deliveryCost + MainCurrencySymbolGet}}</mark></span>
                <span>Order cost: <mark>{{orderCost + MainCurrencySymbolGet}}</mark></span>
            </div>

            <div class="mt-5">
                <Order @showAttention="showAttention"></Order>
            </div>
        </div>

        <b-modal
            :ok-only="true"
            centered
            :visible="attention"
            header-bg-variant="danger"
            id="attention"
            title="ATTENTION!"
        >
            <div class="mb-3">Remeber this <b>Login</b> for future login:</div>
            <h4>{{UserGet.alias}}</h4>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import CartItem from './CartItem';
    import Order from '../cart/Order';

    export default {
        name: 'Cart',
        components: {
            CartItem,
            Order,
        },
        data() {
            return {
                attention: false,
            }
        },
        mounted () {
            this.CalculateDelivery()
        },
        computed: {
            ...mapGetters(['MainCurrencySmallGet', 'DeliveryGet', 'MainCurrencySymbolGet', 'CartGet', 'UserGet']),

            cartTottalCost() {
                if (this.CartGet.length) {
                    let result = []

                    for (let item of this.CartGet) {
                        result.push(item['price_' + this.MainCurrencySmallGet] * item.quantity)
                    }

                    result = result.reduce(function(sum, el) {
                        return sum + el
                    }).toFixed(2)

                    return result 
                } else {
                    return 0
                }
            },

            deliveryCost() {
                return this.DeliveryGet['delivery_' + this.MainCurrencySmallGet]
            },

            orderCost() {
                return (parseFloat(this.cartTottalCost) + parseFloat(this.deliveryCost)).toFixed(2)
            },
        },
        methods: {
            ...mapActions(['RemoveFromCart', 'DecreaseCartItem', 'IncreaseCartItem', 'CalculateDelivery']),

            deleteFromCart(index) {
                this.RemoveFromCart(index)
            },

            decreaseItem(index) {
                this.DecreaseCartItem(index)
            },

            increaseItem(index) {
                this.IncreaseCartItem(index)
            },

            showAttention() {
                this.attention = true
            }
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