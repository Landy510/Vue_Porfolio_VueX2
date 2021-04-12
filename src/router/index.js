import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import Home from '../views/Frontend/Home.vue'
import Login from '../views/Frontend/Login.vue'

import DashBoard from '../views/Backend/DashBoard.vue'
import Coupon from '../views/Backend/Coupon.vue'
import OrderList from '../views/Backend/OrderList.vue'
import Products from '../views/Backend/Products.vue'

import Lecture from '../views/Frontend/Lecture.vue'
import LectureProduct from '../views/Frontend/LectureProduct.vue'
import SelfProduct from '../views/Frontend/SelfProduct.vue'

import Company from '../views/Frontend/Company.vue'
import LocationInfo from '../views/Frontend/LocationInfo.vue'
import CompanyDetail from '../views/Frontend/CompanyDetail.vue'

import CustomerOrder from '../views/Frontend/CustomerOrder.vue'
import Customer1 from '../views/Frontend/Customer1.vue'
import Customer2 from '../views/Frontend/Customer2.vue'
import CustomerCheckout from '../views/Frontend/CustomerCheckout.vue'
import CustomerFinish from '../views/Frontend/CustomerFinish.vue'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lecture',
    name: 'Lecture',
    component: Lecture,
    children: [
      {
        path: 'LectureProduct',
        name: 'LectureProduct',
        component: LectureProduct
      },
      {
        path: ':LectureId',
        name: 'SelfProduct',
        component: SelfProduct
      }
    ]
  },
  {
    path: '/Company',
    name: 'Company',
    component: Company,
    children: [
      {
        path: 'locationInfo',
        name: 'LocationInfo',
        component: LocationInfo
      },
      {
        path: 'CompanyDetail',
        name: 'CompanyDetail',
        component: CompanyDetail
      }
    ]
  },
  {
    path: '/customerOrder',
    name: 'CustomerOrder',
    component: CustomerOrder,
    children: [
      {
        path: 'customer1',
        name: 'Customer1',
        component: Customer1
      },
      {
        path: 'customer2',
        name: 'Customer2',
        component: Customer2
      },
      {
        path: 'CustomerCheckout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout
      },
      {
        path: 'CustomerFinish/:orderId',
        name: 'CustomerFinish',
        component: CustomerFinish
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: DashBoard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'orderList',
        name: 'OrderList',
        component: OrderList,
        meta: { requiresAuth: true }
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true }
      },
      {
        path: 'Coupon',
        name: 'Coupon',
        component: Coupon,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
