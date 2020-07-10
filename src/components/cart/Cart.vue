<template>
    <div class="cart">
        <h1 class="mb-3">CART</h1>

        <h4 v-if="!CartGet.length">There are no products in your cart</h4>

        <CartItem
            v-for="(item, index) in CartGet"
            :key="index"
            :item="item"
            class="cart__item"
            @deleteFromCart="deleteFromCart(index)"
            @decreaseCartItem="decreaseItem(index)"
            @increaseCartItem="increaseItem(index)"
        ></CartItem>

        <div v-if="CartGet.length">
            <div class="cart__total mt-4 d-flex flex-column flex-sm-row justify-content-between">
                <h5>Cart total: <b>{{cartTottalCost + MainCurrencySymbolGet}}</b></h5>
                <h5>Delivery price: <b>{{deliveryCost + MainCurrencySymbolGet}}</b></h5>
                <h5>Order cost: <b>{{orderCost + MainCurrencySymbolGet}}</b></h5>
            </div>

            <div class="mt-5">
                <Order @showAttention="showAttention"></Order>
            </div>
        </div>

        <b-modal
            :ok-only="true"
            centered
            :visible="attention"
            id="attention"
            title="ATTENTION!"
            content-class="modal_warning"
        >
            <div class="mb-3">Remeber this <b>Login</b> for future sign in:</div>
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
        &__item  {
            border-bottom: 1px solid $black_odd;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }
    }
</style>