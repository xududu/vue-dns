import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import { ADD_TODO, DEL_TODO, COMPLETE_TODO, INIT_TODO } from "./types";

export default new Vuex.Store({
  state: {
    list: []
  },
  getters: {
    count: state => isComplete => {
      return state.list.filter(item => item.isComplete === isComplete).length;
    },
    todoList: state => {
      return state.list;
    }
  },
  mutations: {
    [INIT_TODO](state, payload) {
      state.list = payload.list;
    },
    [ADD_TODO](state, payload) {
      state.list.push(payload);
    },
    [DEL_TODO](state, payload) {
      const index = payload.index;
      state.list.splice(index, 1);
    },
    [COMPLETE_TODO](state, payload) {
      const index = payload.index;
      state.list[index].isComplete = 1;
    }
  },
  actions: {
    initList({ commit }) {
      axios.get("/todo/list").then(res => {
        commit(INIT_TODO, { list: res.data.data });
      });
    }
  }
});
