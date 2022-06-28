import { RouteRecordRaw } from 'vue-router'
import Error404 from '../pages/Error404.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Weather',
    component: () => import('../components/Weather.vue')
  },
  {
    path: '/week/:lat/:lon',
    name: 'WeatherWeek',
    component: () => import('../components/WeatherWeek.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  // error404 page incase of page does not exist.
  {
    path: '/:pathMatch(.*)*',
    component: Error404
  }
]

export default routes
