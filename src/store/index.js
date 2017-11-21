/* eslint no-param-reassign: [
  "error", { "props": true, "ignorePropertyModificationsFor": ["state"] }
] */

import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '../services/user-service'
import OrderService from '../services/order-service'

Vue.use(Vuex)

function getUserIndex(users, user) {
  const id = user.userId || user.id
  return users.findIndex(u => u.userId === id)
}

function getOrderIndex(orders, order) {
  const id = order.orderId
  return orders.findIndex(o => o.orderId === id)
}

const store = new Vuex.Store({
  state: {
    users: [],
    notices: [],
    loading: false,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },

    upsertUser(state, user) {
      const index = getUserIndex(state.users, user)
      if (index >= 0) {
        state.users.splice(index, 1, user)
      } else {
        state.users.push(user)
      }
    },

    deleteUser(state, user) {
      const index = getUserIndex(state.users, user)
      state.users.splice(index, 1)
    },

    setOrders(state, orderData) {
      const { orders, userData } = orderData
      const { user } = userData
      const index = getUserIndex(state.users, user)
      user.orders = orders
      state.users.splice(index, 1, user)
    },

    upsertOrder(state, order) {
      const index = getUserIndex(state.users, { userId: order.userId })
      const user = state.users[index]
      const orderIndex = getOrderIndex(user.orders, order)
      if (orderIndex >= 0) {
        user.orders.splice(orderIndex, 1, order)
      } else {
        user.orders.push(order)
      }
    },

    deleteOrder(state, order) {
      const index = getUserIndex(state.users, { userId: order.userId })
      const user = state.users[index]
      const orderIndex = getOrderIndex(user.orders, order)
      user.orders.splice(orderIndex, 1)
    },

    addNotice(state, notice) {
      state.notices.push(notice)
      setTimeout(() => {
        if (state.notices.length > 0) {
          state.notices.splice(0, 1)
        }
      }, 2500)
    },

    setLoading(state, isLoading) {
      state.loading = isLoading
    },
  },
  actions: {
    fetchUsers(context) {
      return new Promise((resolve) => {
        UserService.getUsers().then((users) => {
          context.commit('setUsers', users)
          resolve()
        })
      })
    },

    getUser(context, userData) {
      return new Promise((resolve) => {
        UserService.getUser(userData).then((user) => {
          context.commit('upsertUser', user)
          resolve(user)
        })
      })
    },

    createUser(context, userData) {
      UserService.createUser(userData).then((user) => {
        context.commit('addNotice', 'Successfully created user.')
        context.commit('upsertUser', user)
      })
    },

    updateUser(context, userData) {
      UserService.updateUser(userData).then((user) => {
        context.commit('addNotice', 'Successfully updated user.')
        context.commit('upsertUser', user)
      })
    },

    deleteUser(context, userData) {
      UserService.deleteUser(userData).then((user) => {
        context.commit('addNotice', 'Successfully deleted user.')
        context.commit('deleteUser', user)
      })
    },

    fetchOrders(context, userData) {
      OrderService.getOrders(userData).then((orders) => {
        context.commit('setOrders', { orders, userData })
      })
    },

    createOrder(context, orderData) {
      OrderService.createOrder(orderData).then((order) => {
        context.commit('addNotice', 'Successfully created order.')
        context.commit('upsertOrder', order)
      })
    },

    updateOrder(context, orderData) {
      OrderService.updateOrder(orderData).then((order) => {
        context.commit('addNotice', 'Successfully updated order.')
        context.commit('upsertOrder', order)
      })
    },

    deleteOrder(context, orderData) {
      OrderService.deleteOrder(orderData).then((order) => {
        context.commit('addNotice', 'Successfully deleted order.')
        context.commit('deleteOrder', order)
      })
    },

    getOrder(context, orderData) {
      return new Promise((resolve) => {
        OrderService.getOrder(orderData).then((order) => {
          context.commit('upsertOrder', order)
          resolve(order)
        })
      })
    },

    setLoading(context, isLoading) {
      context.commit('setLoading', isLoading)
    },
  },
})

export default store
