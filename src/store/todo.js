import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      state.list = state.list.filter((todo) => todo.id !== payload.id);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
