<template>
  <div class="page_wrapper">
    <div
        class="page"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{
            'current__page': pageNumber === modelValue
          }"
        @click="changePage(pageNumber)"
    >
      {{pageNumber}}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-page-wrapper",
  props: {
    modelValue: {
      type: Number
    },
    totalPages: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changePage(pageNumber){
      this.$emit("update:modelValue", pageNumber)
    }
  }
}
</script>

<style scoped>
  .page_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  .page {
    margin: 0 5px;
    padding: 10px 15px;
    border: 1px solid teal;
    color: teal;
    cursor: pointer;
  }
  .page:hover {
    background: teal;
    color: white;
    border-color: teal;
  }
  .current__page {
    background: teal;
    color: white;
    border-color: teal;
  }
</style>