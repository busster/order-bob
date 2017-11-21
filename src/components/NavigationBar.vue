<template>
  <div class="navigation-bar bg--light">
    <transition-group name="notice" v-bind:class="{'expand': areNotices}" class="collapse">
      <div class="notice" v-for="(notice, index) in notices" :key="index">{{ notice }}</div>
    </transition-group>
    <a class="navigation-item" href="#" @click.prevent="routeToBase()">ShipBob</a>
  </div>
</template>

<script>
import routerHelpers from '../mixins/routerHelpers'

export default {
  name: 'NavigationBar',
  mixins: [routerHelpers],
  computed: {
    notices() {
      return this.$store.state.notices
    },

    areNotices() {
      return this.notices.length > 0
    },
  },
}
</script>

<style scoped>
.collapse {
  position: absolute;
  right: 0;
  top: 0;
  transition: all 1s;
  height: 0;
}
.expand {
  height: 2em;
}
.notice {
  display: flex;
  justify-content: center;
  margin: 1em;
  border-radius: 6px;
  border: 1px solid rgba(152,195,206,0.25);
  background-color: rgba(152,195,206,0.25);
  padding: 0.5em 1em;
}
.navigation-bar {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid black;
}
.navigation-item {
  font-size: 1.25em;
  color: black;
  padding: 1em;
  transition: all 1s;
}
.navigation-item:hover {
  background-color: rgba(230,239,233, 1);
}
</style>
