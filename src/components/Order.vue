<template>
  <div>
    <SharedBreadCrumbs></SharedBreadCrumbs>
    <h1 class="title">Order Summary</h1>
    <SharedSummaryItem :textValue="userName" :textLabel="'Order For'"></SharedSummaryItem>
    <SharedSummaryItem :textValue="order.trackingId" :textLabel="'Tracking ID'"></SharedSummaryItem>
    <SharedSummaryItem :textValue="order.location.name" :textLabel="'Name'"></SharedSummaryItem>
    <SharedSummaryItem :textValue="order.location.street" :textLabel="'Street Address'"></SharedSummaryItem>
    <SharedSummaryItem :textValue="order.location.city" :textLabel="'City'"></SharedSummaryItem>
    <SharedSummaryItem :textValue="order.location.state" :textLabel="'State'"></SharedSummaryItem>
    <SharedSummaryItem :textValue="order.location.zipCode" :textLabel="'Zip Code'"></SharedSummaryItem>
  </div>
</template>

<script>
import routerHelpers from '../mixins/routerHelpers'
import SharedSummaryItem from './shared/SummaryItem'
import SharedBreadCrumbs from './shared/BreadCrumbs'

export default {
  name: 'Order',
  mixins: [routerHelpers],
  components: { SharedSummaryItem, SharedBreadCrumbs },

  props: {
    user: {
      type: Object,
      required: true,
    },
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    userName() {
      return `${this.user.lastName}, ${this.user.firstName}`
    },
  },
}
</script>

<style scoped>
.title {
  margin-bottom: 1em;
}
</style>
