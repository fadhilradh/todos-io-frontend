import { api } from "@/utils";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
import { useTypedSelector } from "@/utils/typedStore";

const TodoPage = () => {
  const localTodos = useTypedSelector((state) => state.todo.list);
  const isLoggedIn = useTypedSelector((state) => state.user.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const [parent] = useAutoAnimate();
  const [todos, setTodos] = useState(isLoggedIn ? [] : localTodos);

  useEffect(() => {
    if (isLoggedIn) getTodosFromDB();
    else setTodos(localTodos);
  }, []);

  useEffect(() => {
    setTodos(localTodos);
  }, [JSON.stringify(localTodos)]);

  useEffect(() => {
    if (!isLoggedIn) setTodos(localTodos);
  }, [isLoggedIn]);

  async function getTodosFromDB() {
    setIsLoading(true);
    api("get", "/todos")
      .then((data) => {
        setTodos(data?.todos?.sort((a, b) => a.completed - b.completed));
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full flex-col items-center bg-[#FCFCFC] pt-20">
        <h1 className="mb-20 bg-gradient-to-r  from-green-300 to-blue-600 bg-clip-text text-7xl font-bold text-transparent">
          todos.io
        </h1>
        <TodoInput
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          getTodosFromDB={getTodosFromDB}
        />
        <TodoList
          todos={todos}
          getTodosFromDB={getTodosFromDB}
          ref={parent}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
};

export default TodoPage;
