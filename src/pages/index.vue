<template>
  <div>
    <h1>Feeds</h1>
    <b-button-toolbar>
      <b-button @click="refresh">Refresh</b-button>
    </b-button-toolbar>
    <nav role="region" aria-label="feeds">
      <b-table striped :items="feeds" :fields="fields" sort-by="title">
        <template slot="title" slot-scope="data">
          <router-link :to="{name: 'feed', params: {feed: data.item.id}}">
            {{ data.item.title }}
          </router-link>
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

<script lang="ts">
import moment from "moment"
import {Component, Vue} from "vue-property-decorator"
import {namespace} from "vuex-class"

const feeds = namespace("feeds")

@Component({
  metaInfo: {
    title: "Feeds",
  },
})
export default class extends Vue {

  fields = [
    {
      key: "title",
      sortable: true,
    },
    "description",
    "episodes",
    {
      key: "lastbuilddate",
      label: "Last Updated",
      formatter: (value: string) => moment(value).calendar(),
      sortable: true,
    },
  ]

  url = ""

  @feeds.Getter feeds: any

  @feeds.Action fetch: any

  @feeds.Action("fetchAll") refresh: any

  async submit() {
    await this.fetch(this.url)
    this.url = ""
  }

}

</script>
