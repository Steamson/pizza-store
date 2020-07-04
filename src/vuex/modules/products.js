import axios from 'axios'

export default {
    state: {
        products: [],
    },
    mutations: {
        updateProducts(state, data) {
            state.products = data
        },
    },
    actions: {
        GetProductsFromApi({commit}) {
            axios('http://localhost:4000/products', {
                method: "GET",
            }).then((response) => {
                commit('updateProducts', response.data)
                return response
            }).catch((error) => {
                console.log(error)
                return error
            })
        },
    },
    getters: {
        ProductsGet(state) {
            return state.products
        },
    }
}