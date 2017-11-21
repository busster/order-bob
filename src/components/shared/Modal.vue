<template>
  <div class="modal">
    <div class="close-area" @click="toggleModal()"></div>
    <div class="modal-container col-7 bg--light">
      <slot name="header"></slot>
      <slot></slot>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SharedModal',

  methods: {
    toggleModal() {
      this.$emit('close-modal')
    },
  },
}
</script>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,0.75);
}
.modal-container {
  border: 1px solid black;
  background-color: rgba(243,247,244,1);
  border-radius: 12px;
  padding: 2em;
  margin: 2em;
  z-index: 1;
}
.modal-body {
  margin: 1em 0;
  min-height: 5em;
}
.modal-actions {
  justify-content: flex-end;
}
.close-area {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
