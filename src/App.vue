<template>
    <the-header></the-header>
    <main>
        <router-view v-slot="slotProps">
          <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
    </main>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
    components: {
        TheHeader
    },
    computed: {
      didAutoLogout() {
        return this.$store.getters.isAuthenticate
      }
    },
    watch: {
      didAutoLogout(value) {
        if (!value) {
          this.$router.replace('/')
        }
      }
    },
    created() {
      this.$store.dispatch('tryLogin')
    }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.route-enter-active {
  transition: all 0.2s ease-out;
}

.route-leave-active {
  transition: all 0.2s ease-in;
}


</style>