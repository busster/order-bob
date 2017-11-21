<template>
  <div id="app">
    <NavigationBar></NavigationBar>
    <div class="loading-bg flex center" v-bind:class="{'loading': loading}">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar'


export default {
  name: 'app',
  components: {
    NavigationBar,
  },

  computed: {
    loading() {
      return this.$store.state.loading
    },
  },
}
</script>

<style scoped>
.loading-bg {
  transition: all 750ms;
}
.loading{
  opacity: 0.25;
}
</style>
