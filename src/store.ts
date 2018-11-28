import Vue from "vue"
import Vuex from "vuex"

import feeds from "./store/feeds"
import player from "./store/player"
import status from "./store/status"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    feeds,
    player,
    status,
  },
})
