import axios from "axios"
import "babel-polyfill"
import express from "express"
import FeedMe from "feedme"
import {Builder, Nuxt} from "nuxt-edge"
import logger from "morgan"

const app = express()

app.use(logger("dev"))

const host = process.env.HOST || "127.0.0.1"
const port = process.env.PORT || "3000"

// Import and Set Nuxt.js options
const config = require("./nuxt.config.js")
config.dev = !(process.env.NODE_ENV === "production")

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use("/api/feedme", async (req, res) => {
  const {url} = req.query
  const data = await axios.get(url)
  const parser = new FeedMe(true)
  parser.write(data.data)
  res.json(parser.done())
})

// nuxt middleware
app.use(nuxt.render)

app.listen(port, host, () => console.log(`Server listening on ${host}:${port}`))
