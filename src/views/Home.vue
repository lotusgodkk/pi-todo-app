<template>
  <div>
    <p v-if="getCurrentUser">
      <NavigationMenu />
      <TodoList :currentUser="currentUser" />
    </p>
    <p v-else>You are not logged in.</p>
  </div>
</template>

<script>
import NavigationMenu from "@/components/Navigation/NavigationMenu.vue";
import TodoList from "@/components/TodoList/TodoList.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomeComponent",
  components: { TodoList, NavigationMenu },
  computed: {
    ...mapGetters(["getCurrentUser"]),
    currentUser() {
      return this.getCurrentUser;
    },
  },
  created() {
    console.log(this.currentUser);
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem("activeUser");
      this.$router.push("/");
    },
  },
};
</script>
