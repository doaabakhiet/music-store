<template>
  <div id="EditPost" class="container max-w-4xl mx-auto pt-20 pb-20 px-6">
    <form
      v-on:submit.prevent="editPost"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="text-gray-900 text-xl">Edit Post</div>
      <div class="bg-green-500 w-full h-1"></div>
      <CropperModal
        v-if="showModal"
        :minAspectRatioProp="{ width: 16, height: 9 }"
        :maxAspectRatioProp="{ width: 16, height: 9 }"
        @croppedImageData="setCroppedImageData"
        @showModal="showModal = false"
      />
      <div class="flex flex-wrap mt-4 mb-6">
        <div class="w-full md:w-1/2 px-3">
          <TextInput
            label="Title"
            placeholder="Awesome Concert"
            v-model:input="title"
            inputType="text"
            :error="errors.title ? errors.title[0] : ''"
          />
        </div>
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
            label="Post Image"
            btnText="Update Post Image"
            @showModal="showModal = true"
          />
        </div>
      </div>

      <div class="flex flex-wrap mt-4 mb-6">
        <div class="w-full px-3">
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
          <SubmitFormButton btnText="Update Post" type="submit"></SubmitFormButton>
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
import { ref, onMounted } from "vue";
import CroppedImage from "@/components/global/CroppedImage.vue";
import axios from "axios";
import { useRoute,useRouter  } from "vue-router";
import Swal from "../../sweetalert2.js";
import { useUserStore } from "../../store/user-store";
import { usePostStore } from "../../store/post-store";
const userStore = useUserStore();
const postStore = usePostStore();
const route = useRoute();
const router = useRouter();
let title = ref(null);
let description = ref(null);
let location = ref(null);
let showModal = ref(false);
let imageData = null;
let image = ref(null);
let errors = ref([]);
const setCroppedImageData = (data) => {
  imageData = data;
  image.value = data.imageUrl;
};
onMounted(async () => {
  await getPostById();
});
const getPostById = async () => {
  try {
    let res = await axios.get("post/" + route.params.id);
    console.log(res);
    title.value = res.data.post.title;
    location.value = res.data.post.location;
    description.value = res.data.post.description;
    image.value = res.data.post.image;
  } catch (error) {
    // errors.value = error.response.data.errors;
    console.log(error);
  }
};

const editPost = async () => {
  errors.value = [];
  console.log(imageData);
  // console.log(userStore.token);

  let data = new FormData();
  data.append("user_id", userStore.id || "");
  data.append("title", title.value || "");
  data.append("location", location.value || "");
  data.append("description", description.value || "");
  if (imageData) {
    data.append("image", imageData.file || "");
    data.append("height", imageData.height || "");
    data.append("width", imageData.width || "");
    data.append("left", imageData.left || "");
    data.append("top", imageData.top || "");
  }
  try {
    let result = await axios.post("post/" + route.params.id+'?_method=PUT', data);

    Swal.fire("Good job!", "You clicked the button update!", "success");
    console.log(result);
    await postStore.fetchPosts(userStore.id);
    router.push("/account/profile");

  } catch (error) {
    errors.value = error.response.data.errors;
    console.log(error);
  }
};
</script>
