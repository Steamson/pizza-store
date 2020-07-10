<template>
    <div class="header">
        <b-container class="py-3">
            <b-row>
                <b-col cols="4" class="d-flex align-items-center justify-content-start">
                    <Logo/>
                </b-col>
                
                <b-col cols="8" class="d-flex align-items-center justify-content-end">
                    <router-link :to="{name: 'cart'}" class="header__button mr-4">
                        <div v-if="CartCountAll > 0" class="cart_count"><span>{{CartCountAll}}</span></div>
                        <b-icon v-if="CartGet.length" icon="basket3-fill"></b-icon>
                        <b-icon v-else icon="basket3"></b-icon>
                    </router-link>

                    <router-link v-if="!Object.keys(UserGet).length" :to="{name: 'login'}" class="header__button">
                        <b-icon icon="person"></b-icon>
                    </router-link>
                    <router-link v-else :to="{name: 'account'}" class="header__button">
                        <b-icon icon="person-fill"></b-icon>
                    </router-link>
                    
                    <CurrencySwitch class="ml-4 flex-grow-0"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import CurrencySwitch from './CurrencySwitch';
    import Logo from './Logo';

    export default {
        name: 'Header',
        components: {
            CurrencySwitch,
            Logo,
        },
        computed: {
            ...mapGetters(['CartGet', 'CartCountAll', 'UserGet']),
        },
    }
</script>

<style lang="scss" scoped>
    .header {
        background-color: $black_odd;
        font-weight: 600;
        position: sticky;
        z-index: 1000;
        top: 0;

        &__button {
            border: 1px solid $white_smoke;
            background-color: transparent;
            transition: $transition_small;
            color: $white_smoke;
            padding: 4.5px 14px;
            border-radius: 5px;
            position: relative;
            user-select: none;
            font-size: 18px;

            &:hover {
                background-color: $white_smoke;
                text-decoration: none;
                color: $black_odd;

                .cart_count {
                    color: $white_smoke;
                }
            }

            svg {
                height: 20px;
                width: auto;
            }

            .cart_count {
                transform: translateX(-50%) translateY(-50%);
                background-color: $venetian_red;
                border: 1px solid $white_smoke;
                justify-content: center;
                color: $white_smoke;
                align-items: center;
                border-radius: 50%;
                position: absolute;
                display: flex;
                height: 24px;
                width: 24px;
                left: 2px;
                top: 4px;

                span {
                    position: relative;
                    font-size: 11px;
                    top: 1px;
                }
            }
        }
    }
</style>