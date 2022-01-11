import { createApp, h, provide } from "vue";
import App from "./App.vue";
import store from "./store";

createApp({
  setup() {
    provide("mainStore", store);
  },
  store,
  render: () => h(App),
}).mount("#app");
