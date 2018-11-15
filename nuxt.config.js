export default {
  head: {
    titleTemplate: "%s - Nimblepod"
  },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "bootstrap-vue/nuxt",
    "nuxt-babel"
  ],
  plugins: [
    {
      src: "~/plugins/persistedstate",
      ssr: false
    }
  ],
  mode: "spa"
}
