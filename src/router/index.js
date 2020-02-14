import Vue from 'vue'
import Router from 'vue-router'
// import OrderSystem from '@/components/page/OrderSystem'
// import LeftNav from '@/components/common/LeftNav'
const OrderSystem = () => import('@/components/page/OrderSystem')
// const LeftNav = () => import('@/components/common/LeftNav')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'OrderSystem',
      component: OrderSystem
    }
  ]
})
