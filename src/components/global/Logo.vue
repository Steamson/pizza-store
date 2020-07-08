<template>
    <router-link class="logo_outer" :to="{name: 'home'}">
        <div class="logo">
            <span class="logo__head">TOKYO</span>
            <span class="logo__sub">DELIVERY</span>
        </div>
    </router-link>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .logo {
        background-color: $venetian_red;
        border-radius: 0 5px 0 5px;
        transition: all .3s ease;
        flex-direction: column;
        display: inline-flex;
        color: $white_smoke;
        padding: 4px 8px;
        line-height: 1;

        &_outer {
            &:hover {
                text-decoration: none;
            }
        }

        &:hover {
            background-color: $old_rose;
        }
        
        &__head {
            font-weight: bold;
            font-size: 20px;
        }

        &__sub {
            font-size: 15px;
        }
    }
</style>