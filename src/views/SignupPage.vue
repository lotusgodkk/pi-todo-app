<template>
  <div class="card card-signup">
    <section>
      <h1 class="text-center">Signup</h1>
      <form @submit.prevent="signup">
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            v-model="username"
            required
            autofocus
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
        <div v-if="error" class="error">{{ error }}</div>
        <button type="submit" class="primary">Sign Up</button>
        <p>
          Already have an account?
          <router-link to="/">Login here</router-link>.
        </p>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { signup } from "@/utils/indexedDbUtils";

export default {
  name: "SignupPage",
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    ...mapActions(["signup"]),
    async signup() {
      try {
        if (!this.username || !this.password) {
          this.error = "Username and password are required!";
          return;
        }
        //await this.signup({ username: this.username, password: this.password });
        await signup({ username: this.username, password: this.password });
        const user = { username: this.username, password: this.password }; // Example, use proper user details
        this.$store.commit("setCurrentUser", user);

        this.$router.push("/todo");
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
