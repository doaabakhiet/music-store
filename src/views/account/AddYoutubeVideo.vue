<template>
  <div id="AddYoutubeVideo" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Add Youtube Video</div>
    <div class="bg-green-500 w-full h-1 mb-4"></div>
    <TextInput
      class="mb-6"
      label="Title"
      placeholder="Cool New Video"
      v-model:input="title"
      inputType="text"
      :error="errors.title ? errors.title[0] : ''"
    />

    <TextInput
      class="mb-2"
      label="Video Url"
      placeholder="Cool Video Url"
      v-model:input="videoCode"
      inputType="text"
      :error="errors.url ? errors.url[0] : ''"
    />

    <div class="w-full">
      <SubmitFormButton btnText="Add Video" @submit="AddYoutubeVideo" />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>
<script setup>
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import TextInput from "@/components/global/TextInput.vue";
import { useUserStore } from "@/store/user-store";
import axios from "axios";
import Swal from '../../sweetalert2.js'
import {useRouter} from "vue-router";
import { ref } from "vue";
import { useVideoStore } from "@/store/video-store";
const videoStore= useVideoStore();
const router=useRouter();
let title = ref(null);
let videoCode = ref(null);
let errors = ref([]);
const userStore=useUserStore();
const AddYoutubeVideo = async () => {
  errors.value = [];

  try {
    let res=await axios.post('youtube',{
        'user_id':userStore.id,
        'title':title.value,
        'url':videoCode.value,
    });
    console.log(res);
    Swal.fire(
          'Good job!',
          'You clicked the button Store!',
          'success'
        )
    videoStore.fetchVideos(userStore.id);
    router.push('/account/profile');
  } catch (error) {
    errors.value = error.response.data.errors;
    console.log(error);
  }
};
</script>
