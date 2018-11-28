export default {
  state: {
    currentEpisodeId: null,
    currentFeedId: null,
  },
  getters: {
    currentEpisode(state, getters) {
      if(state.currentEpisodeId && getters.currentFeed)
        return getters.currentFeed.items.find(v => v.link == state.currentEpisodeId)
      else
        return null
    },
    currentFeed(state, getters, rootState) {
      if(state.currentFeedId)
        return rootState.feeds.feeds[state.currentFeedId]
      else
        return null
    },
  },
  mutations: {
    setCurrentEpisodeId(state, id) {
      state.currentEpisodeId = id
    },
    setCurrentFeedId(state, id) {
      state.currentFeedId = id
    },
  },
  namespaced: true,
}
