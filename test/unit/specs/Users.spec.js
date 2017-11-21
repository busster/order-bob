/* eslint-disable */

import Vue from 'vue'
import Users from '@/components/Users'
import store from '@/store/index'

import testUtils from '../utils.js'

const mockUser = {
  firstName: 'Steven',
  lastName: 'Segal',
  userId: 1,
  orders: null,
}

let vm

describe('Users.vue', () => {
  beforeEach(() => {
    testUtils.stubAjaxCall()
    vm = testUtils.CtorConstructor(Users, { store }, false)
  })
  afterEach(() => {
    testUtils.unwrapAjaxCall()
  })
  describe('mounted()', () => {
    it('should dispatch a call on mounted if there are no users', () => {
      const dispatchSpy = sinon.spy(vm.$store, 'dispatch')
      vm.$mount()
      expect(dispatchSpy.calledWith('fetchUsers')).to.be.true
      dispatchSpy.restore()
    })
    it('should NOT dispatch a call on mounted if there ARE users', () => {
      const dispatchSpy = sinon.spy(vm.$store, 'dispatch')
      vm.$store.state.users = [mockUser]
      vm.$mount()
      expect(dispatchSpy.calledWith('fetchUsers')).to.be.false
      dispatchSpy.restore()
    })
  })

  describe('computed', () => {
    beforeEach(() => {
      vm.$store.state.users = [mockUser]
      vm.$mount()
    })
    describe('users', () => {
      it('should return users from the store', () => {
        expect(vm.users).to.eql([mockUser])
      })
    })
    describe('hasUsers', () => {
      it('should return a boolean depending on if there are users present in the store', () => {
        expect(vm.hasUsers).to.be.true

        vm.$store.state.users = []
        expect(vm.hasUsers).to.be.false
      })
    })
    describe('filteredUsers', () => {
      it('should return an array including users whose full name that contain the filterUsers pattern', () => {
        vm.filterUsers = 'Ste'
        expect(vm.filteredUsers).to.include(mockUser)

        vm.filterUsers = 'Bar'
        expect(vm.filteredUsers).not.to.include(mockUser)        
      })
    })
  })
})
