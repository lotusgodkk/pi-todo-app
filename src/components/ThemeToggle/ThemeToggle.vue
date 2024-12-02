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
export default {
  data() {
    return {
      currentTheme: "light",
    };
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      document.body.classList.toggle("dark", this.currentTheme === "dark");
    },
  },
};
</script>
