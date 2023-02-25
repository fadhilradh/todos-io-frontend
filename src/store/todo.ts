import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types/todos";

interface TodoSlice {
  list: Todo[];
}

const initialState: TodoSlice = {
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      if (payload instanceof Array) {
        state.list.push(...payload);
      } else {
        state.list.push(payload);
      }
    },
    removeTodo: (state, { payload }) => {
      state.list = state.list.filter((todo) => todo.id !== payload);
    },
    updateTodo: (state, { payload: { id, completed, title } }) => {
      state.list = state.list
        .map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              ...(completed !== undefined && { completed: !completed }),
              ...(title && { title }),
            };
          }
          return todo;
        })
        .sort((a, b) => {
          return a.completed >= b.completed ? 1 : -1;
        });
    },
    deleteAllLocalTodos: (state) => {
      state.list = [];
    },
  },
});

export const { addTodo, removeTodo, updateTodo, deleteAllLocalTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
