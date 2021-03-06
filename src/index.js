import Vue from 'vue';
import Hello from './app/Hello.vue';
import Map from './app/Map.vue';
import Builder from './app/Builder.vue';

import './index.scss';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.component('involve-map', Map);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Hello
      }
    },
    {
      path: '/builder',
      components: {
        default: Builder
      }
    }
  ]
});

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')
});
