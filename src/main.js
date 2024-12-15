import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

Vue.config.productionTip = false;

// VueToast plugin
Vue.use(VueToast, {
  duration: 3000,
  position: 'top-left',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
