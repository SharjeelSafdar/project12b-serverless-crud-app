import React, { FC } from "react";
import { Typography } from "@material-ui/core";

import TodoItem from "../todoItem";
import { Todo } from "../../types/types";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: FC<TodoListProps> = ({ todos, setTodos }) => {
  return (
    <>
      {todos.length === 0 ? (
        <Typography variant="body1">There are no tasks; enjoy. ;)</Typography>
      ) : (
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))
      )}
    </>
  );
};

export default TodoList;
