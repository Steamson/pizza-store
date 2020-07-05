<template>
    <div class="footer py-3">
        <b-container class="text-center">
            <router-link class="logo_outer" :to="{name: 'home'}">
                <div class="logo">
                    <span class="logo__head">TOKYO</span>
                    <span class="logo__sub">DELIVERY</span>
                </div>
            </router-link>
        </b-container>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .footer {
        background-color: $black_odd;
        position: relative;
        z-index: 1000;
    }
</style>