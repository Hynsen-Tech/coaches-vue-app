<template>
  <base-dialog :show="isLoggedOut" title="Logged Out">
    <p>Logged out succesfully</p>
    <template v-slot:actions>
      <base-button @click="goHome">Close</base-button>
    </template>
  </base-dialog>
  <header>
    <nav>
      <h1>
        <router-link to="/">Find a Coach</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/coaches">Coaches</router-link>
        </li>
        <li>
          <router-link v-if="!isLoggedIn" to="/auth">Login</router-link>
          <router-link v-else to="/requests">Requests</router-link>
        </li>
        <li>
          <base-button v-if="isLoggedIn" @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLoggedOut: false,
      redirectTimeout: null
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticate
    }
  },
  methods: {
    goHome() {
      this.isLoggedOut = false
      this.$router.replace('/')
    },
    logout() {
      this.$store.dispatch('logout')
      this.isLoggedOut = true
      setTimeout(() => {
        this.goHome()
      }, 3000)
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
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>