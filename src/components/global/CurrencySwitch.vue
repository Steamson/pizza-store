<template>
    <b-dropdown :text="MainCurrencyGet" class="switcher" menu-class="w-100">
        <b-dropdown-item 
            v-for="(currency, index) in AllCurrenciesGet"
            :key="index"
            active-class="active"
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
    .switcher {
        width: 80px;

        &.show {
            &/deep/ {
                .dropdown {
                    &-toggle {
                        background-color: $white_smoke;
                        color: $venetian_red;

                        &:active {
                            background-color: $free_speech_red;
                            border-color: $white_smoke;
                            box-shadow: none;
                            outline: none;
                        }
                    }
                }
            }
        }

        &/deep/ {
            .dropdown {
                &-toggle {
                    border: 1px solid $white_smoke;
                    transition: $transition_small;
                    background: $venetian_red;
                    font-weight: 600;
                    box-shadow: none;
                    outline: none;

                    &.btn-secondary:not(:disabled):not(.disabled):active {
                        background-color: $free_speech_red;
                        border-color: $white_smoke;
                        box-shadow: none;
                        outline: none;
                    }

                    &::after {
                        position: relative;
                        margin-left: 10px;
                        top: 2px;
                    }
                }

                &-menu {
                    background-color: $white_smoke;
                    min-width: unset;
                    outline: none;
                }

                &-item {
                    transition: $transition_small;
                    padding-left: 12px;
                    font-weight: 600;

                    &:hover {
                        background: darken($white_smoke, 10%);
                    }
                }
            }
        }
    }
</style>