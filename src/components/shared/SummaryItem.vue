<template>
  <div class="summary-line">
    <p class="summary-label">{{ textLabel }}:</p>
    <div class="summary-value">
      <p>{{ textValue }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SharedSummaryItem',

  props: {
    textLabel: {
      type: String,
      required: true,
    },
    textValue: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.summary-line {
  display: flex;
  margin-bottom: 0.5em;
}
.summary-label {
  font-weight: bold;
  min-width: 10em;
}
.summary-value {
  display: flex;
  justify-content: flex-start;
}
</style>
