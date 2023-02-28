import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    image: null,
    description: null,
  }),
  actions: {
    setUserDetails(res) {
      console.log("setUserDetails", res.data);
      this.$state.id = res.data.user.id;
      this.$state.token = res.data.token;
      this.$state.firstName = res.data.user.first_name;
      this.$state.lastName = res.data.user.last_name;
      this.$state.email = res.data.user.email;
      this.$state.location = res.data.user.location;
      this.$state.description = res.data.user.description;
    },

    async fetchUser() {
      let user = await axios.get(
        "user/" + this.$state.id
      );
      console.log(user);
      this.$state.id = user.data.user.id;
      this.$state.firstName = user.data.user.first_name;
      this.$state.lastName = user.data.user.last_name;
      this.$state.email = user.data.user.email;
      this.$state.location = user.data.user.location;
      this.$state.description = user.data.user.description;
      if (user.data.user.image) {
        this.$state.image = process.env.VUE_APP_API_URL + 'images/user/' + user.data.user.image
      } else {
        this.$state.image = 'http://localhost:8080/undefinedDefaultUserAvatar.png'
      }
    },
    clearUser() {
      this.$state.id = null;
      this.$state.token = null;
      this.$state.firstName = null;
      this.$state.lastName = null;
      this.$state.email = null;
      this.$state.location = null;
      this.$state.description = null;
    },
  },
  persist: true,
});
