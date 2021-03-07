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

    const { todoId, newTodo } = JSON.parse(event.body);
    const response = await client.query(
      q.Update(q.Ref(q.Collection("todos"), todoId), { data: newTodo })
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
