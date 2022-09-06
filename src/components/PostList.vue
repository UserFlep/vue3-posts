<template>
  <div v-if="posts.length > 0">
    <h2>Список постов</h2>
    <transition-group name="post-list">
      <post-item
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else class="error__message">
    Списов постов пуст!
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  },

}
</script>

<style scoped>
  .error__message{
    color: red;
  }
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all .5s ease;
  }
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .post-list-move {
    transition: transform 0.8s ease;
  }
</style>