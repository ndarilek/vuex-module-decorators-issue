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
          <router-view/>
        </main>
      </b-col>
    </b-row>
    <b-row class="fixed-bottom" role="region" aria-label="player" v-if="currentEpisode">
      <b-col>
        <b-card overlay :img-src="currentFeed.image.url" img-alt="Podcast Logo">
          <h2 slot="header">
            <router-link :to="{name: 'feed-episode', params: {feed: currentFeed.id, episode: currentEpisode.link}}">
              {{ currentEpisode.title }}
            </router-link>
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
import Widget from "remotestorage-widget"
import Vue from "vue"
import {namespace} from "vuex-class"
import Component from "vue-class-component"

import {remoteStorage} from "@/remotestorage"

const feeds = namespace("feeds")

const player = namespace("player")

const status = namespace("status")

@Component
export default class extends Vue {

  remoteStorageWidget = new Widget(remoteStorage)

  @player.Getter currentEpisode

  @player.Getter currentFeed

  @status.Getter("current") currentStatus

  @feeds.Action importOpml

  @status.Mutation("update") updateStatus

  opmlImport() {
    const input = this.$refs.opmlImport
    if(input)
      input.click()
  }

  opmlImporting(event) {
    const reader = new FileReader()
    reader.readAsText(event.target.files[0], "UTF-8")
    reader.onload = (evt) => this.importOpml(evt.target.result)
    // reader.onerror = (evt) => console.error(evt)
  }

  mounted() {
    // this.remoteStorageWidget.attach()
  }

  updated() {
    const p = this.$refs.player
    if(!p)
      return
    /*p.addEventListener("canplay", () => {
    })*/
    p.addEventListener("timeupdate", () => {
      this.updateStatus(this.currentEpisode.link, {currentTime: player.currentTime})
    })
  }

}

</script>
