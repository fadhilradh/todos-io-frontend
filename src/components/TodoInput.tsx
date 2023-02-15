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

  return (
    <div className="relative w-full">
      <Input
        className="mb-10 h-14 w-11/12 rounded-full border-2 border-slate-100 px-6 py-2 text-lg text-slate-600 shadow-md sm:w-7/12 "
        isLoading={isLoading}
        placeholder={
          isLoading ? "Updating your todo list..." : "Type something to do"
        }
        value={isLoading ? "Updating your todo list..." : newTodo}
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
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-[165px] h-10 rounded-full px-1 focus:ring-0 active:opacity-70"
        onClick={postNewTodo}
      >
        <ArrowRightCircle size={28} className=" text-slate-400" />
      </Button>
    </div>
  );
};

export default TodoInput;
