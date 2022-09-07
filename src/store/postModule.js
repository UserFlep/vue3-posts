import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            )
        },
        sortedAndSearchedPosts (state, getters) {
            return getters.sortedPosts.filter(post =>
                post.title.toLowerCase().includes(state.searchValue.toLowerCase())
            )
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setIsPostsLoading(state, flag) {
            state.isPostLoading = flag
        },
        setPage(state, page) {
            state.page = page
        },
        setLimit(state, limit) {
            state.limit = limit
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setSortOptions(state, sortOptions){
            state.sortOptions = sortOptions
        },
        setSearchValue(state, searchValue){
            state.searchValue = searchValue
        },
    },
    actions: {
        async fetchPosts ({state, commit}) {
            try {
                console.log("fetchPosts")
                commit('setIsPostsLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data);
            } catch (e){
                console.log(e)
            } finally {
                commit('setIsPostsLoading', false);
            }
        },
        async loadMorePosts ({state, commit}) {
            try {
                console.log("loadMorePosts")
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e){
                console.log(e)
            }
        },
    },
    namespaced: true,
}