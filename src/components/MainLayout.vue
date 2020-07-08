<template>
    <div class="main-layout">
        <Header/>

        <b-container class="py-4 text-center flex-grow-1">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </b-container>

        <Footer/>

        <div v-if="PreloaderGet" class="preloader">
            <div>
                <div>
                    <b-spinner class="m-2" label="Busy" style="width: 3rem; height: 3rem;" type="grow"></b-spinner>
                </div>

                <div>
                    <b-spinner class="m-2" label="Busy" style="width: 3rem; height: 3rem;" type="grow"></b-spinner>
                    <b-spinner class="m-2" label="Busy" style="width: 3rem; height: 3rem;"></b-spinner>
                    <b-spinner class="m-2" label="Busy" style="width: 3rem; height: 3rem;" type="grow"></b-spinner>
                </div>

                <div>
                    <b-spinner class="m-2" label="Busy" style="width: 3rem; height: 3rem;" type="grow"></b-spinner>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Header from './global/Header';
    import Footer from './global/Footer';

    export default {
        name: 'main-layout',
        components: {
            Header,
            Footer,
        },
        computed: {
            ...mapGetters(['PreloaderGet']),
        },
    }
</script>

<style lang="scss" scoped>
    .main-layout {
        min-height: 100vh;
        flex-direction: column;
        display: flex;
    }

    .preloader {
        background-color: rgba($old_rose, .75);
        justify-content: center;
        align-items: center;
        position: fixed;
        display: flex;
        z-index: 999;
        height: 100vh;
        width: 100%;
        top: 0;

        > div {
            text-align: center;
        }
    }
</style>