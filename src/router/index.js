import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function replace(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    path:'/',
    redirect:'/notebooks'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/notebooks',
    component: () => import('@/components/NoteBookList.vue')
  },
  {
    path:'/note',
    component: () => import('@/components/NoteDetail.vue')
  },
  {
    path:'/trash',
    component: () => import('@/components/TrashDetail.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
