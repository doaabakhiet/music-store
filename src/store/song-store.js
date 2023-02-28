import axios from "axios";
import { defineStore } from "pinia";

export const useSongStore = defineStore("song", {
  state: () => ({
    songs: null,
    artistId: null,
    artistName: null,
  }),
  actions: {
    async fetchSongs(userId) {
      let user = await axios.get("user/" +userId+ '/songs');
      this.$state.songs = user.data.songs;
      this.$state.artistId = user.data.artist_id;
      this.$state.artistName = user.data.artistName;
    },
    clearSongs() {
      this.$state.songs = null;
      console.log(this.$state.songs);
      this.$state.artistId = null;
      this.$state.artistName = null;
    },
  },
  persist: true,
});
