<template>
  <div>
    <nav role="region" aria-label="episodes">
      <b-table striped :items="feed.items" :fields="fields">
        <template slot="title" slot-scope="data">
          <nuxt-link :to="{name: 'feed-episode', params: {feed: feed.id, episode: data.item.link}}">
            {{ data.item.title }}
          </nuxt-link>
        </template>
        <template slot="description" slot-scope="data">
          <span class="d-inline-block text-truncate" style="max-width: 150px;" v-html="data.item.description"/>
        </template>
      </b-table>
    </nav>
  </div>
</template>

<script>
import moment from "moment"
import Vue from "vue"
import Component from "vue-class-component"

@Component({
  props: {
    feed: {
      type: Object
    }
  }
})
export default class extends Vue {

  get fields() {
    const fields = [
      "title",
      "description",
      {
        key: "pubdate",
        label: "Date",
        formatter: (value) => moment(value).calendar()
      }
    ]
    if(!this.feed)
      fields.push("feed")
    return fields
  }

}

</script>
