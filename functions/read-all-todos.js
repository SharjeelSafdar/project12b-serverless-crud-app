const faunadb = require("faunadb"),
  q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async event => {
  try {
    const res = await client.query(q.Paginate(q.Match(q.Index("allTodos"))));
    const todoRefs = res.data;
    const todos = await client.query(
      q.Map(todoRefs, q.Lambda("todoRef", q.Get(q.Var("todoRef"))))
    );

    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};
