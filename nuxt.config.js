module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: "%s - Nimblepod"
  },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
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
