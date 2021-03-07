const faunadb = require("faunadb"),
  q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async event => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Only POST method is allowed.",
      };
    }

    const { todoIds } = JSON.parse(event.body);
    const response = await client.query(
      q.Map(
        todoIds,
        q.Lambda(
          "todoId",
          q.Delete(q.Ref(q.Collection("todos"), q.Var("todoId")))
        )
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};
