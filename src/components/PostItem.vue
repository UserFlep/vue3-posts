<template>
  <div class="post">
    <div>
      <div>{{post.id}}</div>
      <div><strong>Название </strong>{{ post.title }}</div>
      <div><strong>Описание </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button class="post__btn" @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button class="post__btn" @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    post: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
  .post {
    padding: 15px;
    margin-top: 15px;
    border: 2px solid teal;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post__btns {
    display: flex;
  }
  .post__btn {
    margin-left: 10px;
  }
</style>