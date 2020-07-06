<template>
    <div>
        <b-form @submit="checkForm" class="text-left">
            <b-form-group
                label="Account name:"
                label-for="account"
            >
                <b-form-input
                    id="account"
                    type="text"
                    required
                    v-model="alias"
                    placeholder="Enter account name"
                ></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-between">
                <b-button @click="returnBack" variant="danger">Cancel</b-button>
                <b-button type="submit" variant="primary">Submit</b-button>
            </div>
        </b-form>
    </div>
    
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                alias: '',
            }
        },
        methods: {
            ...mapActions(['LoginUser']),

            checkForm(e) {
                this.LoginUser(this.alias).then((response) => {
                    if (!this.$router.go(-1)) {
                        this.$router.replace({name: 'account'})
                    }
                }).catch((error) => {
                    console.log(error);
                })

                e.preventDefault()
            },

            returnBack() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>