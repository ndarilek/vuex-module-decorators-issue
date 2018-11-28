import BootstrapVue from "bootstrap-vue"
import Vue from "vue"
import VueMeta from "vue-meta"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import App from "./app.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false;

Vue.use(VueMeta)

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
