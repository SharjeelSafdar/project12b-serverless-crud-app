import { Todo } from "../types/types";

export const getAllTodos = async () => {
  try {
    const res = await (
      await fetch("/.netlify/functions/read-all-todos")
    ).json();
    const todos: Todo[] = res.map((item: any) => ({
      content: item.data.content,
      status: item.data.status,
      id: item.ref["@ref"].id,
    }));
    return todos;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addNewTodo = async (newTodoContent: string) => {
  try {
    const res = await fetch("/.netlify/functions/create-todo", {
      method: "POST",
      body: JSON.stringify({
        content: newTodoContent,
        status: false,
      }),
    });
    const res2: NewTodoResponse = await res.json();
    return {
      content: res2.data.content,
      status: res2.data.status,
      id: res2.ref["@ref"].id,
    } as Todo;
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = (newTodo: Todo) => {
  return fetch("/.netlify/functions/update-todo", {
    method: "POST",
    body: JSON.stringify({
      todoId: newTodo.id,
      newTodo: {
        content: newTodo.content,
        status: newTodo.status,
      },
    }),
  })
    .then(res => res.json())
    .then((res: NewTodoResponse) => {
      return {
        content: res.data.content,
        status: res.data.status,
        id: res.ref["@ref"].id,
      } as Todo;
    })
    .catch(err => {
      console.log("Error: " + err);
    });
};

export const deleteTodo = (todoId: string) => {
  return fetch(`/.netlify/functions/delete-todo?id=${todoId}`)
    .then(res => res.json())
    .then((res: NewTodoResponse) => res.ref["@ref"].id)
    .catch(err => {
      console.log("Error: " + err);
    });
};

type NewTodoResponse = {
  data: {
    content: string;
    status: boolean;
  };
  ts: number;
  ref: Ref;
};

type Ref = {
  "@ref": {
    collection: {
      "@ref": {
        collection: {
          "@ref": {
            id: "collections";
          };
        };
        id: string;
      };
    };
    id: string;
  };
};
