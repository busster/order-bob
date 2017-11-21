<template>
  <div class="breadcrumbs">
    <div class="breadcrumb-item" v-for="(breadcrumb, index) in breadcrumbs">
      <a href="#" class="link--primary" :key="index" @click.prevent="executeRoute(breadcrumb)" v-bind:class="{'router-link-exact-active': isLastBreadcrumb(index)}">{{ breadcrumb.name }}</a>
      <p class="breadcrumb-divider" v-if="!isLastBreadcrumb(index)"> > </p>
    </div>
  </div>
</template>

<script>
import routerHelpers from '../../mixins/routerHelpers'

export default {
  name: 'SharedBreadCrumbs',
  mixins: [routerHelpers],
  data() {
    return {
      breadcrumbs: [],
    }
  },

  mounted() {
    this.breadcrumbs = this.$route.meta.breadcrumbs
  },

  methods: {
    isLastBreadcrumb(index) {
      return index >= this.breadcrumbs.length - 1
    },

    executeRoute(breadcrumb) {
      this[breadcrumb.routeAction](breadcrumb.props)
    },
  },
}
</script>

<style scoped>
.breadcrumbs {
  display: flex;
  margin-bottom: 0.5em;
}
.breadcrumb-item {
  display: flex;
}
.breadcrumb-divider {
  margin: 0 0.5em;
}
</style>
