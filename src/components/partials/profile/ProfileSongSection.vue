import RouterLinkButton from '@/components/global/RouterLinkButton.vue';

<template>
  <div id="profileSongSection">
    <div class="mx-auto py-4">
      <div class="flex flex-wrap font-bold text-gray-100">
        <div class="text-gray-900 text-xl">Songs</div>
        <div class="bg-green-500 w-full h-1"></div>
        <div class="w-full mt-4" v-if="userStore.id==route.params.id">
          <RouterLinkButton
            class="ml-5"
            btnText="Delete Song"
            color="red"
            url="/account/delete-song"
          />
          <RouterLinkButton
            btnText="Add Song"
            color="green"
            url="/account/add-song"
          />
        </div>
      </div>
      <div class="pb-4">
        
        <SongsPlayer/>
      </div>
    </div>
  </div>
</template>
<script setup>
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";
import SongsPlayer from "./SongsPlayer.vue";
// import APlayer from 'aplayer';
// import { onMounted } from "vue";
import {useUserStore} from '../../../store/user-store.js';
import {useRoute} from "vue-router";
const route=useRoute();
const userStore=useUserStore();

// onMounted(()=>{
//   thePlayer();
// });
// const thePlayer=()=>{
//  new APlayer({
//     container: document.getElementById('aplayer'),
//     audio: [{
//         name: 'First Song',
//         artist: 'artist',
//         url: '../../../../public/audios/just-relax-11157.mp3',
//         cover: 'cover.jpg'
//     },
//     {
//         name: 'Second Song',
//         artist: 'artist',
//         url: '../../../../public/audios/ambient-piano-ampamp-strings-10711.mp3',
//         cover: 'cover.jpg'
//     }]
// });
// }
</script>
