<template>
  <div id="EditProfile" class="container max-w-4xl mx-auto pt-20 pb-20 px-6">
    <div class="text-gray-900 text-xl">Edit Profile</div>
    <div class="bg-green-500 w-full h-1"></div>
    <form v-on:submit.prevent="updateUser" method="post" enctype="multipart/form-data">
    <CropperModal
      v-if="showModal"
      :minAspectRatioProp="{ width: 8, height: 8 }"
      :maxAspectRatioProp="{ width: 8, height: 8 }"
      @croppedImageData="setCroppedImageData"
      @showModal="showModal = false"
    />
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="First Name"
          placeholder="John"
          v-model:input="first_name"
          inputType="text"
          :error="errors.first_name ? errors.first_name[0] : ''"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Last Name"
          placeholder="Doe"
          v-model:input="last_name"
          inputType="text"
          :error="errors.last_name ? errors.last_name[0] : ''"
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Location"
          placeholder="Madrid, ES"
          v-model:input="location"
          inputType="text"
          :error="errors.location ? errors.location[0] : ''"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <DisplayCropperButton
          label="Profile Image"
          btnText="Update Profile Image"
          @showModal="showModal = true"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <CroppedImage label="Cropped Image" :image="image" />
      </div>
    </div>
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full px-3">
        <TextArea
          label="Description"
          placeholder="Please enter some information here!!!"
          v-model:description="description"
          :error="errors.description ? errors.description[0] : ''"
        ></TextArea>
      </div>
    </div>

    <div class="flex flex-wrap mt-8 mb-6">
      <div class="w-full px-3">
        <SubmitFormButton
          btnText="Update Profile"
          type="submit"
        ></SubmitFormButton>
        <!-- <SubmitFormButton
                
                /> -->
       
      </div>
    </div>
  </form>
  </div>
</template>
<script setup>
import DisplayCropperButton from "@/components/global/DisplayCropperButton.vue";
import TextArea from "@/components/global/TextArea.vue";
import TextInput from "@/components/global/TextInput.vue";
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import CropperModal from "@/components/global/CropperModal.vue";
import { onMounted, ref } from "vue";
import CroppedImage from "@/components/global/CroppedImage.vue";
import { useUserStore } from "../../store/user-store";
import { useRouter } from 'vue-router'
import axios from "axios";
const userStore = useUserStore();
const router = useRouter();
let first_name = ref("");
let last_name = ref("");
let location = ref(null);
let description = ref("");
let showModal = ref(false);
let imageData = null;
let image = ref(null);
const setCroppedImageData = (data) => {
  imageData = data;
  image.value = data.imageUrl;
};
let errors = ref([]);
//
onMounted(() => {
  first_name.value = userStore.firstName || null;
  last_name.value = userStore.lastName || null;
  location.value = userStore.location || null;
  description.value = userStore.description || null;
  image.value = userStore.image || null;
});
const updateUser = async () => {
  errors.value = [];
  // console.log(userStore);
  // console.log(userStore.token);

  let data = new FormData();
  data.append('first_name', first_name.value || '')
  data.append('last_name', last_name.value || '')
  data.append('location', location.value || '')
  data.append('description', description.value || '')
  if (imageData) {
      data.append('image', imageData.file || '')
      data.append('height', imageData.height || '')
      data.append('width', imageData.width || '')
      data.append('left', imageData.left || '')
      data.append('top', imageData.top || '')
  }
  try {
    // &image=${imageData.file}&height=${data.get('height')}&width=${data.get('width')}&left=${data.get('left')}&top=${data.get('top')}
  // let result= await axios.put(
  //   `http://localhost:8000/api/user/${userStore.id}?first_name=${first_name.value}&last_name=${last_name.value}&location=${location.value}&description=${description.value}`
  // );
  let result= await axios.post('user/' + userStore.id + '?_method=PUT', data)
  console.log(result);
  // await axios.put('api/users/' + userStore.id, data)
  await userStore.fetchUser();
  router.push('/account/edit-profile');

  } catch (err) {
    errors.value = err.response.data.errors;
    console.log(errors.value);
  }
};
</script>
