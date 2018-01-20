import Vue from 'vue'
import Router from 'vue-router'
import Card from '@/components/Card'
import FullList from '@/components/FullList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'card', component: Card },
    { path: '/fullList', name: 'fullList', component: FullList },
    { path: '*', redirect: { name: 'card' } }
  ]
})
