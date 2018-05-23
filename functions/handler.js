axios = require("axios")
FeedMe = require("feedme")

module.exports = {
  async feed(event, context) {
    let url = event.extensions.request.query.url
    console.log("Fetching ",url)
    try {
      let data = await axios.get(url)
      let parser = new FeedMe(true)
      parser.write(data.data)
      return parser.done()
    } catch(err) {
      console.error("Failed to retrieve "+url, err)
      throw(err)
    }
  }
}
