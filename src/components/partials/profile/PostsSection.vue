<template>
  <div id="postsSection">
    <div class="mx-auto py-4">
      <div class="flex flex-wrap font-bold text-gray-100">
        <div class="text-gray-900 text-xl">Posts</div>
        <div class="bg-green-500 w-full h-1"></div>

        <div class="w-full mt-4" v-if="userStore.id==route.params.id">
          <RouterLinkButton
            btnText="Create Post"
            color="green"
            url="/account/create-post"
          />
        </div>
      </div>
      <div class="flex flex-wrap mb-4" >
        <div class="my-1 px-1 w-full md:w-1/2 lg:w-1/2" v-for="post in postStore.posts" :key="post">
          <div
            class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <router-link to="">
              <img
                class="rounded-t-lg w-full"
                src="https://via.placeholder.com/300x150.png"
                alt=""
              />
            </router-link>
            <div class="p-5 md:p-4">
              <div class="text-lg">
                <router-link
                  :to="'/account/post-by-id/'+post.id"
                  class="underline text-blue-500 hover:text-blue-600"
                >{{ post.title }}</router-link>
              </div>
              <p class="py-2">Location: {{ post.location }}</p>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {{post.description}}.
              </p>
              <!-- <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a> -->
              <div  class="mt-2 flex items-center justify-end" v-if="userStore.id==route.params.id">
                            <router-link 
                                :to="'/account/edit-post/' +post.id" 
                                class="
                                    mr-1
                                    bg-blue-500
                                    hover:bg-blue-700
                                    text-white
                                    text-sm
                                    font-bold
                                    py-1
                                    px-2
                                    rounded-full
                                "
                            >
                                Edit post
                            </router-link>
                            <button
                                class="
                                    bg-red-500
                                    hover:bg-red-700
                                    text-white
                                    text-sm
                                    font-bold
                                    py-1
                                    px-2
                                    rounded-full
                                "
                                @click="deletePost(post)"
                            >
                                Delete
                            </button>
                        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";

import { usePostStore } from "../../../store/post-store";
import Swal from '../../../sweetalert2.js'
import { useUserStore } from "@/store/user-store";
import axios from "axios";
import {useRoute} from "vue-router";
import {onMounted} from 'vue';
const userStore=useUserStore();
const postStore=usePostStore();
const route=useRoute();
onMounted(async ()=>{
  await postStore.fetchPosts(route.params.id);
});
const deletePost=(post)=>{
  Swal.fire({
    title: "Are You Sure You Want To Delete This?",
    icon: "warning",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Yes ,delete it",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let res=await axios.delete(`post/${post.id}`);
        console.log(res);
        postStore.fetchPosts(userStore.id);
        Swal.fire(
          'Good job!',
          'You clicked the button delete!',
          'success'
        )
      } catch (err) {
        console.log(err);
      }
    }
  });
};
</script>
