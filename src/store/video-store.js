import axios from "axios";
import { defineStore } from "pinia";

export const useVideoStore = defineStore("video", {
  state: () => ({
    videos: null
  }),
  actions: {
    async fetchVideos(userId) {
      let user = await axios.get("youtube/" +userId);

      this.$state.videos = user.data.videos_by_user;
    },
    clearVideos() {
      this.$state.videos = null;
    },
  },
  persist: true,
});
