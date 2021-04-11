import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: "http://116.85.46.91:8080",
    afterUrl_1: "/student/message",
    afterUrl_2: "/student/course",
    afterUrl_3: "/student/teacher",
    afterUrl_4: "/find/course",
    afterUrl_5: "/find/teacher",
    afterUrl_6: "/student/upload",
    registerStep: 0,
    studentMsg: {},
    getMsgAgain: false,
  },
  mutations: {
    commitBase(state, payload) {
      state.baseUrl = payload.base;
    },
    commitAfter(state, payload) {
      let temp = "afterUrl_" + payload.index;
      state[temp] = payload.afterUrl;
    },
    commitStep(state, payload) {
      state.registerStep = payload.step;
    },
    clearStep(state) {
      state.registerStep = 0;
    },
    commitMessage(state, payload) {
      state.studentMsg = { ...state.studentMsg, ...payload.values };
    },
  },
  actions: {},
  modules: {},
});
