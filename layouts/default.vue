<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-navbar toggleable="md" fixed="top">
          <b-navbar-toggle target="navitems"/>
          <b-navbar-brand>Nimblepod</b-navbar-brand>
          <b-collapse is-nav id="navitems">
            <b-navbar-nav>
              <b-nav-item :to="{name: 'index'}">Home</b-nav-item>
              <b-nav-dropdown text="OPML">
                <b-dropdown-item @click.prevent="opmlImport">Import</b-dropdown-item>
              </b-nav-dropdown>
              <b-nav-item>Settings</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <main>
          <nuxt/>
        </main>
      </b-col>
    </b-row>
    <b-row class="fixed-bottom" role="region" aria-label="player" v-if="currentEpisode">
      <b-col>
        <b-card overlay :img-src="currentFeed.image.url" img-alt="Podcast Logo">
          <h2 slot="header">
            <nuxt-link :to="{name: 'feed-episode', params: {feed: currentFeed.id, episode: currentEpisode.link}}">
              {{ currentEpisode.title }}
            </nuxt-link>
          </h2>
          <b-card-body>
            <audio controls :src="currentEpisode.enclosure.url" ref="player"/>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <input ref="opmlImport" @change="opmlImporting" type="file" style="visibility: hidden;"/>
  </b-container>
</template>

<script>
import Widget from 'remotestorage-widget';
import {mapActions, mapGetters, mapMutations} from "vuex"

import {remoteStorage} from "~/plugins/persistedstate"

export default {
  data: () => ({
    remoteStorageWidget: new Widget(remoteStorage)
  }),
  computed: mapGetters({
    currentEpisode: "player/currentEpisode",
    currentFeed: "player/currentFeed",
    currentStatus: "status/current"
  }),
  methods: {
    ...mapActions({
      importOpml: "feeds/importOpml"
    }),
    ...mapMutations({
      updateStatus: "status/update"
    }),
    opmlImport() {
      const input = this.$refs.opmlImport
      if(input)
        input.click()
    },
    opmlImporting(event) {
      const reader = new FileReader()
      reader.readAsText(event.target.files[0], "UTF-8")
      reader.onload = (evt) => this.importOpml(evt.target.result)
      reader.onerror = (evt) => console.log(evt)
    }
  },
  mounted() {
    this.remoteStorageWidget.attach()
  },
  updated() {
    const player = this.$refs.player
    if(!player)
      return
    player.addEventListener("canplay", () => {
    })
    player.addEventListener("timeupdate", () => {
      this.updateStatus(this.currentEpisode.link, {currentTime: player.currentTime})
    })
  }
}

</script>
