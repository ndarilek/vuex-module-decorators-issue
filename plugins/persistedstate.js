import RemoteStorage from 'remotestoragejs';

const PATH = "/nimblepod/"

export const remoteStorage = new RemoteStorage()
remoteStorage.setApiKeys({
  dropbox: process.env.DROPBOX_APP_KEY
})
remoteStorage.access.claim("nimblepod", "rw")
remoteStorage.caching.enable(PATH)
window.remoteStorage = remoteStorage

const client = remoteStorage.scope(PATH)

window.client = client

export default ({store}) => {
  client.on("change", (event) => {
    console.log("remoteStorage change event", event)
    if(event.relativePath == "store") {
      console.log("Store updated.")
      store.replaceState(event.newValue)
    }
  })
  store.subscribe((mutation, state) => {
    console.log("Store updated", JSON.stringify(state))
    client.storeFile("application/json", "store", JSON.stringify(state))
    .then((v) => console.log("Stored", v))
  })
}
