<template>
  <div class="users col-9 component-container">
    <div class="block-header">
      <h3 class="block-title">Users:</h3>
      <a class="button" href="#" @click.prevent="routeToUpsertUser()">Create New User</a>
    </div>
    <div class="well bg--ultra-light">
      <transition name="slide-fade" mode="out-in">
        <div v-if="hasUsers" :key="'users'">
          <div class="search">
            <label class="label">Filter Users:</label>
            <input class="text-input" type="text" name="filter-users" placeholder="Filter by name..." v-model="filterUsers">
          </div>
          <transition-group name="list">
            <div class="list-item bg--light" v-for="(user, index) in filteredUsers" :key="user.userId">
              <p class="list-item-title">{{ user.lastName }}, {{ user.firstName }}</p>
              <div class="list-item-options">
                <a class="list-item-option link--alert" href="#" @click.prevent="routeToUpsertUser({ user })">Edit User</a>
                <a class="list-item-option link--secondary" href="#" @click.prevent="routeToUser({ user })">Orders</a>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="none-item" v-else :key="'no-users'">
          <p class="inline">There are currently no created users. Click to </p>
          <a class="inline link--primary" href="#" @click.prevent="routeToUpsertUser()">create user</a>
          <p class="inline">.</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import routerHelpers from '../mixins/routerHelpers'

export default {
  name: 'Users',
  mixins: [routerHelpers],

  data() {
    return {
      filterUsers: '',
    }
  },

  mounted() {
    if (this.users.length > 0) { return }
    this.$store.dispatch('fetchUsers')
  },

  computed: {
    users() {
      return this.$store.state.users
    },

    hasUsers() {
      return this.users.length > 0
    },

    filteredUsers() {
      return this.users.filter((user) => {
        const name = `${user.lastName.toLowerCase()} ${user.firstName.toLowerCase()}`
        return name.indexOf(this.filterUsers.toLowerCase()) !== -1
      })
    },
  },
}
</script>

<style scoped>
.none-item {
  margin: 3em 0;
  color: grey;
}

.inline {
  display: inline;
}
</style>
