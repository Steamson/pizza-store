<template>
    <div class="footer py-3">
        <b-container class="text-center">
            <Logo/>
        </b-container>
    </div>
</template>

<script>
    import Logo from './Logo';
    export default {
        components: {
            Logo,
        },
    }
</script>

<style lang="scss" scoped>
    .footer {
        background-color: $black_odd;
        position: relative;
        z-index: 1000;
    }
</style>