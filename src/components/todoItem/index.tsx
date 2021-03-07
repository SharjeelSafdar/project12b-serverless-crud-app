import React, { FC, useState } from "react";
import { Container, Box, IconButton, Typography } from "@material-ui/core";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import EditTodoModal from "../editTodoModal";
import { useStyles } from "./styles";
import { Todo } from "../../types/types";
import { updateTodo, deleteTodo } from "../../api";

interface TodoItemProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: FC<TodoItemProps> = ({ todo, setTodos }) => {
  const classes = useStyles();
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  const toggleTodoStatus = () => {
    updateTodo({
      ...todo,
      status: !todo.status,
    }).then(res => {
      if (res) {
        setTodos(prev => {
          let tempTodos: Todo[] = [];
          prev.forEach(todo => {
            if (todo.id === res.id) {
              tempTodos.push(res);
            } else {
              tempTodos.push(todo);
            }
          });
          return tempTodos;
        });
      }
    });
  };

  const deleteTodoHandler = () => {
    deleteTodo(todo.id).then(deletedId => {
      if (deletedId) {
        setTodos(prev => {
          let tempTodos: Todo[] = [];
          prev.forEach(todo => {
            if (todo.id !== deletedId) {
              tempTodos.push(todo);
            }
          });
          return tempTodos;
        });
      }
    });
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.toggleBtn}>
        <IconButton
          onClick={toggleTodoStatus}
          title="Toggle status."
          size="small"
        >
          {todo.status ? (
            <BsCheckCircle color="#0f0" />
          ) : (
            <BsCircle color="#888" />
          )}
        </IconButton>
      </Box>
      <Box>
        <Typography variant="body2">{todo.content}</Typography>
      </Box>
      <Box className={classes.editBtn}>
        <IconButton
          onClick={() => setShowEditTaskModal(true)}
          title="Edit todo."
          color="primary"
          size="small"
          aria-label="edit task"
        >
          <MdEdit />
        </IconButton>
        <EditTodoModal
          modalStatus={showEditTaskModal}
          closeModal={() => setShowEditTaskModal(false)}
          oldTodo={todo}
          setTodos={setTodos}
        />
      </Box>
      <Box className={classes.deleteBtn}>
        <IconButton
          onClick={deleteTodoHandler}
          title="Delete todo."
          color="primary"
          size="small"
          aria-label="delete task"
        >
          <AiTwotoneDelete />
        </IconButton>
      </Box>
    </Container>
  );
};

export default TodoItem;
