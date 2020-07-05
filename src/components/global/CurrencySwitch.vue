<template>
    <b-dropdown :text="MainCurrencyGet" class="m-md-2">
        <b-dropdown-item 
            v-for="(currency, index) in AllCurrenciesGet"
            :key="index"
            @click="mainCurrencySet(index)"
        >{{index}}</b-dropdown-item>
    </b-dropdown>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters(['MainCurrencyGet', 'AllCurrenciesGet']),
        },
        methods: {
            ...mapActions(['ChangeMainCurrency']),

            mainCurrencySet(currency) {
                this.ChangeMainCurrency(currency)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>