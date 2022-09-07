<template>
  <div>
    <!--    Поиск-->
    <my-input :model-value="searchValue" @update:model-value="setSearchValue" v-focus placeholder="Поиск по названию"/>

    <!--    Кнопки-->
    <div class="head__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
    </div>

    <!--    Форма создания поста-->
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>

    <!--    Список постов-->
    <my-spinner v-if="isPostLoading"/>
    <post-list v-else v-bind:posts="sortedAndSearchedPosts" @remove="removePost"/>

    <!--    Наблюдаемый обьект для "вечного" скролла-->
    <div class="observable" ref="observablestore"></div>
  </div>
</template>
<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import {mapState, mapGetters, mapMutations, mapActions} from "vuex"
export default {
  components: {PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
    }
  },
  mounted() {
    //Получаем первую партию постов
    this.fetchPosts()
    // Подписываемся на попадания "observerable-а" в область видимости браузера для динамической подгрузки постов
    //Опции
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    //Колбек который выполнится при пересечении наблюдаемого обьекта
    const callback = (entries, observer) => {
      //Если обьект пересечен и текущая страница < общего количества страниц
      //Получилось удобно, т.к. totalPages изначально = 0, а page=1, что блокирует срабатывание колбека
      // при монтировании наблюдаемого обьекта
      if(entries[0].isIntersecting && this.page < this.totalPages){
        this.loadMorePosts()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    //Ссылка а наблюдаемый обьект
    const target = this.$refs.observablestore
    observer.observe(target);
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchValue: "post/setSearchValue",
      setSelectedSort: "post/setSelectedSort",
      setPosts: "post/setPosts"
    }),
    ...mapActions({
      fetchPosts: "post/fetchPosts",
      loadMorePosts: "post/loadMorePosts"
    }),
    createPost(post) {
      this.setPosts([...this.posts, post])
      this.dialogVisible = false;
    },
    removePost(post) {
      this.setPosts(this.posts.filter(el=>el.id !==post.id))
    },
    showDialog () {
      this.dialogVisible = true;
    },

  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchValue: state => state.post.searchValue,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts"
    }),
  },
  watch: {

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