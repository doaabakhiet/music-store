<template>
  <div id="Login">
    <div class="w-full p-6 flex justify-center items-center">
      <div class="w-full max-w-xs">
        <div class="bg-black p-8 shadow rounded mb-6">
          <h1 class="mb-6 text-lg text-gray-100 font-thin">
            Let's get rocking!
          </h1>
          <TextInput
            label="Email"
            :labelColor=false
            placeholder="Enter Email"
            v-model:input="email"
            inputType="email"
            :error="errors.email ? errors.email[0] : ''"
          />

          <TextInput
            label="Password"
            :labelColor=false
            placeholder="Enter Password"
            v-model:input="password"
            inputType="password"
            :error="errors.password ? errors.password[0] : ''"
          />
          <button
            class="block w-full bg-green-500 text-white rounded-sm py-3 text-sm tracking-wide"
            type="submit"
            @click="login"
          >
            Login
          </button>
        </div>
        <p class="text-center text-md text-gray-900">
          Don't Have An Account Yet?
          <router-link
            to="register"
            class="text-blue-500 no-underline hover:underline"
            >Register</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import TextInput from "@/components/global/TextInput.vue";
import { ref } from "vue";
import axios from "axios";
import {useUserStore} from '../store/user-store.js'
import {useProfileStore} from '../store/profile-store.js'
import {useVideoStore} from '../store/video-store.js'
import {useSongStore} from '../store/song-store.js'
import {usePostStore} from '../store/post-store.js'
import {useRouter} from "vue-router";
const router=useRouter();
let errors = ref([]);
let email = ref(null);
let password = ref(null);
const userStore = useUserStore();
const profileStore = useProfileStore();
const videoStore = useVideoStore();
const songStore = useSongStore();
const postStore = usePostStore();
const login = async () => {
  errors.value = [];
  try {
    let result = await axios.post(`login?email=${email.value}&password=${password.value}`);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.token

    userStore.setUserDetails(result);
    await profileStore.fetchProfileById(userStore.id);
    await songStore.fetchSongs(userStore.id);
    await postStore.fetchPosts(userStore.id);
    await videoStore.fetchVideos(userStore.id);
    console.log(result)
     router.push('/account/profile/'+userStore.id);
  } catch (err) {
    errors.value = err.response.data.errors;
    console.log(err.response.data.message);
  }
};
</script>
