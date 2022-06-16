import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router, { setupRouter } from "./router";
import { setupPlugins } from "./plugin";
import "@/styles/global.scss";

const app = createApp(App);
setupRouter(app);
setupPlugins(app);
app.use(createPinia());
app.use(router);

app.mount("#app");
