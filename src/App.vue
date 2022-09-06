<template>
  <div class="app">
    <my-input v-model="searchValue" placeholder="Поиск по названию"/>
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>


    <my-spinner v-if="isPostLoading"/>
    <post-list v-else v-bind:posts="sortedAndSearchedPosts" @remove="removePost"/>

    <my-page-wrapper v-show="!isPostLoading" :totalPages="totalPages" v-model="page"/>
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
      this.fetchPosts()
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
      changePage (pageNumber) {
        this.page = pageNumber;
      },
      async fetchPosts () {
        try {
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
      page(){
        this.fetchPosts()
      }
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
</style>