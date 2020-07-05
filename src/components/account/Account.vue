<template>
    <div>
        <div v-if="!Object.keys(UserGet).length">
            You are not <router-link v-if="!Object.keys(UserGet).length" :to="{name: 'login'}">signed in</router-link>
        </div>

        <div v-else>
            <h1 class="mb-3">Account</h1>

            <b-button @click="logOutUser">Sign Out</b-button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters(['UserGet']),
        },
        methods: {
            ...mapActions(['LogOutUser']),

            logOutUser() {
                this.LogOutUser()
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>