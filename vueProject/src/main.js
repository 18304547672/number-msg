import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import store from '@/store'
Vue.use(ElementUI);
require("./premission")
Vue.config.productionTip = false;
console.log(process.env.VUE_APP_INFOR);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");


