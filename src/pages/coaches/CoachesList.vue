<template>
    <div>
        <base-dialog :show="!!error" title="Something went wrong" @close="resetError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilter"></coach-filter>
        </section>
        <section>
            <div class="controls">
                <base-button @click="loadCoaches(true)" mode="outline">Refresh</base-button>
                <base-button v-if="!isLoading && !isCoach && isLoggedIn" link to="/register">Register as Coach</base-button>
                <base-button v-if="!isLoading && !isLoggedIn" link to="/auth?redirect=register">Login and Register as a Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <coach-item v-for="coach in filteredCoachesList" :key="coach.id" :id="coach.id"
                    :firstName="coach.firstName" :lastName="coach.lastName" :rate="coach.hourlyRate"
                    :areas="coach.areas">
                </coach-item>
            </ul>
            <base-card v-else>
                <h1>No Coaches Found</h1>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            isLoading: false,
            error: null,
            filter: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticate
        },
        filteredCoachesList() {
            const coaches = this.$store.getters['coaches/coaches']
            return coaches.filter(coach => {
                if (coach.areas.includes('frontend') && this.filter.frontend) {
                    return true
                }
                if (coach.areas.includes('backend') && this.filter.backend) {
                    return true
                }
                if (coach.areas.includes('career') && this.filter.career) {
                    return true
                }
                return false
            })
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches']
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach']
        }
    },
    created() {
        this.loadCoaches()
    },
    methods: {
        setFilter(updatedFilter) {
            this.filter = updatedFilter
        },
        async loadCoaches(refresh = false) {
            this.isLoading = true
            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh })
            } catch (error) {
                this.error = error.message || 'Something went wrong. Please try again'
            }
            this.isLoading = false
        },
        resetError() {
            this.error = null
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
    max-width: 40rem;
    margin: 2rem auto;
}
</style>