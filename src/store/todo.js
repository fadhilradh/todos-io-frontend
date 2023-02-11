import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      return [...state.todos, payload];
    },
    removeTodo: (state, { payload }) => {
      return state.todos.filter((todo) => todo.id !== payload.id);
    },
  },
});

export const { addTodo, removeTodo, getTodo } = todoSlice.actions;

export default todoSlice.reducer;
