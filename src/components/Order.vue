<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="input-group-1" label="Name:" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="form.name"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Phone:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.phone"
                    required
                    placeholder="Enter name"
                    type="tel"
                    mask="+# (###) ###-##-##"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    import {TheMask} from 'vue-the-mask'

    export default {
        data() {
            return {
                form: {
                    name: '',
                    phone: '',
                },
            }
        },
        components: {
            TheMask,
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                this.show = true
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>