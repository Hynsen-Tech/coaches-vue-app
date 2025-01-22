<template>
    <section>
        <base-card>
            <li>
                <h2>{{ fullName }}</h2>
                <h4>${{ rate }}/hour</h4>
                <div style="padding: 2rem 0;">
                    <base-badge v-for="area in areas" :key="area" :title="area" :type="area"></base-badge>
                </div>
                <div class="actions">
                    <base-button link mode="outline" :to="coachDetailsLink">View Details</base-button>
                    <base-button link :to="coachContactLink">Contact</base-button>
                </div>
            </li>
        </base-card>
    </section>
</template>

<script>
export default {
    props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        },
        coachDetailsLink() {
            return this.$route.path + '/' + this.id
        },
        coachContactLink() {
            return this.$route.path + '/' + this.id + '/contact'
        }
    }
}
</script>

<style scoped>
li {
    margin: 1rem 0;
    padding: 1rem;
}

h3 {
    font-size: 1.5rem;
}

h3,
h4 {
    margin: 0.5rem 0;
}

div {
    margin: 0.5rem 0;
}

.actions {
    padding-top: 3rem;
    display: flex;
    justify-content: flex-end;
}
</style>