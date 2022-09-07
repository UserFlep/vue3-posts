import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main";
import Posts from "@/pages/Posts";
import About from "@/pages/About";
import Post from "@/pages/Post";
// import NotFound from "@/pages/NotFound";

const routes = [
    {path: '/', component: Main},
    {path: '/posts', component: Posts},
    {path: '/posts/:id', component: Post},
    {path: '/about', component: About}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;