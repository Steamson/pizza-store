<template>
    <div class="main-layout">
        <b-container class="text-center">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'main-layout',
        computed: {},
    }
</script>

<style lang="scss" scoped>
    // .main-layout {
        
    // }
</style>