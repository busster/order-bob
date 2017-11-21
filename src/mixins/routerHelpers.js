const routerHelpers = {
  methods: {
    routeToBase() {
      this.$router.push({ name: 'Users' })
    },

    routeToUpsertUser(options = {}) {
      const { user } = options
      if (user) {
        this.$router.push({ name: 'EditUser', params: { userId: user.userId, user } })
      } else {
        this.$router.push({ name: 'NewUser' })
      }
    },
    routeToUser(options) {
      const { user } = options
      this.$router.push({ name: 'User', params: { userId: user.userId, user } })
    },

    routeToUpsertOrder(options) {
      const { user, order } = options
      if (order) {
        this.$router.push({ name: 'EditOrder', params: { user, order, orderId: order.orderId } })
      } else {
        this.$router.push({ name: 'NewOrder', params: { user } })
      }
    },

    routeToOrder(options) {
      const { user, order } = options
      this.$router.push({ name: 'Order', params: { user, order, orderId: order.orderId } })
    },

    isRoute(name) {
      return this.$route.name === name
    },
  },
}

export default routerHelpers
