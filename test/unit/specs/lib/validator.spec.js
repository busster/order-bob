/* eslint-disable */

import Validator from '@/lib/validator'

const lengthValidator = new Validator(['length'])
const specialCharactersValidator = new Validator(['specialCharacters'])
const numbersValidator = new Validator(['numbers'])
const lettersValidator = new Validator(['letters'])

const VALIDATION_MESSAGES = {
    LENGTH: 'Must be present.',
    SPECIAL_CHARACTERS: 'Cannot contain special characters.',
    NUMBERS: 'Cannot contain numbers.',
    LETTERS: 'Cannot contain letters.',
    NONE: '',
  }


describe('Validator.js', () => {
  describe('lengthValidator', () => {
    const validLength = 'abc'
    const invalidLength = ''
    it('should return valid with no message if valid', () => {
      expect(lengthValidator(validLength)).to.eql({ valid: true, message: VALIDATION_MESSAGES.NONE })
    })
    it('should return invalid with the error message if invalid', () => {
      expect(lengthValidator(invalidLength)).to.eql({ valid: false, message: VALIDATION_MESSAGES.LENGTH })
    })
  })
  describe('specialCharactersValidator', () => {
    const validSpecialCharacters = 'abc'
    const invalidSpecialCharacters = 'a_bc'
    it('should return valid with no message if valid', () => {
      expect(specialCharactersValidator(validSpecialCharacters)).to.eql({ valid: true, message: VALIDATION_MESSAGES.NONE })
    })
    it('should return invalid with the error message if invalid', () => {
      expect(specialCharactersValidator(invalidSpecialCharacters)).to.eql({ valid: false, message: VALIDATION_MESSAGES.SPECIAL_CHARACTERS })
    })
  })
  describe('numbersValidator', () => {
    const validNumbers = 'abc'
    const invalidNumbers = 'abc123'
    it('should return valid with no message if valid', () => {
      expect(numbersValidator(validNumbers)).to.eql({ valid: true, message: VALIDATION_MESSAGES.NONE })
    })
    it('should return invalid with the error message if invalid', () => {
      expect(numbersValidator(invalidNumbers)).to.eql({ valid: false, message: VALIDATION_MESSAGES.NUMBERS })
    })
  })
  describe('lettersValidator', () => {
    const validLetters = '123'
    const invalidLetters = 'abc123'
    it('should return valid with no message if valid', () => {
      expect(lettersValidator(validLetters)).to.eql({ valid: true, message: VALIDATION_MESSAGES.NONE })
    })
    it('should return invalid with the error message if invalid', () => {
      expect(lettersValidator(invalidLetters)).to.eql({ valid: false, message: VALIDATION_MESSAGES.LETTERS })
    })
  })
})