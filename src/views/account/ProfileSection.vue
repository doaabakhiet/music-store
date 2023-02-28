<template>
  <div class="p-2">
    <div class="container max-w-4xl mx-auto flex mt-10">
      <div class="w-1/3">
        <img
          class="w-full rounded-lg h-auto shadow-lg"
          :src=" profileStore.image"
          alt="Profile Pic"
        />
      </div>
      <div class="w-full pl-4">
        <div class="flex">
          <div class="w-1/2">
            <h1 class="text-2xl md:text-4xl test-left text-gray-900">{{ profileStore.firstName }} {{ profileStore.lastName }}</h1>
            <span class="text-md text-gray-700">
              <i><b>{{ profileStore.location }}</b></i>
            </span>
          </div>
          <div class="w-1/2 mt-2" v-if="profileStore.id == route.params.id">
            <RouterLinkButton
            btnText="Edit Profile"
            url="/account/edit-profile"
            color="green"
            />
          </div>
        </div>
        <ProfileInfoSection />
        <profileAboutSection />
      </div>
    </div>
    <ProfileSongSection/>
    <YoutubeVideoSection/>
    <PostsSection/>
  </div>
</template>
<script setup>
import ProfileInfoSection from "@/components/partials/profile/ProfileInfoSection.vue";
import profileAboutSection from "@/components/partials/profile/ProfileAboutSection.vue";
import ProfileSongSection from "@/components/partials/profile/ProfileSongSection.vue";
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";
import YoutubeVideoSection from "@/components/partials/profile/YoutubeVideoSection.vue";
import PostsSection from "@/components/partials/profile/PostsSection.vue";
import {useProfileStore} from '../../store/profile-store.js';
import { onMounted } from "vue";
import {useRoute} from "vue-router";
const route=useRoute();
const profileStore=useProfileStore();
onMounted(async()=>{
  await profileStore.fetchProfileById(route.params.id);
});
</script>
