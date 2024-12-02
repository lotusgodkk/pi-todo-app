import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./locales/i18n";
import router from "./router";
import store from "./store";
import "./assets/styles.scss";

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(store);
app.mount("#app");
