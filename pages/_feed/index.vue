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

<script>
import Vue from "vue"
import {namespace} from "vuex-class"
import Component from "vue-class-component"

import Episodes from "~/components/episodes"

const feeds = namespace("feeds")

@Component({
  components: {Episodes},
  head() {
    return {
      title: this.feed ? this.feed.title : "Loading..."
    }
  }
})
export default class extends Vue {

  @feeds.State feeds

  get id() {
    return this.$route.params.feed
  }

  get feed() {
    return this.feeds[this.id]
  }

  @feeds.Action remove

  unsubscribe() {
    if(confirm("Are you sure?")) {
      this.remove(this.id)
      this.$router.push({name: "index"})
    }
  }

}

</script>
