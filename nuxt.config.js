module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: "%s - Podcatcher"
  },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "bootstrap-vue/nuxt"
  ],
  plugins: [
    {
      src: "~/plugins/persistedstate",
      ssr: false
    }
  ],
  mode: "spa"
}
