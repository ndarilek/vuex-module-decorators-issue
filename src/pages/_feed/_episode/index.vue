<template>
  <div>
    <h1>{{ episode.title }}</h1>
    <b-button-toolbar>
      <b-button @click="clearStatus">Clear Status</b-button>
    </b-button-toolbar>
    <div role="region" aria-label="episode" v-html="description"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import {namespace} from "vuex-class"

const feeds = namespace("feeds")

const player = namespace("player")

const status = namespace("status")

@Component({
  metaInfo() {
    return {
      title: this.episode ? this.episode.title : "Loading...",
    }
  },
})
export default class extends Vue {

  @feeds.State feeds: any

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
    return this.feed ? this.feed.items.find((v: any) => v.link === this.id) : {}
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

  @player.Mutation setCurrentEpisodeId: any

  @player.Mutation setCurrentFeedId: any

  @status.Mutation("remove") removeStatus: any

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
