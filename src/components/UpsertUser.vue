<template>
  <div class="user col-9 component-container">
    <SharedBreadCrumbs></SharedBreadCrumbs>
    <h1 class="title">{{ action }} User</h1>
    <SharedTextInput
      :modelString="'firstName'"
      :label="'First Name'" 
      :validationList="textValidations"
      :placeholder="'First name...'"
      :value="firstName.value"
      @update-text="handleUpdateText"
    ></SharedTextInput>
    <SharedTextInput
      :modelString="'lastName'"
      :label="'Last Name'" 
      :validationList="textValidations"
      :placeholder="'Last name...'"
      :value="lastName.value"
      @update-text="handleUpdateText"
    ></SharedTextInput>
    <div class="actions">
      <a class="action--spaced link--alert" href="#" v-if="isEdit" @click.prevent="toggleConfirmDelete()">Delete User</a>
      <div class="action--row">
        <a class="action--left button button--alert" href="#" @click.prevent="cancelAction()">Cancel</a>
        <a class="action--left button button--save" href="#" v-bind:class="{'disabled' : !isValidInput}" @click.prevent="saveUser()">Save User</a>
      </div>
    </div>
    <transition name="modal-fade">
      <SharedModal v-if="showDeleteConfirmation" @close-modal="toggleConfirmDelete()">
        <h1 slot="header" class="modal-header">Confirm Delete</h1>
        <p class="modal-body">Are you sure you want to delete this user?</p>
        <div slot="actions" class="action--row modal-actions">
          <a class="action--right button" href="#" @click.prevent="toggleConfirmDelete()">Cancel</a>
          <a class="action--right button button--alert" href="#" @click.prevent="deleteUser()">Delete</a>
        </div>
      </SharedModal>
    </transition>
  </div>
</template>

<script>
import routerHelpers from '../mixins/routerHelpers'
import SharedModal from './shared/Modal'
import SharedTextInput from './shared/TextInput'
import SharedBreadCrumbs from './shared/BreadCrumbs'

export default {
  name: 'UpsertUser',
  mixins: [routerHelpers],
  components: { SharedModal, SharedTextInput, SharedBreadCrumbs },

  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },

  data() {
    return {
      firstName: {
        value: '',
        valid: false,
      },
      lastName: {
        value: '',
        valid: false,
      },
      showDeleteConfirmation: false,
      textValidations: ['length', 'specialCharacters', 'numbers'],
    }
  },

  mounted() {
    if (this.isEdit) {
      this.setupUser(this.user)
    }
  },

  computed: {
    isEdit() {
      return this.userId !== undefined
    },

    userId() {
      return this.user.userId || this.$route.params.id
    },

    action() {
      return this.isEdit ? 'Edit' : 'New'
    },

    isValidInput() {
      return this.firstName.valid && this.lastName.valid
    },

    userParams() {
      const firstName = this.firstName.value
      const lastName = this.lastName.value
      const params = { firstName, lastName }

      if (this.isEdit) { return Object.assign(params, { userId: this.userId }) }
      return params
    },
  },

  methods: {
    handleUpdateText(model, updatedText) {
      const { valid, text } = updatedText
      this[model].valid = valid
      this[model].value = text
    },

    setupUser(user) {
      const { firstName, lastName } = user
      this.firstName.value = firstName
      this.firstName.valid = true
      this.lastName.value = lastName
      this.lastName.valid = true
    },

    toggleConfirmDelete() {
      this.showDeleteConfirmation = !this.showDeleteConfirmation
    },

    deleteUser() {
      this.$store.dispatch('deleteUser', this.userParams)
      this.routeToBase()
    },

    cancelAction() {
      this.routeToBase()
    },

    saveUser() {
      if (!this.isValidInput) { return }
      if (this.isEdit) {
        this.$store.dispatch('updateUser', this.userParams)
      } else {
        this.$store.dispatch('createUser', this.userParams)
      }
      this.routeToBase()
    },
  },
}
</script>

<style scoped>
.title {
  margin-bottom: 1em;
}
.actions {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}
.action--row {
  display: flex;
}
.action--spaced {
  margin: 1em 0;
  align-self: flex-start;
}
.action--left {
  margin-right: 1em;
}
.action--right {
  margin-left: 1em;
}


.disabled {
  cursor: default;
  background-color: initial;
  color: black;
  opacity: 0.5;
  transition: all 0.25s;
}
</style>
