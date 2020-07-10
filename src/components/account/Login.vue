<template>
    <div class="login">
        <h1 class="mb-3">Login form</h1>

        <b-form @submit.stop.prevent="checkForm" class="text-left" novalidate>
            <b-form-group
                label="Account name:"
                label-for="account"
                class="login__label"
            >
                <b-form-input
                    :class="{'is-invalid': $v.alias.$invalid}"
                    id="account"
                    type="text"
                    v-model.trim="$v.alias.$model"
                    class="login__input"
                    placeholder="Enter account name"
                ></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-between">
                <b-button class="button button_red" @click="returnBack">Cancel</b-button>
                <b-button class="button button_dark" type="submit">Submit</b-button>
            </div>
        </b-form>
    </div>
    
</template>

<script>
    import { required, minLength, between } from 'vuelidate/lib/validators';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'LiginForm',
        data() {
            return {
                alias: '',
            }
        },
        validations: {
            alias: {
                required,
                minLength: minLength(1)
            }
        },
        computed: {
            ...mapGetters(['UserGet'])
        },
        methods: {
            ...mapActions(['LoginUser', 'PreloaderShow']),

            checkForm(e) {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.PreloaderShow(true)
                    this.LoginUser(this.alias).then((response) => {
                        this.PreloaderShow(false)
                        this.alias = ''

                        if (Object.keys(this.UserGet).length) {
                            if (!this.$router.go(-1)) {
                                this.$router.replace({name: 'account'})
                            }
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            },

            returnBack() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        font-size: 20px;

        &/deep/ {
            .login {
                &__label {
                    color: $black_odd;
                }

                &__input {
                    color: $black_odd;
                }
            }
        }
    }
</style>