import axios from 'axios'

export default {
    state: {
        user: {},
        orders: {},
    },
    mutations: {
        loginUser(state, user) {
            state.user = user;
        },

        logOutUser(state) {
            state.user = {};
        },

        ordersSave(state, orders) {
            state.orders = orders
        },
    },
    actions: {
        ChangeMainCurrency({commit}, currency) {
            commit('changeMainCurrency', currency)
        },

        async LoginUser({commit, state, dispatch}, alias) {
            state.preloader = true

            return await axios('https://pizzastore-e062.restdb.io/rest/accounts', {
                method: 'GET',
                headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': '5f01474ea529a1752c476d7f',
                },
            }).then((response) => {
                state.preloader = false
                
                if (response.data.length) {
                    let temp_user = {}

                    for (let user of response.data) {
                        if (user.alias == alias) {
                            temp_user = user
                        }
                    }

                    if (temp_user) {
                        commit('loginUser', temp_user)
                        dispatch('LoadUserOrders', temp_user.id)
                    }
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        LogOutUser({commit}) {
            commit('logOutUser')
        },

        async CreateUser({commit}, params) {
            return await axios('https://pizzastore-e062.restdb.io/rest/accounts', {
                method: 'POST',
                headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': '5f01474ea529a1752c476d7f',
                    'content-type': 'application/json'
                },
                data: {
                    phone: params.phone,
                    user_name: params.name,
                    address: params.address,
                    alias: Math.random().toString(36).substr(2, 9),
                },
                json: true
            }).then((response) => {
                commit('loginUser', response.data)
                return response.data
            }).catch((error) => {
                console.log(error)
            })
        },

        LoadUserOrders({commit}, uid) {
            if (uid) {
                axios('https://pizzastore-e062.restdb.io/rest/orders?q={"account": ' + uid + '}&sort=time&dir=-1', {
                    method: 'GET',
                    headers: {
                        'cache-control': 'no-cache',
                        'x-apikey': '5f01474ea529a1752c476d7f',
                    },
                }).then((response) => {
                    commit('ordersSave', response.data)
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    },
    getters: {
        UserGet: state => {
            return state.user
        },

        UserOrdersGet: state => {
            return state.orders
        },
    }
}