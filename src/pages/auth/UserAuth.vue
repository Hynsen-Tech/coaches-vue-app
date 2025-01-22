<template>
    <div>
        <base-dialog :show="!!error && !isLoading" title="Authentication Failed" @close="resetError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="authenticated && !isLoading" title="Welcome" @close="goTo">
            <p>Authenticatione done succesfully</p>
            <template v-slot:actions>
                <base-button @click="goTo">Go Home</base-button>
            </template>
        </base-dialog>
        <base-dialog :show="isLoading" :fixed="true">
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <header>
                <h2>{{ submitCaptionButton }}</h2>
            </header>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">E-Mail</label>
                    <input type="text" name="email" id="email" v-model="email">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="text" name="password" id="password" v-model="password">
                </div>
                <p v-if="!isValid">Please insert an email and password valid Password must be 6 characters long</p>
                <base-button>{{ submitCaptionButton }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeCaptionButton
                    }}</base-button>
            </form>
        </base-card>
    </div>
</template>


<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            isValid: true,
            modeLogin: true,
            isLoading: false,
            error: null,
            authenticated: false,
            redirectTimeout: null
        }
    },
    computed: {
        submitCaptionButton() {
            if (this.modeLogin) {
                return 'Login'
            } else {
                return 'Signup'
            }
        },
        switchModeCaptionButton() {
            if (this.modeLogin) {
                return 'Signup Instead'
            } else {
                return 'Login Instead'
            }
        }
    },
    methods: {
        goTo() {
            this.authenticated = false
            const path = '/' + (this.$route.query.redirect || 'coaches')
            console.log(path)
            this.$router.replace(path)
        },
        async submitForm() {
            this.isValid = true
            if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.isValid = false
                return
            }

            this.isLoading = true

            try {
                var authMode = ''
                if (this.modeLogin) {
                    authMode = 'login'
                } else {
                    authMode = 'signup'
                }
                await this.$store.dispatch(authMode, {
                    email: this.email,
                    password: this.password
                })
                this.authenticated = true
                this.redirectTimeout = setTimeout(() => {
                    console.log("Sono in Timeout")
                    this.goTo()
                }, 9000)
            } catch (err) {
                this.error = err || 'Failed to authenticate'
            }

            this.isLoading = false
        },
        resetError() {
            this.error = null
        },
        switchAuthMode() {
            this.modeLogin = !this.modeLogin
        }
    },
    beforeUnmount() {
        if (this.redirectTimeout) {
            clearTimeout(this.redirectTimeout)
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