<template>
  <div id="DeleteYoutubeVideo" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Delete Youtube Video</div>
    <div class="bg-red-500 w-full h-1 mb-4"></div>

    <div class="bg-white rounded px-8 pt-6 pb-8">
      <div class="flex flex-wrap" v-for="video in videoStore.videos" :key="video">
        <div class="w-1/4 mr-auto mt-2 text-lg p-1 text-gray-900">
          {{video.title}}
            <iframe width="560" height="315" :src="video.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

        <div class="w-1/4 ml-auto p-1">
          <button
            @click="deleteVideo(video)"
            class="float-right bg-transparent hover:bg-red-500 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Swal from '../../sweetalert2.js'
import { useUserStore } from "@/store/user-store";
import { useVideoStore } from "@/store/video-store";
import axios from 'axios';
const videoStore= useVideoStore();
const userStore=useUserStore();
const deleteVideo=(video)=>{
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
        let res=await axios.delete(`youtube/${video.id}`);
        console.log(res);
        videoStore.fetchVideos(userStore.id);
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
