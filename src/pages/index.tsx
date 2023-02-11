import { apiCall } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { addTodo, removeTodo, updateTodoStatus } from "../store/todo";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Input } from "../components/atoms/Input";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
import { useTypedSelector } from "@/utils/typedStore";

const TodoPage = () => {
  const localTodos = useTypedSelector((state) => state.todo.list);
  const isLoggedIn = useTypedSelector((state) => state.user.isLoggedIn);

  const [parent] = useAutoAnimate();
  const [todos, setTodos] = useState(isLoggedIn ? [] : localTodos);

  const dispatch = useDispatch();

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
    apiCall
      .get("/todos")
      .then(({ data }) => {
        setTodos(data.todos?.sort((a, b) => a.completed - b.completed));
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full flex-col items-center bg-[#FCFCFC] pt-20">
        <h1 className="mb-20 bg-gradient-to-r from-yellow-400 via-green-300 to-blue-600 bg-clip-text text-7xl font-bold text-transparent">
          todos
        </h1>
        <TodoInput getTodosFromDB={getTodosFromDB} />
        <TodoList todos={todos} getTodosFromDB={getTodosFromDB} ref={parent} />
      </div>
    </>
  );
};

export default TodoPage;
