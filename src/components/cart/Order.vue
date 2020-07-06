<template>
    <div>
        <b-alert v-if="!Object.keys(UserGet).length" show variant="warning">
            <b>REMEMBER!</b> If you not logged in, we create new account for you. You will need it for check previous orders.
        </b-alert>

        <b-form @submit="makeOrder">
            <b-form-group label="Name:" label-for="name">
                <b-form-input
                    id="name"
                    v-model="form.name"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Phone number:" label-for="phone">
                <b-form-input
                    id="phone"
                    v-model="form.phone"
                    required
                    placeholder="Enter name"
                    type="tel"
                    mask="+# (###) ###-##-##"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Address for delivery:" label-for="address">
                <b-form-input
                    id="address"
                    v-model="form.address"
                    required
                    placeholder="Enter address"
                    type="tel"
                    mask="+# (###) ###-##-##"
                ></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-between">
                <b-button type="reset" variant="danger">Reset</b-button>
                <b-button v-if="Object.keys(UserGet).length" variant="outline-primary" @click="takeFromAccount">Take from account</b-button>
                <b-button type="submit" variant="success">Submit</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { TheMask } from 'vue-the-mask'

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
        components: {
            TheMask,
        },
        computed: {
            ...mapGetters(['UserGet', 'CartGet', 'DeliveryGet']),
        },
        methods: {
            ...mapActions(['CreateOrder', 'CreateUser']),

            makeOrder(e) {
                let order_data = {
                    uid: this.UserGet.id,
                    form: this.form,
                    cart: this.CartGet,
                    delivery: this.DeliveryGet
                }

                if (Object.keys(this.UserGet).length) {
                    this.CreateOrder(order_data)
                } else {
                    this.CreateUser(this.form).then((response) => {
                        order_data.uid = response.id
                        this.$emit('showAttention')
                        this.CreateOrder(order_data)
                    })
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

</style>