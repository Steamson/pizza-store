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
        async GetProductsFromApi({commit}) {
            await axios('https://pizzastore-e062.restdb.io/rest/products', {
                method: 'GET',
                headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': '5f01474ea529a1752c476d7f',
                },
            }).then((response) => {
                commit('updateProducts', response.data)
                return response.data
            }).catch((error) => {
                console.log(error)
                return error
            })
        },
    },
    getters: {
        ProductsGet: state => {
            return state.products
        },
    }
}