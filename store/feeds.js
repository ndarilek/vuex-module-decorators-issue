import Vue from "vue"

export const state = () => ({
  feeds: {}
})

export const mutations = {

  add(state, feed) {
    let link = feed["atom:link"] || feed.link
    if(link.constructor == Array)
      link = link.find((v) => v.rel == "self")
    const id = link.href || link
    feed.id = id
    Vue.set(state.feeds, id, feed)
  },

  remove(state, id) {
    Vue.delete(state.feeds, id)
  }

}

export const getters = {

  feeds(state) {
    return Object.values(state.feeds)
  }

}

export const actions = {

  async fetch({commit}, url) {
    try {
      const data = await this.$axios.$get(`https://nimblepod.thewordnerd.info/.netlify/functions/feed?url=${url}`)
      commit("add", data)
    } catch(e) {
      console.error(`Error updating feed: ${url}`, e)
    }
  },

  fetchAll({dispatch, state}) {
    Object.keys(state.feeds).forEach((feed) => dispatch("fetch", feed))
  },

  importOpml({dispatch}, opml) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(opml, "application/xml")
    doc.querySelectorAll("outline").forEach((feed) => {
      dispatch("fetch", feed.getAttribute("xmlUrl"))
    })
  }

}
