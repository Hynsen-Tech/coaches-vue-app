<template>
    <div>
        <base-dialog :show="hasError" title="Error" @close="resetError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <base-card>
                <header>
                    <h2>Requests Received</h2>
                </header>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasRequests">
                    <requests-list v-for="request in requestsReceived" :key="request.id" :email="request.email"
                        :message="request.message"></requests-list>
                </ul>
                <h3 v-else>You haven't received any requests yet</h3>
            </base-card>
        </section>
    </div>
</template>


<script>
import RequestItem from '@/components/requests/RequestItem.vue';

export default {
    components: {
        RequestsList: RequestItem
    },
    data() {
        return {
            isLoading: false,
            hasError: false,
            error: null
        }
    },
    created() {
        this.loadRequests()
    },
    computed: {
        requestsReceived() {
            return this.$store.getters['requests/requests']
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests']
        }
    },
    methods: {
        async loadRequests() {
            this.isLoading = true
            this.hasError = false
            this.error = null
            try {
                await this.$store.dispatch('requests/loadRequests')
                this.isLoading = false
            } catch (error) {
                this.error = error || "Something went wrong."
                this.isLoading = false
                this.hasError = true
            }
        },
        resetError() {
            this.error = null
            this.hasError = false
        }
    }
}
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>