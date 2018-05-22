export const state = () => ({
  currentEpisodeId: null,
  currentFeedId: null
})

export const getters = {

  currentEpisode(state, getters) {
    if(state.currentEpisodeId && getters.currentFeed)
      return getters.currentFeed.items.find(v => v.link = state.currentEpisodeId)
    else
      return null
  },

  currentFeed(state, getters, rootState) {
    if(state.currentFeedId)
      return rootState.feeds[state.currentFeedId]
    else
      return null
  }

}

export const mutations = {

  setCurrentEpisodeId(state, id) {
    state.currentEpisodeId = id
  },

  setCurrentFeedId(state, id) {
    state.currentFeedId = id
  }

}
