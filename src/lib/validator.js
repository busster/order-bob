function Validator(validations) {
  this.validationMessages = {
    length: 'Must be present.',
    specialCharacters: 'Cannot contain special characters.',
    numbers: 'Cannot contain numbers.',
    letters: 'Cannot contain letters.',
    none: '',
  }

  this.length = text => text.length > 0
  this.specialCharacters = text => !/[~\@`!#$%\^&*+=_\-\[\]\\';.\(\),\/{}|\\":<>\?]/g.test(text) // eslint-disable-line
  this.numbers = text => !/[0-9]/g.test(text)
  this.letters = text => !/[a-zA-Z]/g.test(text)

  return (text) => {
    let valid = true
    let message = this.validationMessages.none
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 0; i < validations.length; i++) {
      const validatorKey = validations[i]
      valid = this[validatorKey](text)

      if (!valid) {
        message = this.validationMessages[validatorKey]
        break
      }
    }

    return { valid, message }
  }
}

export default Validator
