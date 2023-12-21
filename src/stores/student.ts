import { defineStore } from "pinia";

export const useStudentStore = defineStore({
  id: "session",
  state: () => ({
    studentId: 0,
    name: '',
    class: '',
    thumbnail: '',
    saldo: 0,
    id: 0,
  }),
  getters: {
    getUser(state) {
      return state;
    },
  },
  actions: {
    setUser(state: any) {
      this.id = state.id;
      this.studentId = state.studentId;
      this.name = state.name;
      this.class = state.class;
      this.thumbnail = state.thumbnail;
      this.saldo = state.saldo;
    }
  }

});
