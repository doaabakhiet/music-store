<template>
  <div id="AddSong" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Add Song</div>
    <div class="bg-green-500 w-full h-1 mb-4"></div>
    <form v-on:submit.prevent="addSong" method="post" enctype="multipart/form-data">
    <TextInput
      class="mb-6"
      label="Title"
      placeholder="Cool New Song"
      v-model:input="title"
      inputType="text"
      :error="errors.title ? errors.title[0] : ''"
    />

    <div class="w-full">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      >
        Select Image
      </label>
      <input
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        type="file"
        id="image"
        ref="file"
        @change="handleFileUpload"
      />
      <br />
      <SubmitFormButton btnText="Add Song" />
    
      <br />
      <br />
      <br />
    </div>
  </form>
  </div>
</template>
<script setup>
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import TextInput from "@/components/global/TextInput.vue";
import { ref } from "vue";
import { useUserStore } from "../../store/user-store";
import { useSongStore } from "../../store/song-store";
import Swal from '../../sweetalert2.js'
import axios from "axios";
import {useRouter} from "vue-router";
const router=useRouter();
const userStore = useUserStore();
const songStore = useSongStore();
// let user_id=userStore.id;
let title = ref(null);
let song = ref(null);
let file = ref(null);
let errors = ref([]);
const handleFileUpload = () => {
  song.value = file.value.files[0];
};
const addSong = async() => {
  if (!song.value) {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
     return null;
  }
  try {
    let form = new FormData()
    form.append('user_id', userStore.id)
    form.append('title', title.value || '')
    form.append('song', song.value)
    let res =await axios.post('song', form)

    // let res=await axios.post(`song?user_id=${user_id}&title=${title.value}&song=${song.value}`);
    console.log(res);

    songStore.fetchSongs(userStore.id);
    router.push('/account/profile/'+userStore.id);
  }catch(err) {
    errors.value = err.response.data.errors;
    console.log(err);
  }
};
</script>
