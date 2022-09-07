<template>
  <form @submit.prevent>
    <h3>Создание поста</h3>
    <my-input class="input" v-focus  v-model="post.title" placeholder="Название"/>
    <my-input class="input"  v-model="post.body" placeholder="Описание"/>
    <my-button class="btn" @click="createPost">Создать</my-button>
  </form>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost () {
      this.post.id = Date.now();
      this.$emit('create', this.post)
      //Очищаем
      this.post = {
        title: '',
        body: ''
      }
    },
  },
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  .input{
    margin-top: 10px;
  }
  .btn {
    align-self: self-end;
    margin-top: 15px;
  }
</style>