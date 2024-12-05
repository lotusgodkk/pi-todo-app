<template>
  <div>
    <button
      @click="toggleTheme"
      :aria-label="
        currentTheme === 'light'
          ? $t('themeToggle.labelDark')
          : $t('themeToggle.labelLight')
      "
      type="button"
    >
      {{
        currentTheme === "light"
          ? $t("themeToggle.darkMode")
          : $t("themeToggle.lightMode")
      }}
    </button>
  </div>
</template>

<script>
//import { mapMutations } from "vuex";

export default {
  data() {
    return {
      currentTheme: this.$store.state.theme,
    };
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      document.body.classList.toggle("dark", this.currentTheme === "dark");
      this.$store.commit("setTheme", this.currentTheme);
    },
  },
  created() {
    document.body.classList.toggle("dark", this.currentTheme === "dark");
  },
};
</script>
