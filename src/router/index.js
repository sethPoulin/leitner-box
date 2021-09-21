import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SingleCard from '@/views/SingleCard.vue'
import Box from '@/views/Box.vue'
import EditCard from '@/views/EditCard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/box/:id',
    name: 'Box',
    component: Box
    //shows all cards, what's at what level, etc.
  },
  {
    path: '/card/:id',
    name: 'SingleCard',
    component: SingleCard,
    children: [  //use this pattern if you want edit to open on same screen as (or as a <dialog> on top of the Card view)
      {
        path: 'edit',   //card/39875sal/edit,
        name: 'Edit',
        component: EditCard
      }
    ]
  },
  {
    path: '/create',
    name: 'Create',
    component: null
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
