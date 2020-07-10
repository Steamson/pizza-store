<template>
    <div class="order">
        <b-alert v-if="!Object.keys(UserGet).length" show class="warning">
            <b>REMEMBER!</b><br/>
            If you do not logged in, we will create new account for you. You will need it for check previous orders.
        </b-alert>

        <b-form @submit.stop.prevent="makeOrder" novalidate>
            <b-form-group label="Name:" label-for="name">
                <b-form-input
                    :class="{'is-invalid': $v.form.name.$error}"
                    v-model.trim="$v.form.name.$model"
                    placeholder="Enter name"
                    type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Phone number:" label-for="phone">
                <b-form-input
                    :class="{'is-invalid': $v.form.phone.$error}"
                    v-model.trim="$v.form.phone.$model"
                    id="phone"
                    placeholder="Enter name"
                    type="tel"
                    masked="true"
                    v-mask="'+# (###) ###-##-##'"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Address for delivery:" label-for="address">
                <b-form-input
                    :class="{'is-invalid': $v.form.address.$error}"
                    v-model.trim="$v.form.address.$model"
                    id="address"
                    placeholder="Enter address"
                    type="tel"
                    mask="+# (###) ###-##-##"
                ></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-end mt-4" :class="{'justify-content-between': Object.keys(UserGet).length}">
                <b-button v-if="Object.keys(UserGet).length" class="button button_red" @click="takeFromAccount">Take from account</b-button>
                <b-button type="submit" class="button button_dark">Submit</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'Order',
        data() {
            return {
                form: {
                    name: '',
                    phone: '',
                    address: '',
                }
            }
        },
        validations: {
            form: {
                name: {
                    required,
                    minLength: minLength(1)
                },

                phone: {
                    required,
                    minLength: minLength(18)
                },
                address: {
                    required,
                    minLength: minLength(1)
                },
            },
        },
        computed: {
            ...mapGetters(['UserGet', 'CartGet', 'DeliveryGet']),
        },
        methods: {
            ...mapActions(['CreateOrder', 'CreateUser', 'PreloaderShow']),

            makeOrder(e) {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.PreloaderShow(true)

                    let order_data = {
                        uid: this.UserGet.id,
                        form: this.form,
                        cart: this.CartGet,
                        delivery: this.DeliveryGet
                    }

                    if (Object.keys(this.UserGet).length) {
                        this.CreateOrder(order_data).then((result) => {
                            this.PreloaderShow(false)
                        }).catch((error) => {
                            console.log(error)
                        })
                    } else {
                        this.CreateUser(this.form).then((response) => {
                            order_data.uid = response.id
                            this.$emit('showAttention')
                            this.CreateOrder(order_data).then((result) => {
                                this.$router.replace({name: 'account'})
                                this.PreloaderShow(false)
                            }).catch((error) => {
                                console.log(error)
                            })
                        })
                    }
                }
                
                e.preventDefault()
            },

            takeFromAccount() {
                this.form.name = this.UserGet.user_name
                this.form.phone = this.UserGet.phone
                this.form.address = this.UserGet.address
            },
        },
    }
</script>

<style lang="scss" scoped>
    .order {
        &/deep/ {
            .warning {
                background-color: $venetian_red;
                color: $white_smoke;
            }
        }
    }
</style>