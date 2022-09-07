import axios from "axios";
import {ref, onMounted, watch} from "vue";

export function usePosts(page, limit) {
    const isPostLoading = ref(false);
    const totalPages = ref(0);
    const posts = ref([]);

    const fetching = async () => {
        try {
            if(page.value === 1){
                isPostLoading.value = true;
            }
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/posts`, {
                params: {
                    _page: page.value,
                    _limit: limit.value,
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value);
            if(page.value === 1){
                posts.value = response.data;
                return
            }
            posts.value = [...posts.value, ...response.data]
        } catch (e) {
            alert(e)
        } finally {
            if(isPostLoading.value)
                isPostLoading.value = false;
        }
    }
    watch(page, fetching)
    onMounted(fetching)

    return {
        posts, isPostLoading, totalPages
    }

}