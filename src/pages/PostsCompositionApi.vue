<template>
  <div>
    <!--    Поиск-->
    <my-input v-model="searchValue" v-focus placeholder="Поиск по названию"/>

    <!--    Кнопки-->
    <div class="head__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>

    <!--    Форма создания поста-->
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>

    <!--    Список постов-->
    <my-spinner v-if="isPostLoading"/>
    <post-list v-else v-bind:posts="sortedAndSearchedPosts" @remove="removePost"/>

    <!--    Наблюдаемый обьект для "вечного" скролла-->
    <div class="observable" ref="observable"></div>
  </div>
</template>
<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import MyButton from "@/components/UI/MyButton";
import {usePosts, useSortedAndSearchedPosts, useSortedPosts} from "@/hooks";
import {ref, watchEffect} from "vue";

export default {
  components: {MyButton, PostList, PostForm},
  data() {
    return {
      sortOptions: [
        {value: "title", name: "По названию"},
        {value: "body", name: "По описанию"},
      ],
    }
  },
  setup(props){
    const observable = ref(null);
    const page = ref(1);
    const limit = ref(10);
    const {posts, isPostLoading, totalPages} = usePosts(page, limit);
    const {selectedSort, sortedPosts} = useSortedPosts(posts);
    const {searchValue, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);
    const dialogVisible = ref(false)

    const createPost = (post) => {
      posts.value.push(post)
      dialogVisible.value = false;
    }
    const removePost = (post) => {
      posts.value = posts.value.filter(el=>el.id !==post.id)
    }
    const showDialog = () => {
      dialogVisible.value = true;
    }

    watchEffect(()=>{
      const options = {
        rootMargin: '0px',
        threshold: 1.0
      }
      const callback = (entries, observer) => {
        if(entries[0].isIntersecting && page.value < totalPages.value){
          page.value++;
        }
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(observable.value);
    },{flush: 'post'})

    return {
      observable,
      page,
      posts,
      sortedPosts,
      sortedAndSearchedPosts,
      isPostLoading,
      totalPages,
      selectedSort,
      searchValue,
      dialogVisible,
      createPost,
      removePost,
      showDialog
    }
  }
}
</script>
<style scoped>
.head__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.observable {
  height: 50px;
}
</style>