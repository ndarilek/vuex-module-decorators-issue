<template>
  <div>
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
import {mapActions, mapState} from "vuex"

import Episodes from "~/components/episodes"

export default {
  computed: {
    id() {
      return this.$route.params.feed
    },
    ...mapState({
      feed: function({feeds}) { return feeds[this.id] }
    })
  },
  methods: {
    ...mapActions({
      remove: "feeds/remove"
    }),
    unsubscribe() {
      if(confirm("Are you sure?")) {
        this.remove(this.id)
        this.$router.push({name: "index"})
      }
    }
  },
  components: {Episodes},
  head() {
    return {title: this.feed.title}
  }
}

</script>
