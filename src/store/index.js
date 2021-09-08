import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex)

const state = {
  totalData: {
    admin: [],
    user: [],
    order: []
  },
  menuRoute:''
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {
  },
  getters,
  modules: {
  }
})
