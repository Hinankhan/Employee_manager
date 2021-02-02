import Vue from 'vue'
import App from './App.vue'
//import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
//import * as rules from 'vee-validate/dist/rules';
import VeeValidate from 'vee-validate';
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
import VueLocalStorage from 'vue-localstorage'
import moment from 'moment'




import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router'

// install rules
// Object.keys(rules).forEach(rule => {
//   extend(rule, rules[rule]);
// });

Vue.use(VueLocalStorage);
Vue.use(KeenUI);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
// Vue.component('ValidationObserver', ValidationObserver);
// Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-D')
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
