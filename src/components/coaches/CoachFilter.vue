<template>
    <base-card>
        <h2>Filter through coaches</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" v-model="filter.frontend" @change="setFilter">
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backend" v-model="filter.backend" @change="setFilter">
            <label for="backend">Backend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" v-model="filter.career" @change="setFilter">
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filter: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('change-filter', this.filter)
        }
    }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>