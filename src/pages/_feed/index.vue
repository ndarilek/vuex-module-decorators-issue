<template>
  <div v-if="feed">
    <h1>{{ feed.title }}</h1>
    <b-button-toolbar>
      <b-button @click="unsubscribe">Unsubscribe</b-button>
    </b-button-toolbar>
    <p>{{ feed.description }}</p>
    <h2>Episodes</h2>
    <episodes :feed="feed"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import {namespace} from "vuex-class"

import Episodes from "@/components/episodes.vue"

const feeds = namespace("feeds")

@Component({
  components: {
    Episodes,
  },
  metaInfo() {
    return {
      title: this.feed ? this.feed.title : "Loading...",
    }
  },
})
export default class extends Vue {

  @feeds.State feeds: any

  get id() {
    return this.$route.params.feed
  }

  get feed() {
    return this.feeds[this.id]
  }

  @feeds.Action remove: any

  unsubscribe() {
    if(confirm("Are you sure?")) {
      this.remove(this.id)
      this.$router.push({name: "index"})
    }
  }

}

</script>
