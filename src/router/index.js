import Home from "../components/Home.vue";
import { createRouter, createWebHasHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHasHistory(),
  routes,
});

export default router;