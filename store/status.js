import _ from "lodash"
import Vue from "vue"

export const state = () => ({})

export const getters = {

  current(state, getters, rootState, rootGetters) {
    const episode = rootGetters.player.currentEpisode
    if(episode)
      return state[episode.link]
    else
      return null
  }

}

export const mutations = {

  update(state, id, values) {
    value = state[id] || {}
    _.merge(value, values)
    Vue.set(state, id, values)
  },

  remove(state, id) {
    Vue.delete(state, id)
  }

}
