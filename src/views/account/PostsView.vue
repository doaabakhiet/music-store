<template>
  <div id="PostsView" class="container mx-auto max-w-4xl py-6 px-3">
    <div class="text-gray-900 text-xl">Posts</div>
    <div class="bg-green-500 w-full h-1 mb-4"></div>

    <div class="mx-auto" v-if="posts">
      <div class="my-4" v-for="post in posts" :key="post">
        <div class="flex items-center py-2">
          <router-link :to="'/accounts/profile/'+post.user.id">
            <img
              src="https://via.placeholder.com/300.png/09f/fff "
              class="rounded-full"
              width="50"
            />
          </router-link>
          <div class="ml-2 font-bold text-2xl">
            <router-link to=""> {{post.user.first_name}} {{post.user.first_name}} </router-link>
          </div>
        </div>
        <img class="w-full" src="https://via.placeholder.com/300x150.png" alt="" />
        <div class="p-4">
          <p class="text-3xl font-bold hover:text-gray-700 pb-4">
            {{post.title}}
          </p>
          <p class="py-2 text-lg">Event Location: {{post.location}}</p>
          <p class="pb-6">
           {{post.description}} 
          </p>
        </div>
      </div>
      
      <div class="flex items-center justify-center p-2">
                <v-pagination
                    class="p-10"
                    v-model="page"
                    :pages="pageCount"
                    :range-size="1"
                    active-color="#337aff"
                    @update:modelValue="getPosts"
                />
            </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import {ref,onMounted} from 'vue';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

let posts=ref(null);
let page=ref(1);
let pageCount=ref(null);
onMounted(async()=>{
  await getPosts();
});
const getPosts=async()=>{
  try {
    let res=await axios.get('post?page='+page.value);
    posts.value = res.data.posts.data
    pageCount.value=res.data.page_count
    console.log(posts)
  } catch (error) {
    console.log(error);
  }
}
</script>
