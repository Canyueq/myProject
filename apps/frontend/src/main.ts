import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import { useUserStore } from "./store";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
const userStoer = useUserStore();
const token = localStorage.getItem("user_token");
if (token) {
  (async () => {
    userStoer.fetchUserInfo();
  })();
}
app.use(ElementPlus);
app.use(router);
app.mount("#app");
