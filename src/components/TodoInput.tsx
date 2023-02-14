import { api } from "@/utils";
import { useTypedSelector } from "@/utils/typedStore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todo";
import { Input } from "./atoms/Input";

const TodoInput = ({ getTodosFromDB, isLoading, setIsLoading }) => {
  const [newTodo, setNewTodo] = useState("");
  const isLoggedIn = useTypedSelector((state) => state.user.isLoggedIn);
  const userId = useTypedSelector((state) => state.user.userId);

  const dispatch = useDispatch();

  async function postNewTodo() {
    try {
      setIsLoading(true);
      await api("post", "/todos", {
        data: {
          task: newTodo,
          isDone: false,
          userId,
        },
      });
      setNewTodo("");
      getTodosFromDB();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Input
      className="mb-10 w-11/12 rounded-full border-2 border-slate-100 px-6 py-2 shadow-md sm:w-6/12 "
      isLoading={isLoading}
      placeholder={
        isLoading ? "Updating your todo list..." : "Type something to do"
      }
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && newTodo !== "") {
          if (isLoggedIn) postNewTodo();
          else
            dispatch(
              addTodo({
                title: newTodo,
                completed: false,
                id: Math.random().toString(36).substr(2, 9),
              }),
            );
          setNewTodo("");
        }
      }}
    />
  );
};

export default TodoInput;
