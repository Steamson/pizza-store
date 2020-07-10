import axios from 'axios'

export default {
    state: {
        currency: 'USD',
        preloader: false,
        currencies: {
            USD: '$',
            EUR: '€',
        },
        delivery: {
            delivery_usd: 0.00,
            delivery_eur: 0.00,
        },
    },
    mutations: {
        changeMainCurrency(state, currency) {
            state.currency = currency;
        },

        preloaderShow(state, show) {
            state.preloader = show;
        },

        calculateDelivery(state) {
            const random = Math.floor(Math.random() * (20 - 4 + 1) + 4)

            state.delivery.delivery_usd = random.toFixed(2)
            state.delivery.delivery_eur = (random * 0.8892).toFixed(2)
        },
    },
    actions: {
        ChangeMainCurrency({commit}, currency) {
            commit('changeMainCurrency', currency)
        },

        PreloaderShow({commit}, show) {
            console.log('object');
            commit('preloaderShow', show)
        },

        CalculateDelivery({commit}) {
            commit('calculateDelivery')
        }
    },
    getters: {
        MainCurrencyGet: state => {
            return state.currency
        },

        MainCurrencySmallGet: state => {
            return state.currency.toLowerCase()
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

        DeliveryGet: state => {
            return state.delivery
        },
    }
}