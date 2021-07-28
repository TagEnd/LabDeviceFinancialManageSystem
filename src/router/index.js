import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login => require(['@/components/Login'], Login),
    },
    {
        path: '/AdminInformation',
        name: 'AdminInformation',
        component: AdminInformation => require(['@/components/Admin/AdminInformation'], AdminInformation),
        children: [
            { path: '/DeviceEntry', name: 'DeviceEntry', component: DeviceEntry => require(['@/components/Admin/DeviceEntry'], DeviceEntry) },
            { path: '/DeviceDistribute', name: 'DeviceDistribute', component: DeviceDistribute => require(['@/components/Admin/DeviceDistribute'], DeviceDistribute) },
            { path: '/DeviceType', name: 'DeviceType', component: DeviceType => require(['@/components/Admin/DeviceType'], DeviceType) },
        ]
    }
  ]
})
