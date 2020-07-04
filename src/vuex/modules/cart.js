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
    },
    getters: {
        CartGet(state) {
            return state.cart
        },
    }
}