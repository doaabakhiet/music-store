<template>
    <div id="profileInfoSection">
        <div class="
        w-full
        sm:w-1/2
        font-bold
        text-gray-100
        mt-4
        rounded
        text-center
        bg-green-500
        p-2
        py-1
    ">
        Number of songs {{ length }}
    </div>
    </div>
</template>
<script setup>
import { useSongStore } from "../../../store/song-store";
const songStore = useSongStore();
let length=0;
if(songStore.songs.length){
    length=songStore.songs.length

}
</script>