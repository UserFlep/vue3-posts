<template>
  <div>
    <h1>Описание поста с ID = {{$route.params.id}}</h1>
    <div v-for="[key, value] in Object.entries(post)" :key="key">{{key}}: {{ value }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {},
    }
  },
  mounted() {
    this.fetchPost()
  },
  methods: {
    async fetchPost(){
      try {
        console.log("fetchPost")
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/posts/${this.$route?.params?.id}`);
        this.post = response.data
      } catch (e){
        console.log(e)
      }

    }
  }
}
</script>

<style scoped>

</style>