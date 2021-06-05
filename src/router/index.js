import Vue from 'vue'
import VueRouter from 'vue-router'

import Header from '../testing/Header.vue'
import Field from '../testing/Field.vue'
import Lunbo from '../testing/Lunbo.vue'

import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Me from '../views/Me.vue'
import Details from '../views/Details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/details',
    name: 'Details',
    component: Details,
  },
  {
    path: '/lunbo',
    name: 'Lunbo',
    component: Lunbo,
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/field',
    name: 'Field',
    component: Field,
  },
  {
    path: '/header',
    name: 'Header',
    component: Header,
  },
  /*
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about"  '../views/About.vue')
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router