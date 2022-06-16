import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router, { setupRouter } from "./router";
import { setupPlugins } from "./plugin";
import "@/styles/global.scss";

async function main() {
  const app = createApp(App);
  setupPlugins(app);
  setupRouter(app);

  await router.isReady();
  app.mount("#app");
}
main();
