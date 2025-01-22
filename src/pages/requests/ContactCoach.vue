<template>
    <div>
        <base-dialog :show="!!error" title="Error" @close="resetError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="messSended" title="Message sended" @close="goToRequests">
            <p>Message sent succesfully</p>
        </base-dialog>
        <base-dialog :show="isLoading" :fixed="true">
            <base-spinner></base-spinner>
        </base-dialog>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="email">Your Email</label>
                <input type="text" id="email" v-model="email" @focus="formIsValid = true">
            </div>
            <div class="form-control">
                <label for="message">Your Message</label>
                <textarea name="message" id="message" rows="10" v-model="message"
                    @focus="formIsValid = true"></textarea>
            </div>
            <p class="errors" v-if="!formIsValid">Check the email or the message</p>
            <div class="actions">
                <base-button>Send Message</base-button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            message: '',
            formIsValid: true,
            isLoading: false,
            error: null,
            messSended: false
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true
            if (this.email === '' || !this.email.includes('@') || this.message === '') {
                this.formIsValid = false
                return
            }

            this.isLoading = true

            try {
                await this.$store.dispatch('requests/contactCoach', {
                    coachId: this.$route.params.id,
                    email: this.email,
                    message: this.message
                })
                this.messSended = true
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                this.messSended = false
                this.error = error.message || 'Something went wrong'
            }
        },
        resetError() {
            this.error = null
        },
        goToRequests() {
            this.messSended = false
            this.$router.replace('/requests')
        }
    }
}
</script>


<style scoped>
form {
    margin: 1rem 0;
    padding: 1rem 0;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.errors {
    font-weight: bold;
    color: red;
}

.actions {
    text-align: center;
}
</style>