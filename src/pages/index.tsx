import { apiCall } from "@/utils";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/atoms/Button";
import Navbar from "../components/Navbar";
import { addTodo } from "../store/todo";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Input } from "../components/atoms/Input";

const TodoPage = () => {
  const localTodos = useSelector((state) => state.todo.list);
  const [parent] = useAutoAnimate(/* optional config */);
  const [todos, setTodos] = useState(localTodos);
  const [newTodo, setNewTodo] = useState("");

  const userId = useSelector((state) => state.user.userId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) getTodosFromDB();
    else setTodos(localTodos);
  }, []);

  useEffect(() => {
    setTodos(localTodos);
  }, [JSON.stringify(localTodos)]);

  async function getTodosFromDB() {
    apiCall
      .get("/todos")
      .then(({ data }) => {
        setTodos(data.todos);
      })
      .catch((err) => console.error(err));
  }

  async function postNewTodo() {
    try {
      await apiCall.post("/todos", {
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

  async function deleteTodoFromDB(id) {
    try {
      await apiCall.delete(`/todos/${id}`);
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
        <Input
          className="mb-10 w-11/12 rounded-full border-2 border-slate-100 px-6 py-2 shadow-md sm:w-5/12 "
          placeholder="Add something to do"
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
        <ul
          ref={parent}
          className="flex w-11/12 flex-col items-center justify-center sm:w-2/3"
        >
          {todos?.length > 0 ? (
            todos?.map((item, idx) => (
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
                  onClick={() => {
                    if (isLoggedIn) {
                      deleteTodoFromDB(item.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            ))
          ) : (
            <p>Wow, you have nothing to do !</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default TodoPage;
