import Vue from 'vue'
import Router from 'vue-router'
import buzzword from '@/components/buzzword'
import allBuzzwords from '@/components/allBuzzwords'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'buzzword', component: buzzword },
    { path: '/allBuzzwords', name: 'allBuzzwords', component: allBuzzwords },
    { path: '*', redirect: '/buzzword' }
  ]
})
