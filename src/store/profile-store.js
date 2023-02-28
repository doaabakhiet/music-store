import axios from "axios";
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    image: null,
    description: null,
  }),
  actions: {
    setProfileDetails(res) {
      console.log("setProfileDetails", res.data);
      this.$state.id = res.data.user.id;
      this.$state.firstName = res.data.user.first_name;
      this.$state.lastName = res.data.user.last_name;
      this.$state.email = res.data.user.email;
      this.$state.location = res.data.user.location;
      this.$state.description = res.data.user.description;
    },

    async fetchProfileById(id) {
      let user=await axios.get(
        "user/" + id
      );
      let x='';
      if(user.data.user==null){x=null;}else{x=true;}
      this.$state.id = x?user.data.user.id :null;
      this.$state.firstName = x?user.data.user.first_name:null;
      this.$state.lastName = x?user.data.user.last_name:null;
      this.$state.email = x?user.data.user.email:null;
      this.$state.location = x?user.data.user.location:null;
      this.$state.description = x?user.data.user.description:null;
      if (x==true &&user.data.user.image) {
        this.$state.image = process.env.VUE_APP_API_URL + 'images/user/' + user.data.user.image
      } else {
        this.$state.image = 'http://localhost:8080/undefinedDefaultUserAvatar.png'
      }
    },
    clearProfile() {
      this.$state.id = null;
      this.$state.firstName = null;
      this.$state.lastName = null;
      this.$state.email = null;
      console.log(this.$state.email )
      this.$state.location = null;
      this.$state.description = null;
    },
  },
  persist: true,
});
