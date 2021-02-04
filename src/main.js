import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"
import VueClipboard from 'vue-clipboard2'


Vue.config.productionTip = false;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.use(VueClipboard)

// axios.defaults.baseURL = 'http://localhost:8000/';

new Vue({
  router,
  store,
   axios,
  render: h => h(App)
}).$mount("#app");
