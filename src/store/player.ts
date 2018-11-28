import {Module, Mutation, VuexModule} from "vuex-module-decorators"

@Module({
  namespaced: true,
})
export default class extends VuexModule {

  currentEpisodeId?: string

  currentFeedId?: string

  get currentEpisode() {
    if(this.currentEpisodeId && this.context.getters.currentFeed)
      return this.context.getters.currentFeed.items.find((v: any) => v.link === this.currentEpisodeId)
    else
      return null
  }

  get currentFeed() {
    if(this.currentFeedId)
      return this.context.rootState.feeds.feeds[this.currentFeedId]
    else
      return null
  }

  @Mutation
  setCurrentEpisodeId(id: string) {
    this.currentEpisodeId = id
  }

  setCurrentFeedId(id: string) {
    this.currentFeedId = id
  }

}
