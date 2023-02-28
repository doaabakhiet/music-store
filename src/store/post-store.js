import axios from "axios";
import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: null
  }),
  actions: {
    async fetchPosts(userId) {
      let user = await axios.get("user/" +userId+"/posts");
      this.$state.posts = user.data.posts;
    },
    clearPosts() {
      this.$state.posts = null;
    },
    postImages(image){
        return process.env.VUE_APP_API_URL+'images/posts/'+image
    }
  },
  persist: true,
});
