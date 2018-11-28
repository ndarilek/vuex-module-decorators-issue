import _ from "lodash"
import Vue from "vue"

export default {
  state: {
  },
  getters: {
    current(state, getters, rootState, rootGetters) {
      const episode = rootGetters.player.currentEpisode
      if(episode)
        return state[episode.link]
      else
        return null
    },
  },
  mutations: {
    update(state, id, values) {
      value = state[id] || {}
      _.merge(value, values)
      Vue.set(state, id, values)
    },
    remove(state, id) {
      Vue.delete(state, id)
    },
  },
  namespaced: true,
}
