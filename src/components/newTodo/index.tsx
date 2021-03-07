import React, { FC, useState } from "react";
import { Container, IconButton, TextField } from "@material-ui/core";
import { FaPlus } from "react-icons/fa";

import { useStyles } from "./styles";
import { addNewTodo } from "../../api";
import { Todo } from "../../types/types";

interface NewTodoProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const NewTodo: FC<NewTodoProps> = ({ setTodos }) => {
  const classes = useStyles();
  const [text, setText] = useState("");

  const handleNewTodoAddition = () => {
    addNewTodo(text)
      .then(newTodo => {
        if (newTodo) {
          setTodos(prev => [...prev, newTodo]);
          console.log("new Todo added");
          setText("");
        }
      })
      .catch(err => {
        console.log("Something went wrong while adding new todo.");
        console.log(err);
      });
  };

  return (
    <Container className={classes.container}>
      <TextField
        value={text}
        onChange={e => setText(e.target.value)}
        variant="standard"
        label="Todo Content"
        fullWidth
      />
      <IconButton
        onClick={handleNewTodoAddition}
        className={classes.addBtn}
        title="Add new todo."
        color="primary"
        aria-label="add"
      >
        <FaPlus />
      </IconButton>
    </Container>
  );
};

export default NewTodo;
