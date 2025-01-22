<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model.trim="firstName.value" @focus="clearValidity('firstName')">
            <p v-if="!firstName.isValid">First Name must be not empty</p>
        </div>
        <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lastname">Lastname</label>
            <input type="text" id="lastname" v-model.trim="lastName.value" @focus="clearValidity('lastName')">
            <p v-if="!lastName.isValid">Last Name must be not empty</p>
        </div>
        <div class="form-control" :class="{invalid: !description.isValid}">
            <label for="description">Description</label>
            <textarea name="description" id="description" rows="5" v-model.trim="description.value" @focus="clearValidity('description')"></textarea>
            <p v-if="!description.isValid">Description must be not empty</p>
        </div>
        <div class="form-control" :class="{invalid: !rate.isValid}">
            <label for="rate">Hourly Rate</label>
            <input type="number" name="rate" id="rate" v-model.number="rate.value" @focus="clearValidity('rate')">
            <p v-if="!rate.isValid">Rate must be greater then zero and not empty</p>
        </div>
        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h3>Areas of Expertise</h3>
            <p v-if="!areas.isValid">You have to choose at least one expertise</p>
            <div>
                <input type="checkbox" name="frontend" id="frontend" value="frontend" v-model="areas.value" @blur="clearValidity('areas')">
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" name="backend" id="backend" value="backend" v-model="areas.value" @blur="clearValidity('areas')">
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" name="career" id="career" value="career" v-model="areas.value" @blur="clearValidity('areas')">
                <label for="career">Career Advisory</label>
            </div>
        </div>
        <p v-if="!isFormValid">Please fix the above errors and submit again</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>
export default {
    emits: ['save-data'],
    data() {
        return {
            firstName: {
                value: '',
                isValid: true
            },
            lastName: {
                value: '',
                isValid: true
            },
            description: {
                value: '',
                isValid: true
            },
            rate: {
                value: null,
                isValid: true
            },
            areas: {
                value: [],
                isValid: true
            },
            isFormValid: true
        }
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true
        },
        validateForm() {
            if (this.firstName.value === '') {
                this.firstName.isValid = false
            }
            if (this.lastName.value === '') {
                this.lastName.isValid = false
            }
            if (this.description.value === '') {
                this.description.isValid = false
            }
            if (!this.rate.value || this.rate.value < 0) {
                this.rate.isValid = false
            }
            if (this.areas.value.length === 0) {
                this.areas.isValid = false
            }
            if (
                this.firstName.isValid === false ||
                this.lastName.isValid === false ||
                this.description.isValid === false ||
                this.rate.isValid === false ||
                this.areas.isValid === false
            ) {
                this.isFormValid = false
            } else {
                this.isFormValid = true
            }
        },
        submitForm() {
            this.validateForm()

            if(!this.isFormValid) {return}

            const formData = {
                first: this.firstName.value,
                last: this.lastName.value,
                desc: this.description.value,
                rate: this.rate.value,
                areas: this.areas.value
            }
            this.$emit('save-data', formData)
        },
        resetForm() {
            this.firstName = ''
            this.lastName = ''
            this.description = ''
            this.rate = null
            this.areas = []
        }
    }
}
</script>


<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>