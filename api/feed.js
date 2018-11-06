import axios  from "axios"
import FeedMe from "feedme"

export const handler = async (event, context, callback) => {
  const url = event.queryStringParameters.url
  try {
    const data = await axios.get(url)
    const parser = new FeedMe(true)
    parser.write(data.data)
    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(parser.done())
    })
  } catch(err) {
    callback(err)
  }
}
