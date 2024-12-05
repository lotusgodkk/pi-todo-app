<template>
  <main class="card card-login">
    <section>
      <h1 class="text-center">Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            autofocus
            id="username"
            name="username"
            v-model="username"
            required
            aria-label="Enter your username"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            required
            aria-label="Enter your password"
          />
        </div>
        <div v-if="error" class="text-error">{{ error }}</div>
        <button type="submit" class="primary">Login</button>
        <p>
          Don't have an account?
          <router-link to="/signup">Sign up here</router-link>.
        </p>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { validateUser } from "@/utils/indexedDbUtils";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  computed: {
    ...mapGetters(["getCurrentUser"]),
    currentUser() {
      return this.getCurrentUser;
    },
  },
  methods: {
    ...mapActions(["login"]),
    ...mapMutations(["setCurrentUser"]),
    async login() {
      try {
        // Validate user credentials
        const user = await validateUser(this.username, this.password);

        // If valid, store user session in sessionStorage
        this.setCurrentUser(user);

        // Redirect to the Todo page
        this.$router.push("/todo");
      } catch (error) {
        this.error = error.message;
      }
    },
  },
  created() {
    if (this.currentUser?.username) {
      this.$router.push("/todo");
    }
  },
};
</script>
