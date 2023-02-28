import RouterLinkButton from '@/components/global/RouterLinkButton.vue';

<template>
  <div id="profileSongSection">
    <div class="mx-auto py-4">
      <div class="flex flex-wrap font-bold text-gray-100">
        <div class="text-gray-900 text-xl">Youtbube Videos</div>
        <div class="bg-green-500 w-full h-1"></div>

        <div class="w-full mt-4" v-if="userStore.id==route.params.id">
          <RouterLinkButton
            class="ml-5"
            btnText="Delete Youtube Video"
            color="red"
            url="/account/delete-youtube-video"
          />
          <RouterLinkButton
            btnText="Add Youtube Video"
            color="green"
            url="/account/add-youtube-video"
          />
        </div>
      </div>
      <div class="flex flex-wrap mb-4">
            <div class="my-1 px-1 w-full md:w-1/2 lg:w-1/2" v-for="video in videoStore.videos" :key="video">
                <div class="text-xl text-gray-900">{{video.title}}</div>
                <iframe :src="video.url" class="w-full h-60" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";
import { useVideoStore } from "@/store/video-store";
import { useUserStore } from "@/store/user-store";
import {onMounted} from 'vue';
import {useRoute} from "vue-router";
const route=useRoute();
const videoStore= useVideoStore();
const userStore= useUserStore();
onMounted(async ()=>{
  await videoStore.fetchVideos(route.params.id);
});
</script>
