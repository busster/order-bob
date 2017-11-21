<template>
  <div class="text-input-container">
    <label class="label">{{ label }}:</label>
    <transition name="fade">
      <p v-if="hasValidationMessage" class="validation">{{ validationMessage }}</p>
    </transition>
    <input v-bind:class="{'invalid': hasValidationMessage}" class="text-input" type="text" v-bind:placeholder="placeholder" v-model="textValue">
  </div>
</template>

<script>
import Validator from '../../lib/validator'

export default {
  name: 'SharedTextInput',
  props: {
    modelString: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    validationList: {
      type: Array,
      required: false,
      default: () => ([]),
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      validationMessage: '',
    }
  },

  computed: {
    textValue: {
      get() {
        return this.value
      },
      set(newValue) {
        const validator = new Validator(this.validationList)
        const { valid, message } = validator(newValue)
        this.validationMessage = message
        this.$emit('update-text', this.modelString, { valid, text: newValue })
      },
    },
    hasValidationMessage() {
      return this.validationMessage.length > 0
    },
  },
}
</script>

<style scoped>
.validation {
  color: red;
  transition: all 0.3s;
}
.invalid {
  border-color: red;
  transition: all 0.3s;
}
.text-input-container {
  margin-bottom: 0.5em;
}
.text-input-container:last-of-type {
  margin-bottom: 0;
}
</style>
