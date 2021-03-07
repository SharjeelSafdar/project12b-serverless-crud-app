import React, { FC, useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@material-ui/core";

import { useStyles } from "./styles";
import { Todo } from "../../types/types";
import { updateTodo } from "../../api";

export interface EditTaskModalProps {
  modalStatus: boolean;
  closeModal: () => void;
  oldTodo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const EditTodoModal: FC<EditTaskModalProps> = ({
  modalStatus,
  closeModal,
  oldTodo,
  setTodos,
}) => {
  const classes = useStyles();
  const [newTodoContent, setNewTodoContent] = useState(oldTodo.content);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (todoContent: string) => {
    let error = "";
    if (todoContent.trim().length === 0) {
      error = "Should not be empty.";
      setIsError(true);
    } else {
      setIsError(false);
    }
    setErrorMessage(error);
    return error;
  };
  const validateOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    validate(newContent);
    setNewTodoContent(newContent);
  };
  const editTodoHandler = () => {
    const error = validate(newTodoContent);
    if (error === "") {
      updateTodo({
        ...oldTodo,
        content: newTodoContent,
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
      closeModal();
    }
  };

  return (
    <Modal open={modalStatus} onClose={closeModal}>
      <Paper elevation={3} className={classes.modal}>
        <Typography variant="h5" component="h2">
          Edit Task
        </Typography>
        <Box marginTop={3} marginBottom={3}>
          <TextField
            value={newTodoContent}
            onChange={validateOnChange}
            error={isError}
            helperText={errorMessage}
            variant="outlined"
            label="New Task"
            fullWidth
            autoFocus
          />
        </Box>
        <Button
          onClick={editTodoHandler}
          variant="contained"
          color="primary"
          fullWidth
        >
          Update Todo
        </Button>
      </Paper>
    </Modal>
  );
};

export default EditTodoModal;
