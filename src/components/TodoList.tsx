import { apiCall } from "@/utils";
import { useTypedSelector } from "@/utils/typedStore";
import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodoStatus } from "../store/todo";
import { Todo } from "../types/todos";
import { Button } from "./atoms/Button";

interface ITodoListProps {
  todos: Todo[];
  getTodosFromDB: () => void;
}

const TodoList = React.forwardRef<HTMLUListElement, ITodoListProps>(
  ({ todos, getTodosFromDB }, ref) => {
    const isLoggedIn = useTypedSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    async function updateTodoStatusInDB(id: string, isCompleted: boolean) {
      try {
        await apiCall.patch(`/todos/${id}`, {
          isCompleted,
        });
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
      <ul
        ref={ref}
        className="flex w-11/12 flex-col items-center justify-center sm:w-2/3"
      >
        {todos?.length > 0 ? (
          todos?.map(({ completed, id, title }, idx) => (
            <div
              key={idx}
              className="flex w-full items-center justify-between border-b border-gray-200 py-2"
            >
              <span className="flex items-center gap-x-4">
                <input
                  type="checkbox"
                  className="w-4 cursor-pointer"
                  checked={completed}
                  onChange={() => {
                    if (isLoggedIn) updateTodoStatusInDB(id, completed);
                    else
                      dispatch(
                        updateTodoStatus({
                          id: id,
                          completed: completed,
                        }),
                      );
                  }}
                />
                <li
                  key={id}
                  className={clsx(
                    completed && "italic text-gray-400 line-through",
                  )}
                >
                  {title}
                </li>
              </span>
              <Button
                onClick={() => {
                  if (isLoggedIn) {
                    deleteTodoFromDB(id);
                  } else {
                    dispatch(removeTodo(id));
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
    );
  },
);

export default TodoList;
