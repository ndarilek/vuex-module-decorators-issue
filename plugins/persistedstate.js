import RemoteStorage from 'remotestoragejs';
import createPersistedState from 'vuex-persistedstate'

export const remoteStorage = new RemoteStorage();
remoteStorage.access.claim("nimblepod", "rw")
remoteStorage.caching.enable("/nimblepod/")

export default ({store}) => {
  createPersistedState()(store)
}
