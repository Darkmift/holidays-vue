import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "v-calendar/dist/style.css";

import "./assets/main.scss";

import VCalendar from "v-calendar";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(createPinia());

/**PLUGINS */
app.use(VueQueryPlugin);
// Use plugin with defaults
app.use(VCalendar, {});

app.directive("capitalize", {
  created(el) {
    el.innerHTML = el.innerHTML.charAt(0).toUpperCase() + el.innerHTML.slice(1);
  },
});

// app.directive("highlight", {
//   created(el, binding) {
//     el.style.background = binding.value;
//   },
// });

app.mount("#app");
