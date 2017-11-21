/* eslint-disable */

import Vue from 'vue'
import TextInput from '@/components/shared/TextInput'

import testUtils from '../../utils.js'

const propsData = {
  modelString: 'firstName',
  label: 'First Name',
  validationList: ['length', 'specialCharacters', 'numbers'],
  placeHolder: 'First name...',
  value: 'Kindred',
}

let vm

describe('TextInput.vue', () => {
  beforeEach(() => {
    vm = testUtils.CtorConstructor(TextInput, { propsData })
  })
  
  describe('computed', () => {
    describe('textValue', () => {
      describe('get', () => {
        it('returns the value recieved from the prop value', () => {
          expect(vm.textValue).to.eql(propsData.value)
        })
      })
      describe('set', () => {
        describe('valid text', () => {
          it('emits update-text with the modelString to update and the validated text', () => {
            const newText = 'Spirited'
            const expectedValidatedText = { valid: true, text: newText }

            const emitSpy = sinon.spy(vm, '$emit')
            
            vm.textValue = newText

            expect(emitSpy.calledWith('update-text', propsData.modelString, expectedValidatedText)).to.be.true
            emitSpy.restore()
          })
        })
        describe('invalid text', () => {
          it('emits update-text with the modelString to update and the validated text and sets teh validation message', () => {
            const newText = 'Spirited123'
            const errorMessage = 'Cannot contain numbers.'
            const expectedValidatedText = { valid: false, text: newText }

            const emitSpy = sinon.spy(vm, '$emit')
            
            vm.textValue = newText

            expect(emitSpy.calledWith('update-text', propsData.modelString, expectedValidatedText)).to.be.true
            expect(vm.validationMessage).to.eql(errorMessage)
            emitSpy.restore()
          })
        })
      })
    })
  })
})
