<template>
  <select class="select" @change="changeOption">
    <option value="" disabled selected>Выберите из списка</option>
    <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
    >
      {{option.name}}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: ()=>[]
    }
  },
  methods: {
    changeOption (e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style scoped>
  .select {
    border: 1px solid teal;
    background: white;
    color: teal;
    cursor: pointer;
  }
</style>