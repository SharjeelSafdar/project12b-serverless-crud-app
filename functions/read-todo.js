const faunadb = require("faunadb"),
  q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async event => {
  try {
    const todoId = event.queryStringParameters.id;
    const todo = await client.query(
      q.Get(q.Ref(q.Collection("todos"), todoId))
    );

    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};
