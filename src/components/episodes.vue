<template>
  <div>
    <nav role="region" aria-label="episodes">
      <b-table striped :items="feed.items" :fields="fields">
        <template slot="title" slot-scope="data">
          <router-link :to="{name: 'feed-episode', params: {feed: feed.id, episode: data.item.link}}">
            {{ data.item.title }}
          </router-link>
        </template>
        <template slot="description" slot-scope="data">
          <span class="d-inline-block text-truncate" style="max-width: 150px;" v-html="data.item.description"/>
        </template>
      </b-table>
    </nav>
  </div>
</template>

<script lang="ts">
import moment from "moment"
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class extends Vue {

  @Prop(Object) feed!: object

  get fields() {
    const fields = [
      "title",
      "description",
      {
        key: "pubdate",
        label: "Date",
        formatter: (value: string) => moment(value).calendar(),
      },
    ]
    if(!this.feed)
      fields.push("feed")
    return fields
  }

}

</script>
