import { api } from "@/utils";
import { useTypedSelector } from "@/utils/typedStore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todo";
import { Button } from "./atoms/Button";
import { Input } from "./atoms/Input";
import { ArrowRightCircle } from "lucide-react";

const TodoInput = ({ getTodosFromDB, isLoading, setIsLoading }) => {
  const [newTodo, setNewTodo] = useState("");
  const isLoggedIn = useTypedSelector((state) => state.user.isLoggedIn);
  const userId = useTypedSelector((state) => state.user.userId);

  const dispatch = useDispatch();

  async function postNewTodo() {
    if (!newTodo) return;
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

  function postTodoConditionally() {
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

  return (
    <div className="mb-24 flex w-11/12 items-center gap-x-1 md:w-9/12 lg:w-7/12 xl:w-5/12">
      <Input
        className="h-14 rounded-full border-2 border-slate-100 px-6 py-2 text-lg text-accent-primary shadow-md focus:ring-[6px]   "
        isLoading={isLoading}
        placeholder={
          isLoading ? "updating your todo list..." : "Type something to do"
        }
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            postTodoConditionally();
          }
        }}
      />
      <Button
        variant="ghost"
        className="h-10 rounded-full px-1 shadow-none focus:ring-0 active:opacity-70"
        onClick={postTodoConditionally}
      >
        <ArrowRightCircle size={80} className=" text-accent-primary" />
      </Button>
    </div>
  );
};

export default TodoInput;
