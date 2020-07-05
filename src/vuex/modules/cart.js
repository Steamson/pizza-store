import Vue from "vue"
import axios from "axios"

export default {
    state: {
        cart: [],
    },
    mutations: {
        updateCart(state, data) {
            let has_product = false

            if (state.cart.length) {
                state.cart.map(product => {
                    if (product.id == data.id) {
                        has_product = true
                        product.quantity++
                    }
                })
            }

            if (!has_product) {
                Vue.delete(data, '_id')

                state.cart.push(data)
            }
        },

        removeCartItem(state, index) {
            state.cart.splice(index, 1)
        },

        decreaseCartItem(state, index) {
            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity--
            }
        },

        increaseCartItem(state, index) {
            if (state.cart[index].quantity < 99) {
                state.cart[index].quantity++
            }
        },
    },
    actions: {
        AddNewItemToCart({commit}, product) {
            commit('updateCart', product)
        },

        RemoveFromCart({commit}, index) {
            commit('removeCartItem', index)
        },

        DecreaseCartItem({commit}, index) {
            commit('decreaseCartItem', index)
        },

        IncreaseCartItem({commit}, index) {
            commit('increaseCartItem', index)
        },

        CreateOrder({commit}, data) {
            let order = {
                cart: data.cart,
                account: data.uid,
                name: data.form.name,
                phone: data.form.phone,
                address: data.form.address,
                time: new Date()
            }

            console.log(order);

            axios('https://pizzastore-e062.restdb.io/rest/orders', {
                method: 'POST',
                headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': '5f01474ea529a1752c476d7f',
                    'content-type': 'application/json'
                },
                data: order,
                json: true
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    getters: {
        CartGet: state => {
            return state.cart
        },
    }
}