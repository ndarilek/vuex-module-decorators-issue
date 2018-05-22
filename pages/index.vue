<template>
  <div>
    <h1>Feeds</h1>
    <b-button-toolbar>
      <b-button @click="refresh">Refresh</b-button>
    </b-button-toolbar>
    <nav role="region" aria-label="feeds">
      <b-table striped :items="feeds" :fields="fields" sort-by="title">
        <template slot="title" slot-scope="data">
          <nuxt-link :to="{name: 'feed', params: {feed: data.item.id}}">
            {{ data.item.title }}
          </nuxt-link>
        </template>
        <template slot="description" slot-scope="data">
          <span class="d-inline-block text-truncate" style="max-width: 150px;" v-html="data.item.description"/>
        </template>
        <template slot="episodes" slot-scope="data">
          {{ data.item.items.length }}
        </template>
      </b-table>
    </nav>
    <b-form inline @submit.prevent="submit">
      <label for="url">URL</label>
      <b-input id="url" v-model="url" required/>
      <b-button type="submit" variant="primary">Subscribe</b-button>
    </b-form>
  </div>
</template>

<script>
import moment from "moment"
import {mapActions, mapGetters} from "vuex"

export default {
  data: () => ({
    fields: [
      {
        key: "title",
        sortable: true
      },
      "description",
      "episodes",
      {
        key: "lastbuilddate",
        label: "Last Updated",
        formatter: (value) => moment(value).calendar(),
        sortable: true
      }
    ],
    url: ""
  }),
  computed: mapGetters({
    feeds: "feeds/feeds"
  }),
  methods: {
    ...mapActions({
      fetch: "feeds/fetch",
      refresh: "feeds/fetchAll"
    }),
    async submit() {
      await this.fetch(this.url)
      this.url = ""
    }
  },
  head: {
    title: "Feeds"
  }
}

</script>
