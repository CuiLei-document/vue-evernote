import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:'/notebooks',
    component: () => import('@/components/NoteBookList.vue')
  },
  {
    path:'/note/:noteId',
    component: () => import('@/components/NoteDetail.vue')
  },
  {
    path:'/trash/:noteId',
    component: () => import('@/components/TrashDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
