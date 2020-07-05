import axios from 'axios'

export default {
    state: {
        currency: 'USD',
        preloader: false,
        currencies: {
            'USD': '$',
            'EUR': '€',
        },
    },
    mutations: {
        changeMainCurrency(state, currency) {
            state.currency = currency;
        },

        preloaderShow(state, show) {
            state.preloader = show;
        },
    },
    actions: {
        ChangeMainCurrency({commit}, currency) {
            commit('changeMainCurrency', currency)
        },

        PreloaderShow({commit}, show) {
            commit('preloaderShow', show)
        },
    },
    getters: {
        MainCurrencyGet: state => {
            return state.currency
        },

        MainCurrencySymbolGet: state => {
            return state.currencies[state.currency]
        },

        AllCurrenciesGet: state => {
            return state.currencies
        },

        PreloaderGet: state => {
            return state.preloader
        },
    }
}