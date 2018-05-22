<template>
  <div>
    <h1>{{ episode.title }}</h1>
    <b-button-toolbar>
      <b-button @click="clearStatus">Clear Status</b-button>
    </b-button-toolbar>
    <div role="region" aria-label="episode" v-html="description"/>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"

export default {
  computed: {
    feedId() {
      return this.$route.params.feed
    },
    id() {
      return this.$route.params.episode
    },
    ...mapState({
      episode: function({feeds}) { return feeds[this.feedId].items.find((v) => v.link == this.id) },
      feed: function({feeds}) { return feeds[this.feedId] }
    }),
    description() {
      if(this.episode) {
        const episode = this.episode
        if(episode["content:encoded"])
          return episode["content:encoded"]
        else if(episode.description)
          return episode.description
        else if(episode.text)
          return episode.text
        else
          return ""
      } else
        return ""
    }
  },
  methods: {
    ...mapMutations({
      setCurrentEpisodeId: "player/setCurrentEpisodeId",
      setCurrentFeedId: "player/setCurrentFeedId",
      removeStatus: "status/remove"
    }),
    clearStatus() {
      this.removeStatus(this.episode.link)
    }
  },
  mounted() {
    if(this.episode && this.episode.enclosure && this.episode.enclosure.url) {
      this.setCurrentFeedId(this.feed.id)
      this.setCurrentEpisodeId(this.episode.link)
    }
  },
  head() {
    return {title: this.episode.title}
  }
}

</script>
