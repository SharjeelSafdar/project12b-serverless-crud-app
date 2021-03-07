const faunadb = require("faunadb"),
  q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async event => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Only POST method is allowed.",
      };
    }

    const todo = JSON.parse(event.body);
    const response = await client.query(
      q.Create(q.Collection("todos"), { data: todo })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
