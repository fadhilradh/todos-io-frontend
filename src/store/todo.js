import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.list.push(payload);
    },
    removeTodo: (state, { payload }) => {
      state.list = state.list.filter((todo) => todo.id !== payload.id);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
