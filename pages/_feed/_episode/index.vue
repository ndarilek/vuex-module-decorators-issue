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
import Vue from "vue"
import {namespace} from "vuex-class"
import Component from "vue-class-component"

const feeds = namespace("feeds")

const player = namespace("player")

const status = namespace("status")

@Component({
  head() {
    return {
      title: this.episode ? this.episode.title : "Loading..."
    }
  }
})
export default class extends Vue {

  @feeds.State feeds

  get feedId() {
    return this.$route.params.feed
  }

  get id() {
    return this.$route.params.episode
  }

  get feed() {
    return this.feeds[this.feedId]
  }

  get episode() {
    return this.feed ? this.feed.items.find((v) => v.link == this.id) : {}
  }

  get description() {
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

  @player.Mutation setCurrentEpisodeId

  @player.Mutation setCurrentFeedId

  @status.Mutation("remove") removeStatus

  clearStatus() {
    this.removeStatus(this.episode.link)
  }

  mounted() {
    if(this.episode && this.episode.enclosure && this.episode.enclosure.url) {
      this.setCurrentFeedId(this.feed.id)
      this.setCurrentEpisodeId(this.episode.link)
    }
  }

}

</script>
