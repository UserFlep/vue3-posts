<template>
  <div class="app">
    //Поиск
    <my-input v-model="searchValue" placeholder="Поиск по названию"/>

    //Кнопки
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>

    //Форма создания поста
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>

    //Спинер
    <my-spinner v-if="isPostLoading"/>

    //Список постов
    <post-list v-else v-bind:posts="sortedAndSearchedPosts" @remove="removePost"/>

    //Наблюдаемый обьект для "вечного" скролла
    <div class="observable" ref="observable"></div>
  </div>
</template>
<script>
  import PostList from "@/components/PostList";
  import PostForm from "@/components/PostForm";
  import axios from "axios";
  export default {
    components: {PostList, PostForm},
    data() {
      return {
        posts: [],
        dialogVisible: false,
        isPostLoading: false,
        page: 1,
        limit: 10,
        totalPages: 0,
        selectedSort: '',
        sortOptions: [
          {value: "title", name: "По названию"},
          {value: "body", name: "По описанию"},
        ],
        searchValue: '',
      }
    },
    mounted() {
      //Получаем первую партию постов
      this.fetchPosts()
      //Подписываемся на попадания "observerable-а" в область видимости браузера для динамической подгрузки постов
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
      const target = this.$refs.observable;
      observer.observe(target);
    },
    methods: {
      createPost(post) {
        this.posts.push(post)
        this.dialogVisible = false;
      },
      removePost(post) {
        this.posts = this.posts.filter(el=>el.id !==post.id)
      },
      showDialog () {
        this.dialogVisible = true;
      },
      // changePage (pageNumber) {
      //   this.page = pageNumber;
      // },
      async fetchPosts () {
        try {
          console.log("fetchPosts")
          this.isPostLoading = true;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit,
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
          this.posts = response.data;
        } catch (e){
          alert(e)
        } finally {
          this.isPostLoading = false;
        }
      },
      async loadMorePosts () {
        try {
          console.log("loadMorePosts")
          this.page +=1;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit,
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
          this.posts = [...this.posts, ...response.data];
        } catch (e){
          alert(e)
        }
      }
    },
    computed: {
      sortedPosts() {
        return [...this.posts].sort((post1, post2) =>
            post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        )
      },
      sortedAndSearchedPosts () {
        return this.sortedPosts.filter(post =>
            post.title.toLowerCase().includes(this.searchValue.toLowerCase())
        )
      }
    },
    watch: {
      // page(){
      //   this.fetchPosts()
      // }
    }
  }
</script>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .app {
    padding: 20px;
  }
  .app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
  .observable {
    height: 50px;
  }
</style>