<template>
    <div>
        <base-dialog :show="!!error" title="Something went wrong" @close="resetError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" :fixed="true">
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <section>
                <h2>Register as a Coach</h2>
                <coach-form @save-data="saveData"></coach-form>
            </section>
        </base-card>
    </div>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';

export default {
    data() {
        return {
            error: null,
            isLoading: false
        }
    },
    components: {
        CoachForm
    },
    methods: {
        saveData(data) {
            try {
                this.isLoading = true
                this.$store.dispatch('coaches/registerCoach', data)
                this.isLoading = false
                this.$router.replace('/coaches')
            } catch (error) {
                this.isLoading = false
                this.error = error.message || 'Something went wrong, please try again'
            }
        },
        resetError() {
            this.error = null
        }
    }
}
</script>