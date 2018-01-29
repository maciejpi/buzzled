import Vue from 'vue'
import Router from 'vue-router'
import Card from '@/components/Card'
import FullList from '@/components/FullList'
import Intro from '@/components/Intro'
import AppContent from '@/components/AppContent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'intro', component: Intro },
    {
      path: '/content',
      name: 'content',
      redirect: { name: 'card' },
      component: AppContent,
      children: [
        { path: '/card', name: 'card', component: Card },
        { path: '/fullList', name: 'fullList', component: FullList }
      ]
    },
    { path: '*', redirect: { name: 'intro' } }
  ]
})
