<template>
  <div id="DeleteSong" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Delete Song</div>
    <div class="bg-red-500 w-full h-1 mb-4"></div>

    <div class="bg-white rounded px-8 pt-6 pb-8">
      <div
        class="flex flex-wrap"
        v-for="(song, index) in songStore.songs"
        :key="song"
      >
        <div class="w-3/4 mr-auto mt-2 text-lg p-1 text-gray-900">
          {{ ++index }} . {{ song.title }}
        </div>

        <div class="w-1/4 ml-auto p-1">
          <button
            @click="deleteSong(song)"
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
import axios from "axios";
import { useSongStore } from "../../store/song-store";
import { useUserStore } from "../../store/user-store";
import Swal from '../../sweetalert2.js'

const songStore = useSongStore();
const userStore = useUserStore();

const deleteSong = (song) => {
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
        await axios.delete(`song/${song.id}/${userStore.id}`);
        songStore.fetchSongs(userStore.id);
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
