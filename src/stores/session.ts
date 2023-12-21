import { defineStore } from "pinia";
import { userType } from "../helpers/type";
import useToken from "../composables/token";
import { isDisableLayer } from "../helpers/handleEvent";
const { decodeToken } = useToken();
export const useSessionStore = defineStore({
  id: "session",
  state: () => <userType>({
    id: 0,
    name: '',
    email: '',
    role: '',
    thumbnail: '',
    phone: '',
    gender: '',
    address: '',
  }),
  getters: {
    getUser(state: userType) {
      return state;
    }
  },
  actions: {
    async setUser() {
      if(localStorage.getItem('token') == null) return;
      const response = await decodeToken();
      this.id = response.id;
      this.name = response.name;
      this.email = response.email;
      this.role = response.role;
      this.thumbnail = response.thumbnail;
      this.phone = response.phone;
      this.gender = response.gender;
      this.address = response.address;
      isDisableLayer();
    },
    destroyUser() {
      this.id = 0;
      this.name = '';
      this.email = '';
      this.role = '';
      this.thumbnail = '';
      this.phone = '';
    }
  }
});

