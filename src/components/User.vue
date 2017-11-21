<template>
  <div class="user col-9 component-container">
    <transition name="fade" mode="out-in">
      <div v-if="isRoute('User')">
        <SharedBreadCrumbs></SharedBreadCrumbs>
        <h1 class="title">{{ user.lastName }}, {{ user.firstName }}</h1>
        <div class="block-header">
          <h3 class="block-title">Orders:</h3>
          <a class="button" href="#" @click.prevent="routeToUpsertOrder({ user })">Create New Order</a>
        </div>
        <div class="well bg--ultra-light">
          <transition name="slide-fade" mode="out-in">
            <div v-if="hasOrders" :key="'orders'">
              <div class="search">
                <label class="label">Filter Orders:</label>
                <input class="text-input" type="text" name="filter-orders" placeholder="Filter by tracking number..." v-model="filterOrders">
              </div>
              <transition-group name="list">
                <div class="list-item bg--light" v-for="(order, index) in filteredOrders" :key="order.orderId">
                  <p class="list-item-title">{{ order.trackingId }}</p>
                  <div class="list-item-options">
                    <a class="list-item-option link--alert" href="#" @click.prevent="routeToUpsertOrder({ user, order })">Edit Order</a>
                    <a class="list-item-option link--secondary" href="#" @click.prevent="routeToOrder({ user, order })">View Order</a>
                  </div>
                </div>
              </transition-group>
            </div>
            <div class="none-item" v-else :key="'no-orders'">
              <p class="inline">There are currently no orders for {{ user.firstName }}. Click to </p>
              <a class="inline link--primary" href="#" @click.prevent="routeToUpsertOrder({ user })">add order</a>
              <p class="inline">.</p>
            </div>
          </transition>
        </div>
      </div>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>

<script>
import routerHelpers from '../mixins/routerHelpers'
import SharedBreadCrumbs from './shared/BreadCrumbs'

export default {
  name: 'User',
  mixins: [routerHelpers],
  components: { SharedBreadCrumbs },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      filterOrders: '',
    }
  },

  mounted() {
    if (!this.user.orders) {
      this.$store.dispatch('fetchOrders', { userId: this.user.userId, user: this.user })
    }
  },

  computed: {
    userId() {
      return this.user.userId
    },

    orders() {
      return this.user.orders || []
    },

    hasOrders() {
      return this.orders.length > 0
    },

    filteredOrders() {
      return this.orders.filter((order) => {
        const orderName = order.trackingId.toLowerCase()
        return orderName.indexOf(this.filterOrders.toLowerCase()) !== -1
      })
    },
  },
}
</script>

<style scoped>
.title {
  margin-bottom: 1em;
}

.none-item {
  margin: 3em 0;
  color: grey;
}

.inline {
  display: inline;
}

</style>
