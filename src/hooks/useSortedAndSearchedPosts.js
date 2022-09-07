import axios from "axios";
import {ref, computed} from "vue";

export function useSortedAndSearchedPosts(sortedPosts) {
    const searchValue = ref('');
    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter(post =>
            post.title.toLowerCase().includes(searchValue.value.toLowerCase())
        )
    })

    return {
        searchValue, sortedAndSearchedPosts
    }

}