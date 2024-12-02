<template>
  <nav>
    <a href="/" :aria-label="$t('app')">
      <img src="logo.png" :title="$t('app')" :alt="$t('app')" />
    </a>
    <div class="flex">
      <LanguageSelector />
      <ThemeToggle />
      <button @click="handleLogout" type="button" class="danger">
        {{ $t("userManagement.logout") }}
      </button>
    </div>
  </nav>
</template>

<script>
import config from "@/lookup/config.json";
import { mapState, mapActions } from "vuex";
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector.vue";
import ThemeToggle from "../ThemeToggle/ThemeToggle.vue";

export default {
  name: "NavigationMenu",
  components: { LanguageSelector, ThemeToggle },
  data: () => {
    return {
      config,
    };
  },
  computed: {
    ...mapState({
      currentUser: "currentUser",
    }),
  },
  methods: {
    ...mapActions(["logout"]),
    async handleLogout() {
      await this.logout(); // Dispatch action to clear user session from Vuex and storage
      this.$router.push("/"); // Redirect to login page
    },
  },
};
</script>

<style scoped>
nav {
  background-color: var(--default-bg-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--secondary-border-color);
  height: 5rem;

  a {
    width: 3.5rem;
    max-height: 100%;
    display: inline-flex;
  }
}
</style>
