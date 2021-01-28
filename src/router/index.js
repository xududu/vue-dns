import Vue from "vue";
import VueRouter from "vue-router";

import Cdns1 from "../views/Cdns1.vue";
import Groupdns1 from "../views/Groupdns1.vue";
import Group4 from "../views/Group4.vue";
import Group5 from "../views/Group5.vue";

Vue.use(VueRouter);

const routes = [
    {
    path: "/groupdns1",
    name: "groupdns1",
    component: Groupdns1,
    alias: "/"
  },
   {
    path: "/Cdns1",
    name: "Cdns1",
    component: Cdns1,
  },

   {
    path: "/Group4",
    name: "Group4",
    component: Group4,
  },
   {
    path: "/Group5",
    name: "Group5",
    component: Group5,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
