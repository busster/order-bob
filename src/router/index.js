/* eslint no-param-reassign: [
  "error", { "props": true, "ignorePropertyModificationsFor": ["to"] }
] */

import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import UpsertUser from '@/components/UpsertUser'
import User from '@/components/User'
import UpsertOrder from '@/components/UpsertOrder'
import Order from '@/components/Order'

import store from '../store/index'

Vue.use(Router)

function buildUserBreadcrumbs(to) {
  const user = to.params.user

  const breadcrumbs = [
    { name: 'Home', routeAction: 'routeToBase' },
  ]

  if (to.name === 'User') {
    breadcrumbs.push({ name: 'User', routeAction: 'routeToUser', props: { user } })
  } else if (to.name === 'EditUser') {
    breadcrumbs.push({ name: 'Edit User', routeAction: 'routeToUpsertUser', props: { user } })
  } else if (to.name === 'NewUser') {
    breadcrumbs.push({ name: 'New User', routeAction: 'routeToUpsertUser' })
  }

  to.meta.breadcrumbs = breadcrumbs
}

function buildOrderBreadcrumbs(to) {
  const user = to.params.user
  const order = to.params.order

  const breadcrumbs = [
    { name: 'Home', routeAction: 'routeToBase' },
    { name: 'User', routeAction: 'routeToUser', props: { user } },
  ]

  if (to.name === 'Order') {
    breadcrumbs.push({ name: 'Order', routeAction: 'routeToOrder', props: { user, order } })
  } else if (to.name === 'EditOrder') {
    breadcrumbs.push({ name: 'Edit Order', routeAction: 'routeToUpsertOrder', props: { user, order } })
  } else if (to.name === 'NewOrder') {
    breadcrumbs.push({ name: 'New Order', routeAction: 'routeToUpsertOrder', props: { user, order } })
  }

  to.meta.breadcrumbs = breadcrumbs
}

function beforeUserGuard(to, from, next) {
  if (!to.params.user) {
    store.dispatch('setLoading', true)
    store.dispatch('fetchUsers').then(() => {
      store.dispatch('getUser', { userId: to.params.userId }).then((user) => {
        if (!user) { next('/') }
        to.params.user = user
        store.dispatch('setLoading', false)
        buildUserBreadcrumbs(to, from, next)
        next()
      })
    })
  } else {
    buildUserBreadcrumbs(to, from, next)
    next()
  }
}

function setLocation(to, from, next, order) {
  store.dispatch('setLoading', true)
  store.dispatch('getOrder', order).then((orderData) => {
    if (!orderData) { next({ name: 'User', params: to.params }) }
    to.params.order = orderData
    store.dispatch('setLoading', false)
    buildOrderBreadcrumbs(to, from, next)
    next()
  })
}

function setOrder(to, from, next) {
  const orders = to.params.user.orders
  const orderId = to.params.orderId
  const orderIndex = orders.findIndex(o => o.orderId === parseInt(orderId, 10))
  if (orderIndex >= 0) {
    const order = orders[orderIndex]
    if (!order.location) {
      setLocation(to, from, next, order)
    } else {
      to.params.order = order
      buildOrderBreadcrumbs(to, from, next)
      next()
    }
  } else {
    buildUserBreadcrumbs(to, from, next)
    next({ name: 'User', params: to.params })
  }
}

function beforeOrderGuard(to, from, next) {
  if (!to.params.order) {
    setOrder(to, from, next)
  } else if (!to.params.order.location) {
    setLocation(to, from, next, to.params.order)
  } else {
    buildOrderBreadcrumbs(to, from, next)
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Users',
      component: Users,
    },
    {
      beforeEnter: (to, from, next) => {
        buildUserBreadcrumbs(to, from, next)
        next()
      },
      path: '/users/new',
      name: 'NewUser',
      component: UpsertUser,
    },
    {
      beforeEnter: (to, from, next) => {
        beforeUserGuard(to, from, next)
      },
      path: '/users/:userId/edit',
      name: 'EditUser',
      component: UpsertUser,
      props: route => ({ user: route.params.user }),
    },
    {
      beforeEnter: (to, from, next) => {
        beforeUserGuard(to, from, next)
      },
      path: '/users/:userId',
      name: 'User',
      component: User,
      props: route => ({ user: route.params.user }),
      children: [
        {
          beforeEnter: (to, from, next) => {
            beforeOrderGuard(to, from, next)
          },
          path: 'orders/:orderId',
          name: 'Order',
          component: Order,
          props: route => ({
            user: route.params.user,
            userId: route.params.user.userId,
            order: route.params.order,
            orderId: route.params.orderId,
          }),
        },
        {
          beforeEnter: (to, from, next) => {
            buildOrderBreadcrumbs(to, from, next)
            next()
          },
          path: 'orders/new',
          name: 'NewOrder',
          component: UpsertOrder,
          props: route => ({ user: route.params.user, userId: route.params.user.userId }),
        },
        {
          beforeEnter: (to, from, next) => {
            beforeOrderGuard(to, from, next)
          },
          path: 'orders/:orderId/edit',
          name: 'EditOrder',
          component: UpsertOrder,
          props: route => ({
            user: route.params.user,
            userId: route.params.user.userId,
            order: route.params.order,
            orderId: route.params.orderId,
          }),
        },
      ],
    },
    // redirect any unknown routes
    { path: '/*', redirect: { name: 'Users' } },
  ],
})
