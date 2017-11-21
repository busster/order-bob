/* eslint-disable */

import Vue from 'vue'
import UpsertUser from '@/components/UpsertUser'
import store from '@/store/index'

import testUtils from '../utils.js'

const mockUser = {
  firstName: 'Steven',
  lastName: 'Segal',
  userId: 1,
  orders: null,
}

let vmEdit, vmNew

describe('UpsertUser.vue', () => {
  beforeEach(() => {
    testUtils.stubAjaxCall()
    vmEdit = testUtils.CtorConstructor(UpsertUser, { store, propsData: { user: mockUser } }, false)
    vmNew = testUtils.CtorConstructor(UpsertUser, { store }, false)
  })
  afterEach(() => {
    testUtils.unwrapAjaxCall()
  })
  describe('mounted()', () => {
    it('should call setupUser if it is in edit mode', () => {
      const methodSpy = sinon.spy(vmEdit, 'setupUser')
      vmEdit.$mount()
      expect(methodSpy.called).to.be.true
      methodSpy.restore()
    })
    it('should NOT call setupUser if it is NOT in edit mode', () => {
      const methodSpy = sinon.spy(vmNew, 'setupUser')
      vmNew.$mount()
      expect(methodSpy.called).to.be.false
      methodSpy.restore()
    })
  })

  describe('computed', () => {
    describe('isEdit', () => {
      it('returns false if there is no user prop provided to the component', () => {
        expect(vmNew.isEdit).to.be.false
      })
      it('returns true if there IS a user prop provided to the component', () => {
        expect(vmEdit.isEdit).to.be.true
      })
    })
    describe('isValidInput', () => {
      it('returns a boolean based on the valid fields for first and last name', () => {
        const valid = true
        const invalid = false
        vmNew.firstName.valid = valid
        vmNew.lastName.valid = valid
        expect(vmNew.isValidInput).to.be.true

        vmNew.lastName.valid = invalid
        expect(vmNew.isValidInput).to.be.false
      })
    })
    describe('userParams', () => {
      describe('For a new user', () => {
        it('returns proper structured user parameters to be sent to the backend', () => {
          const firstName = 'Bill'
          const lastName = 'Nye'
          vmNew.firstName.value = firstName
          vmNew.lastName.value = lastName
          const expectedParams = { firstName, lastName }

          expect(vmNew.userParams).to.eql(expectedParams)
        })
      })
      describe('For an existing user', () => {
        it('returns proper structured user parameters to be sent to the backend', () => {
          const firstName = 'Bill'
          const lastName = 'Nye'
          const userId = mockUser.userId
          vmEdit.firstName.value = firstName
          vmEdit.lastName.value = lastName
          const expectedParams = { firstName, lastName, userId }

          expect(vmEdit.userParams).to.eql(expectedParams)
        })
      })
    })
  })

  describe('methods', () => {
    describe('handleUpdateText', () => {
      it('sets the value and validity of firstName and lastName', () => {
        const initialText = { value: 'Steven', valid: true }

        const firstNameModelString = 'firstName'
        const updatedText = { text: 'Bill', valid: true }
        const expectedText = { value: 'Bill', valid: true }

        vmEdit.$mount()
        expect(vmEdit.firstName).to.eql(initialText)
        vmEdit.handleUpdateText(firstNameModelString, updatedText)
        expect(vmEdit.firstName).to.eql(expectedText)
      })
    })
    describe('setupUser', () => {
      it('sets up the user data from the user prop if it is in edit mode', () => {
        const expectedFirstName = { value: 'Steven', valid: true }
        const expectedLastName = { value: 'Segal', valid: true }

        vmEdit.$mount()
        expect(vmEdit.firstName).to.eql(expectedFirstName)
        expect(vmEdit.lastName).to.eql(expectedLastName)
      })
    })
    describe('save and delete', () => {
      let expectedUserParams = {
        firstName: 'Steven',
        lastName: 'Segal',
      }
      const expectedUserParamsEdit = Object.assign({ userId: 1 }, expectedUserParams)
      describe('deleteUser', () => {
        it('should dispatch a deleteUser call to the store with the userParams', () => {
          vmEdit.$mount()
          const dispatchSpy = sinon.spy(vmEdit.$store, 'dispatch')
          vmEdit.deleteUser()
          expect(dispatchSpy.calledWith('deleteUser', expectedUserParamsEdit)).to.be.true
          dispatchSpy.restore()
        })
      })
      describe('saveUser', () => {
        describe('For a new user', () => {
          it('should return if the params are invalid', () => {
            vmNew.$mount()
            const dispatchSpy = sinon.spy(vmNew.$store, 'dispatch')
            vmNew.saveUser()
            expect(dispatchSpy.calledWith('createUser', expectedUserParams)).to.be.false
            dispatchSpy.restore()
          })
          it('should dispatch a createUser call to the store with the userParams', () => {
            const firstNameModelString = 'firstName'
            const lastNameModelString = 'lastName'
            const updatedTextFirstName = { text: 'Steven', valid: true }
            const updatedTextLastName = { text: 'Segal', valid: true }

            vmNew.$mount()
            vmNew.handleUpdateText(firstNameModelString, updatedTextFirstName)
            vmNew.handleUpdateText(lastNameModelString, updatedTextLastName)
            const dispatchSpy = sinon.spy(vmNew.$store, 'dispatch')
            vmNew.saveUser()
            expect(dispatchSpy.calledWith('createUser', expectedUserParams)).to.be.true
            dispatchSpy.restore()
          })
        })
        describe('For an existing user', () => {
          it('should dispatch a createUser call to the store with the userParams', () => {
            vmEdit.$mount()
            const dispatchSpy = sinon.spy(vmEdit.$store, 'dispatch')
            vmEdit.saveUser()
            expect(dispatchSpy.calledWith('updateUser', expectedUserParamsEdit)).to.be.true
            dispatchSpy.restore()
          })
        })
      })
    })
  })
})
