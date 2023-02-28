<template>
  <div id="Register">
    <div class="w-full p-6 flex justify-center items-center">
      <div class="w-full max-w-xs">
        <div class="bg-black p-8 shadow rounded mb-6">
          <h1 class="mb-6 text-lg text-gray-100 font-thin">
            Let's get rocking!
          </h1>
          <!-- <TextInput
            label="First Name"
            labelColor="false"
            placeholder="Enter First Name"
            v-model:input="first_name"
            inputType="text"
            :error="errors.first_name ? errors.first_name[0] : ''"
          /> -->
          <TextInput
            label="First Name"
            :labelColor="false"
            placeholder="John"
            v-model:input="first_name"
            inputType="text"
            :error="errors.first_name ? errors.first_name[0] : ''"
          />
          <TextInput
            label="Last Name"
            :labelColor="false"
            placeholder="Enter Last Name"
            v-model:input="last_name"
            inputType="text"
            :error="errors.last_name ? errors.last_name[0] : ''"
          />

          <TextInput
            label="Email"
            :labelColor="false"
            placeholder="Enter Email"
            v-model:input="email"
            inputType="email"
            :error="errors.email ? errors.email[0] : ''"
          />

          <TextInput
            label="Password"
            :labelColor="false"
            placeholder="Enter Password"
            v-model:input="password"
            inputType="password"
            :error="errors.password ? errors.password[0] : ''"
          />

          <TextInput
            label="Confirm Password"
            :labelColor="false"
            placeholder="Enter Confirm Password"
            v-model:input="password_confirmation"
            inputType="password"
            :error="
              errors.password_confirmation
                ? errors.password_confirmation[0]
                : ''
            "
          />

          <button
            class="block w-full bg-green-500 text-white rounded-sm py-3 text-sm tracking-wide"
            type="submit"
            @click="register"
          >
            Register
          </button>
        </div>
        <p class="text-center text-md text-gray-900">
          Already Have An Account?
          <router-link
            to="login"
            class="text-blue-500 no-underline hover:underline"
            >Login</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import TextInput from "@/components/global/TextInput.vue";
import { ref } from "vue";
import { useUserStore } from "../store/user-store.js";
import axios from "axios";
import {useProfileStore} from '../store/profile-store.js'
import {useVideoStore} from '../store/video-store.js'
import {useSongStore} from '../store/song-store.js'
import {usePostStore} from '../store/post-store.js'
import {useRouter} from "vue-router";
const router=useRouter();
const userStore = useUserStore();
const profileStore = useProfileStore();
const videoStore = useVideoStore();
const songStore = useSongStore();
const postStore = usePostStore();
let errors = ref([]);
let first_name = ref('')
let last_name = ref('')
let email = ref(null);
let password = ref(null);
let password_confirmation = ref('');
const register = async () => {
  errors.value = [];
  console.log(userStore.id);
  try {
    let result = await axios.post(
      `http://localhost:8000/api/register?first_name=${first_name.value}&last_name=${last_name.value}&password_confirmation=${password_confirmation.value}&email=${email.value}&password=${password.value}`
    );
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.token
    console.log(result);
    userStore.setUserDetails(result);
    await profileStore.fetchProfileById(userStore.id);
    await songStore.fetchSongs(userStore.id);
    await postStore.fetchPosts(userStore.id);
    await videoStore.fetchVideos(userStore.id);
    router.push('/account/profile/'+userStore.id);
  } catch (err) {
    errors.value = err.response.data.errors;
    console.log(errors.value);
  }
};
</script>
