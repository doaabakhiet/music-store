

<template>
  <div id="SongsPlayerSection">
    <div id="aplayer">

      
    </div>
    <!-- {{ songStore }} -->
  </div>
</template>
<script setup>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import { useSongStore } from "../../../store/song-store";
import { onMounted } from "vue";
import {useRoute} from "vue-router";
const route=useRoute();
// import {useUserStore} from '../../../store/user-store.js';
// const userStore=useUserStore();
const songStore = useSongStore();
let songList=[];
const mapSongs=()=>{
  let newSongs=songStore.songs.map(function (song) {
    return {
      name:song.title,
      artist:songStore.artistName,
      url:process.env.VUE_APP_API_URL+'songs/'+songStore.artistId+'/'+song.song
    };
  })
  for(let i=0;i<newSongs.length;i++){
    songList.push(newSongs[i]);

  }

};
onMounted(async ()=>{
  await songStore.fetchSongs(route.params.id);
  setTimeout(() => {
    mapSongs();
  }, 500);
  thePlayer();
});
const thePlayer=()=>{
    new APlayer({
    container: document.getElementById('aplayer'),
    audio:songList 
    
});
}
// [{
    //     name: 'First Song',
    //     artist: 'artist',
    //     url: '../../../../public/audios/just-relax-11157.mp3',
    //     cover: 'cover.jpg'
    // },
    // {
    //     name: 'Second Song',
    //     artist: 'artist',
    //     url: '../../../../public/audios/ambient-piano-ampamp-strings-10711.mp3',
    //     cover: 'cover.jpg'
    // }]
</script>
