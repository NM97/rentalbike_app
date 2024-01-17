import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/rental',
    name: 'rentalDetail',
    component: () => import(/* webpackChunkName: "bike detail" */ '../views/RentalDetails.vue')
    // component: () => import(/* webpackChunkName: "bike detail" */ '../views/BikeDetails.vue')
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: () => import(/* webpackChunkName: "reservation" */ '../views/Reservation.vue')
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: () => import(/* webpackChunkName: "confirmation" */ '../views/Confirmation.vue')
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "AdminPanel" */ '../views/AdminPanel.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/admin/todo',
    name: 'ToDo',
    component: () => import(/* webpackChunkName: "ToDo" */ '../views/ToDo.vue')
  },
  {
    path: '/admin/addbike',
    name: 'AddBike',
    component: () => import(/* webpackChunkName: "AddBike" */ '../views/AddBike.vue')
  },
  {
    path: '/admin/bikeslist',
    name: 'BikesList',
    component: () => import(/* webpackChunkName: "BikesList" */ '../views/BikesList.vue')
  },
  {
    path: '/admin/editbike/:id',
    name: 'EditBike',
    props: true,
    component: () => import(/* webpackChunkName: "EditBike" */ '../views/EditBike.vue')
  },
  {
    path: '/admin/rental',
    name: 'Rental',
    component: () => import(/* webpackChunkName: "Rental" */ '../views/Rental.vue')
  },
  {
    path: '/admin/locationslist',
    name: 'LocationsList',
    component: () => import(/* webpackChunkName: "LocationsList" */ '../views/LocationsList.vue')
  },
  {
    path: '/admin/addlocation',
    name: 'AddLocation',
    component: () => import(/* webpackChunkName: "AddLocation" */ '../views/AddLocation.vue')
  },
  {
    path: '/admin/editlocation/:id',
    name: 'EditLocation',
    props: true,
    component: () => import(/* webpackChunkName: "EditLocation" */ '../views/EditLocation.vue')
  },
  {
    path: '/admin/typeslist',
    name: 'TypesList',
    component: () => import(/* webpackChunkName: "TypesList" */ '../views/TypesList.vue')
  },
  {
    path: '/admin/addtype',
    name: 'AddType',
    component: () => import(/* webpackChunkName: "AddLocation" */ '../views/AddType.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
