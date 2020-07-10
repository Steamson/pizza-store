<template>
    <div class="account">
        <div v-if="!Object.keys(UserGet).length">
            <h4>You are not <router-link v-if="!Object.keys(UserGet).length" :to="{name: 'login'}">signed in</router-link></h4>
        </div>

        <div v-else>
            <h1 class="mb-3">Account</h1>

            <div role="tablist" class="orders">
                <b-card no-body v-for="(order, index) in UserOrdersGet" :key="index">
                    <b-card-header header-tag="header" class="p-0" role="tab">
                        <b-button block v-b-toggle="order._id" variant="info" class="button button_red">
                            Order from: <b>{{order.time | moment("DD MMMM YYYY h:mm:ss A")}}</b>
                        </b-button>
                    </b-card-header>

                    <b-collapse :id="order._id" accordion="my-accordion" role="tabpanel">
                        <b-card-body class="py-3 px-0">
                            <b-container>
                                <b-row class="orders__header">
                                    <b-col cols="6" sm="5" md="4" class="text-left">Product</b-col>
                                    <b-col cols="4" sm="4" md="3" class="d-none d-md-flex justify-content-end">Price</b-col>
                                    <b-col cols="3" sm="3" md="2" class="d-none d-sm-flex justify-content-end">Count</b-col>
                                    <b-col cols="6" sm="4" md="3" class="d-flex justify-content-end">Cost</b-col>
                                </b-row>

                                <b-row class="orders__item" v-for="(product, index) in order.cart" :key="index">
                                    <b-col cols="6" sm="5" md="4" class="text-left">
                                        {{product.name}}
                                    </b-col>

                                    <b-col cols="4" sm="4" md="3" class="orders__item__price d-none d-md-flex justify-content-end">
                                        <div
                                            v-for="(symbol, currency) in AllCurrenciesGet"
                                            :key="currency"
                                            v-html="(parseFloat(product['price_' + currency.toLowerCase()])).toFixed(2) + '<b>' + symbol + '</b>'">
                                        </div>
                                    </b-col>

                                    <b-col cols="3" sm="3" md="2" class="d-none d-sm-flex justify-content-end">
                                        {{product.quantity}}
                                    </b-col>

                                    <b-col cols="6" sm="4" md="3" class="orders__item__price d-flex justify-content-end">
                                        <div
                                            v-for="(symbol, currency) in AllCurrenciesGet"
                                            :key="currency"
                                            v-html="(parseFloat(product['price_' + currency.toLowerCase()]).toFixed(2) * product.quantity).toFixed(2) + '<b>' + symbol + '</b>'">
                                        </div>
                                    </b-col>
                                </b-row>

                                <b-row class="orders__total">
                                    <b-col cols="6" md="9" class="text-right">
                                        <h5>Delivery:</h5>
                                    </b-col>
                                    <b-col cols="6" md="3">
                                        <div class="orders__total__result d-flex justify-content-end">
                                            <div
                                                v-for="(symbol, currency) in AllCurrenciesGet"
                                                :key="currency"
                                                v-html="(parseFloat(order.delivery['delivery_' + currency.toLowerCase()]).toFixed(2)) + '<b>' + symbol + '</b>'">
                                            </div>
                                        </div>
                                    </b-col>

                                    <b-col cols="6" md="9" class="text-right">
                                        <h5>Total:</h5>
                                    </b-col>
                                    <b-col cols="6" md="3">
                                        <div class="orders__total__result d-flex justify-content-end">
                                            <div
                                                v-for="(symbol, currency) in AllCurrenciesGet"
                                                :key="currency"
                                                v-html="(parseFloat(totalCost(order)['price_' + currency.toLowerCase()]).toFixed(2)) + '<b>' + symbol + '</b>'">
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </div>

            <b-button class="button button_dark mt-4" @click="logOutUser">Sign Out</b-button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'UserAccount',
        computed: {
            ...mapGetters(['UserGet', 'UserOrdersGet', 'AllCurrenciesGet']),
        },
        methods: {
            ...mapActions(['LogOutUser']),

            totalCost(order) {
                let total_cost = {
                    price_usd: 0.00,
                    price_eur: 0.00,
                }

                // Cart cost
                order.cart.map(item => {
                    total_cost.price_usd = ((parseFloat(item.price_usd) * item.quantity) + parseFloat(total_cost.price_usd)).toFixed(2)
                    total_cost.price_eur = ((parseFloat(item.price_eur) * item.quantity) + parseFloat(total_cost.price_eur)).toFixed(2)
                })

                // Add delivery
                total_cost.price_usd = (parseFloat(order.delivery.delivery_usd) + parseFloat(total_cost.price_usd)).toFixed(2)
                total_cost.price_eur = (parseFloat(order.delivery.delivery_eur) + parseFloat(total_cost.price_eur)).toFixed(2)

                return total_cost
            },

            logOutUser() {
                this.LogOutUser()
            },
        },
    }
</script>

<style lang="scss" scoped>
    .account {
        &/deep/ {
            .card {
                margin-bottom: 10px;
                border-radius: 5px;

                &:last-child {
                    margin-bottom: 0;
                }

                &-header {
                    button {
                        &:not(:disabled):not(.disabled):active {
                            background-color: $free_speech_red;
                            border-color: $free_speech_red;
                            box-shadow: none;
                            outline: none;
                        }
                    }
                }
            }

            .orders {
                &__header {
                    border-bottom: 1px solid $black_odd;
                    padding-bottom: 10px;
                }

                &__item {
                    margin-bottom: 10px;
                    margin-top: 10px;
                }

                &__item,
                &__total {
                    color: $black_odd;

                    &__price,
                    &__result {
                        > div {
                            $offset: 8px;

                            margin-right: $offset;

                            &:after {
                                padding-left: $offset;
                                display: inline;
                                content: '/';
                            }
                            
                            &:last-child {
                                margin-right: 0;

                                &::after {
                                    display: none;
                                }
                            }
                        }
                    }
                }

                &__total {
                    border-top: 1px solid $black_odd;
                    padding-top: 10px;
                }
            }
        }
    }
</style>