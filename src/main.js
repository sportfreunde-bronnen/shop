// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLocalStorage from 'vue-localstorage';
import Vuex from 'vuex';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueLocalStorage);

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Content-Type', 'application/json');
  next();
});

/* eslint-disable no-unused-vars */
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state, n) {
      state.count += n; // eslint-disable-line no-param-reassign
    },
    initial(state, n) {
      state.count = n;  // eslint-disable-line no-param-reassign
    },
  },
});
/* eslint-enable no-unused-vars */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
