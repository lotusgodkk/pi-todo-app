import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import LoginPage from "@/views/LoginPage.vue";
import SignupPage from "@/views/SignupPage.vue";

const routes = [
  { path: "/todo", name: "Todo", component: Home },
  { path: "/", name: "Login", component: LoginPage },
  { path: "/signup", name: "Signup", component: SignupPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
