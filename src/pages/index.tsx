import { apiCall } from "@/utils";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/atoms/Button";
import Navbar from "../components/Navbar";
import { addTodo } from "../store/todo";

const TodoPage = () => {
  const localTodos = useSelector((state) => state.todo.list);
  const [todos, setTodos] = useState(localTodos);
  const [newTodo, setNewTodo] = useState("");

  const userId = useSelector((state) => state.user.userId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) getTodosFromDB();
    else setTodos(localTodos);
    console.log("🚀 ~ file: index.tsx:10 ~ TodoPage ~ todos", todos);
  }, []);

  useEffect(() => {
    setTodos(localTodos);
  }, [JSON.stringify(localTodos)]);

  async function getTodosFromDB() {
    apiCall
      .get("http://localhost:8000/todos")
      .then((json) => {
        setTodos(json.data.todos);
        dispatch(addTodo(json.data.todos));
      })
      .catch((err) => console.error(err));
  }

  async function postNewTodo() {
    try {
      await apiCall.post("http://localhost:8000/todos", {
        task: newTodo,
        isDone: false,
        userId,
      });
      setNewTodo("");
      getTodosFromDB();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="mt-20 flex h-screen w-full flex-col items-center">
        <h1 className="mb-20 bg-gradient-to-r from-yellow-400 via-green-300 to-blue-600 bg-clip-text text-7xl font-bold text-transparent">
          todos
        </h1>
        <input
          className=" mb-10 w-11/12 rounded-full border-2 border-slate-100 px-6 py-2 shadow-md focus:outline-blue-500 sm:w-2/3 "
          placeholder="Add todo..."
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
                  }),
                );
              setNewTodo("");
            }
          }}
        />
        <ul className="w-11/12 sm:w-2/3">
          {todos?.map((item, idx) => (
            <div
              key={idx}
              className="flex w-full items-center justify-between border-b border-gray-200 py-2"
            >
              <span className="flex gap-x-4">
                <input
                  type="checkbox"
                  checked={item.completed}
                  className="cursor-pointer"
                  onChange={() => {
                    setTodos(
                      todos.map((todo) => {
                        if (item.title === todo.title) {
                          return { ...todo, completed: !todo.completed };
                        } else {
                          return todo;
                        }
                      }),
                    );
                  }}
                />
                <li
                  key={item.id}
                  className={clsx(
                    item.completed && "italic text-gray-400 line-through",
                  )}
                >
                  {item.title}
                </li>
              </span>
              <Button
                onClick={() =>
                  setTodos(todos.filter((todo) => todo.title !== item.title))
                }
              >
                Delete
              </Button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoPage;
