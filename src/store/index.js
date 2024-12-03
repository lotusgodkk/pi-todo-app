import { createStore } from "vuex";
import { addUser, getUser } from "../utils/indexedDbUtils";

export default createStore({
  state() {
    return {
      language: localStorage.getItem("language") || "en",
      theme: localStorage.getItem("theme") || "light",
      currentUser: JSON.parse(sessionStorage.getItem("currentUser")) || null,
    };
  },
  mutations: {
    setLanguage(state, lang) {
      state.language = lang;
      localStorage.setItem("language", lang);
    },
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem("theme", theme);
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    },
    logout(state) {
      state.currentUser = null;
      sessionStorage.removeItem("currentUser");
    },
  },
  actions: {
    async signup({ commit }, user) {
      // eslint-disable-next-line no-useless-catch
      try {
        const existingUser = await getUser(user.username);
        if (existingUser) {
          throw new Error("Username already exists");
        }
        await addUser(user);
        commit("setCurrentUser", user);
      } catch (error) {
        throw error;
      }
    },
    async login({ commit }, user) {
      // eslint-disable-next-line no-useless-catch
      try {
        const existingUser = await getUser(user.username);
        if (!existingUser || existingUser.password !== user.password) {
          throw new Error("Invalid username or password");
        }
        commit("setCurrentUser", existingUser);
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    getLanguage: (state) => state.language,
    getTheme: (state) => state.theme,
    getCurrentUser: (state) => state.currentUser,
  },
});
