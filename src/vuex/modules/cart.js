import Vue from "vue"
import axios from "axios"

export default {
    state: {
        cart: [],
    },
    mutations: {
        clearCart(state) {
            state.cart = []
        },

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
                data.quantity = 1
                state.cart.push(data)
            }
        },

        checkQuantity(state, index) {
            let value = state.cart[index].quantity
            
            if (value < 1 || !value) { value = 1 }
            else if (value > 99) { value = 99 }

            state.cart[index].quantity = value
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

        CheckQuantity({commit}, index) {
            commit('checkQuantity', index)
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

        async CreateOrder({commit, dispatch}, data) {
            let order = {
                cart: data.cart,
                account: data.uid,
                name: data.form.name,
                phone: data.form.phone,
                address: data.form.address,
                delivery: data.delivery,
                time: new Date()
            }

            await axios('https://pizzastore-e062.restdb.io/rest/orders', {
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
                commit('clearCart')
                dispatch('LoadUserOrders', data.uid)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    getters: {
        CartGet: state => {
            return state.cart
        },

        CartCountAll: state => {
            let all_count = 0
            state.cart.map(product => {
                all_count += parseInt(product.quantity)
            })
            
            return all_count
        },
    }
}