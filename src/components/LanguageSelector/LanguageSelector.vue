<template>
  <div class="language-selector">
    <select
      id="language"
      v-model="currentLanguage"
      @change="changeLanguage"
      :aria-label="$t('userManagement.language')"
    >
      <option value="en">English</option>
      <option value="es">Espanol</option>
      <option value="hi">Hindi</option>
    </select>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  name: "LanguageSelector",
  setup() {
    const { locale } = useI18n();
    const currentLanguage = locale;

    const changeLanguage = (event) => {
      locale.value = event.target.value;
    };

    return {
      currentLanguage,
      changeLanguage,
    };
  },
};
</script>

<style scoped>
.language-selector {
  margin-bottom: 1rem;
}
</style>
