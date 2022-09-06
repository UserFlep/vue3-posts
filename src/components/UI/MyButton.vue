<template>
  <button class="btn">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  border: 1px solid teal;
  color: teal;
  background: none;
  cursor: pointer;
  transition: all .3s ease;
}
.btn:hover {
  transition: all .3s ease;
  background: teal;
  color: white;
}
</style>