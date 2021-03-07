import React, { FC, useEffect, useState } from "react";
import { Box, Container } from "@material-ui/core";

import Layout from "../components/layout";
import SEO from "../components/seo";
import NewTodo from "../components/newTodo";
import TodoList from "../components/todoList";
import { Todo } from "../types/types";
import { getAllTodos } from "../api";

const IndexPage: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const todos = await getAllTodos();
      setTodos(todos);
    })();
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <Container maxWidth="sm">
        <NewTodo setTodos={setTodos} />
        <Box marginTop={3}>
          <TodoList todos={todos} setTodos={setTodos} />
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
