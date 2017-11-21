/* eslint-disable */

import Vue from 'vue'
import store from '@/store/index'

const mockOrder1 = {
  location: null,
  orderId: 1,
  trackingId: '123abc',
  userId: 2,
}

const mockOrder2 = {
  location: null,
  orderId: 2,
  trackingId: '456def',
  userId: 2,
}

const mockUser1 = {
  firstName: 'Steven',
  lastName: 'Segal',
  userId: 1,
  orders: null,
}

const mockUser2 = {
  firstName: 'Tony',
  lastName: 'Hawk',
  userId: 2,
  orders: [mockOrder1],
}

function setupBlankStore() {
  store.state.users = []
  store.state.notices = []
  store.state.loading = false
}

function setupSeededUsers() {
  store.state.users = [Object.assign({}, mockUser1), Object.assign({}, mockUser2)]
  store.state.notices = []
  store.state.loading = false
}

function findUserIndex(usersArray, user) {
  return usersArray.findIndex(u => u.userId === user.userId)
}


describe('index.js', () => {
  describe('mutations', () => {
    afterEach(() => {
      setupBlankStore()
    })
    describe('upsertUser', () => {
      it('pushes a new user onto the users set if it doesnt exist', () => {
        setupBlankStore()
        store.commit('upsertUser', mockUser1)
        expect(store.state.users).to.eql([mockUser1])
      })
      it('updates the user object in the store if it already exists', () => {
        const updatedUser = Object.assign({}, mockUser1)
        updatedUser.firstName = 'Gir'

        setupSeededUsers()
        store.commit('upsertUser', updatedUser)
        expect(store.state.users).not.to.eql([mockUser1, mockUser2])
        expect(store.state.users).to.eql([updatedUser, mockUser2])
      })
    })
    describe('deleteUser', () => {
      it('removes a user from the users set', () => {
        setupSeededUsers()
        store.commit('deleteUser', mockUser1)
        expect(store.state.users).not.to.include(mockUser1)
      })
    })
    describe('setOrders', () => {
      it('sets the orders for a user', () => {
        const orderData = {
          orders: [mockOrder2],
          userData: { user: mockUser1 },
        }
        setupSeededUsers()
        store.commit('setOrders', orderData)

        const userIndex = findUserIndex(store.state.users, mockUser1)

        expect(store.state.users[userIndex].orders).to.eql([mockOrder2])
      })
    })
    describe('upsertOrder', () => {
      it('pushes a new order onto the order set if it doesnt exist', () => {
        const mockOrderData = Object.assign({}, mockOrder2)
        mockOrderData.userId = mockUser1.userId

        setupSeededUsers()
        store.commit('upsertOrder', mockOrderData)

        const userIndex = findUserIndex(store.state.users, mockUser1)

        expect(store.state.users[userIndex].orders).to.eql([mockOrderData])
      })
      it('updates an existing order if it already exist', () => {
        const mockOrderData = Object.assign({}, mockOrder1)
        mockOrderData.trackingId = 'blahblahblah'

        setupSeededUsers()
        store.commit('upsertOrder', mockOrderData)

        const userIndex = findUserIndex(store.state.users, mockUser2)

        expect(store.state.users[userIndex].orders).to.eql([mockOrderData])
      })
    })
    describe('deleteOrder', () => {
      it('removes an order from the orders set', () => {
        setupSeededUsers()

        store.commit('deleteOrder', mockOrder1)

        const userIndex = findUserIndex(store.state.users, mockUser2)
        expect(store.state.users[userIndex].orders).to.eql([])
      })
    })
  })
})
