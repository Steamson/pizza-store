<template>
    <div class="header">
        <b-container class="py-3">
            <b-row>
                <b-col cols="4" class="d-flex align-items-center justify-content-start">
                    <CurrencySwitch/>
                </b-col>

                <b-col cols="4" class="d-flex align-items-center justify-content-center">
                    <router-link :to="{name: 'cart'}">
                        <div class="cart_info">In cart: {{CartGet.length}}</div>
                    </router-link>
                </b-col>

                <b-col cols="4" class="d-flex align-items-center justify-content-end">
                    <router-link v-if="!Object.keys(UserGet).length" :to="{name: 'login'}">
                        <div class="cart_info">Sign In</div>
                    </router-link>

                    <router-link v-else :to="{name: 'account'}">
                        <div class="cart_info">Account</div>
                    </router-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import CurrencySwitch from './CurrencySwitch';

    export default {
        components: {
            CurrencySwitch,
        },
        computed: {
            ...mapGetters(['CartGet', 'UserGet']),
        },
    }
</script>

<style lang="scss" scoped>
    .header {
        background-color: $black_odd;
        position: sticky;
        z-index: 1000;
        top: 0;
    }
</style>