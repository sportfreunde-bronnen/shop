import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Cart from '@/components/Cart';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/warenkorb',
      name: 'shoppingcart',
      component: Cart,
    },
  ],
});
