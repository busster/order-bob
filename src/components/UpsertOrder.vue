<template>
  <div>
    <SharedBreadCrumbs></SharedBreadCrumbs>
    <h1 class="title">{{ action }} Order</h1>
    <SharedTextInput
      :modelString="'trackingId'"
      :label="'Tracking ID'" 
      :validationList="presenceValidation"
      :placeholder="'Tracking id...'"
      :value="trackingId.value"
      @update-text="handleUpdateText"
    ></SharedTextInput>
    <SharedTextInput
      :modelString="'street'"
      :label="'Street'" 
      :validationList="presenceValidation"
      :placeholder="'Street...'"
      :value="street.value"
      @update-text="handleUpdateText"
    ></SharedTextInput>
    <SharedTextInput
      :modelString="'name'"
      :label="'Name'" 
      :validationList="presenceValidation"
      :placeholder="'Name...'"
      :value="name.value"
      @update-text="handleUpdateText"
    ></SharedTextInput>
    <SharedTextInput
      :modelString="'city'"
      :label="'City'" 
      :validationList="presenceValidation"
      :placeholder="'City...'"
      :value="city.value"
      @update-text="handleUpdateText"
    ></SharedTextInput>
    <SharedTextInput
      :modelString="'state'"
      :label="'State'" 
      :validationList="presenceValidation"
      :placeholder="'State...'"
      :value="state.value"
      @update-text="handleUpdateText"
    ></SharedTextInput>
    <SharedTextInput
      :modelString="'zipCode'"
      :label="'Zip Code'" 
      :validationList="zipCodeValidation"
      :placeholder="'Zip code...'"
      :value="zipCode.value"
      @update-text="handleUpdateText"
    ></SharedTextInput>
    <div class="actions">
      <a class="action--spaced link--alert" href="#" v-if="isEdit" @click.prevent="toggleConfirmDelete()">Delete Order</a>
      <div class="action--row">
        <a class="action--left button button--alert" href="#" @click.prevent="cancelAction()">Cancel</a>
        <a class="action--left button button--save" href="#" v-bind:class="{'disabled' : !isValidInput}" @click.prevent="saveOrder()">Save Order</a>
      </div>
    </div>
    <transition name="modal-fade">
      <SharedModal v-if="showDeleteConfirmation" @close-modal="toggleConfirmDelete()">
        <h1 slot="header" class="modal-header">Confirm Delete</h1>
        <p class="modal-body">Are you sure you want to delete this order?</p>
        <div slot="actions" class="action--row modal-actions">
          <a class="action--right button" href="#" @click.prevent="toggleConfirmDelete()">Cancel</a>
          <a class="action--right button button--alert" href="#" @click.prevent="deleteOrder()">Delete</a>
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
  name: 'UpsertOrder',
  mixins: [routerHelpers],
  components: { SharedModal, SharedTextInput, SharedBreadCrumbs },

  props: {
    order: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      trackingId: {
        value: '',
        valid: false,
      },
      street: {
        value: '',
        valid: false,
      },
      name: {
        value: '',
        valid: false,
      },
      city: {
        value: '',
        valid: false,
      },
      state: {
        value: '',
        valid: false,
      },
      zipCode: {
        value: '',
        valid: false,
      },
      locationId: '',
      showDeleteConfirmation: false,
      presenceValidation: ['length'],
      zipCodeValidation: ['length', 'letters'],
    }
  },

  mounted() {
    if (this.isEdit) {
      this.setupOrder(this.order)
    }
  },

  computed: {
    isEdit() {
      return this.orderId !== undefined
    },

    orderId() {
      return this.order.orderId || this.$route.params.orderId
    },

    action() {
      return this.isEdit ? 'Edit' : 'New'
    },

    isValidInput() {
      return this.trackingId.valid &&
        this.street.valid &&
        this.name.valid &&
        this.city.valid &&
        this.state.valid &&
        this.zipCode.valid
    },

    orderParams() {
      const userId = this.user.userId
      const trackingId = this.trackingId.value
      const location = {
        street: this.street.value,
        name: this.name.value,
        city: this.city.value,
        state: this.state.value,
        zipCode: this.zipCode.value,
      }
      const params = { trackingId, userId, location }

      if (this.isEdit) {
        const editParams = Object.assign(params, { orderId: this.orderId })
        const editLocation = editParams.location
        editLocation.locationId = this.locationId
        editLocation.orderId = this.orderId
        return editParams
      }
      return params
    },
  },

  methods: {
    handleUpdateText(model, updatedText) {
      const { valid, text } = updatedText
      this[model].valid = valid
      this[model].value = text
    },

    setupOrder(order) {
      const { location, trackingId } = order
      const { street, name, city, state, zipCode, locationId } = location
      this.street.value = street
      this.street.valid = true
      this.name.value = name
      this.name.valid = true
      this.city.value = city
      this.city.valid = true
      this.state.value = state
      this.state.valid = true
      this.zipCode.value = zipCode
      this.zipCode.valid = true
      this.trackingId.value = trackingId
      this.trackingId.valid = true
      this.locationId = locationId
    },

    toggleConfirmDelete() {
      this.showDeleteConfirmation = !this.showDeleteConfirmation
    },

    deleteOrder() {
      this.$store.dispatch('deleteOrder', this.orderParams)
      this.routeToUser({ user: this.user })
    },

    cancelAction() {
      this.routeToUser({ user: this.user })
    },

    saveOrder() {
      if (!this.isValidInput) { return }
      if (this.isEdit) {
        this.$store.dispatch('updateOrder', this.orderParams)
      } else {
        this.$store.dispatch('createOrder', this.orderParams)
      }
      this.routeToUser({ user: this.user })
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
