import { api } from "@/utils"
import { useTypedSelector } from "@/utils/typedStore"
import clsx from "clsx"
import { LucideCheck, LucideEdit2, LucideTrash, LucideX } from "lucide-react"
import React from "react"
import { useDispatch } from "react-redux"
import { useToast } from "../hooks/useToast"
import { removeTodo, updateTodo as updateTodoLocally } from "../store/todo"
import { Todo } from "../types/todos"
import { Button } from "./atoms/Button"
import { Checkbox } from "./atoms/Checkbox"
import { Input } from "./atoms/Input"

interface ITodoListProps {
  todos: Todo[]
  getTodosFromDB: () => void
  setIsLoading: (isLoading: boolean) => void
  setTodos: (todos: Todo[]) => void
}

const TodoList = React.forwardRef<HTMLUListElement, ITodoListProps>(
  ({ todos, getTodosFromDB, setTodos, setIsLoading }, ref) => {
    const isLoggedIn = useTypedSelector((state) => state.user.isLoggedIn),
      dispatch = useDispatch(),
      [isEditingIds, setIsEditingIds] = React.useState([]),
      [editedTodos, setEditedTodos] = React.useState([]),
      { toast } = useToast()

    async function updateTodoStatusInDB(id: string, isCompleted: boolean) {
      try {
        setIsLoading(true)
        await api("patch", `/todos/${id}`, {
          data: {
            isCompleted,
          },
        })
        toast({
          description: `Successfully marked as ${
            isCompleted ? "incomplete" : " "
          }`,
          color: "",
          duration: 2000,
        })
        getTodosFromDB()
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    async function deleteTodoFromDB(id) {
      try {
        setIsLoading(true)
        await api("delete", `/todos/${id}`)
        toast({
          description: "Todo successfully deleted",
          duration: 2000,
        })
        getTodosFromDB()
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    async function updateTodo(todoId: string, title: string) {
      if (!isLoggedIn) {
        dispatch(updateTodoLocally({ id: todoId, title }))
        setIsEditingIds(isEditingIds.filter((id) => todoId !== id))
        toast({
          description: "Todo successfully edited",
          duration: 2000,
        })
        return
      }
      try {
        setIsLoading(true)
        await api("patch", `/todos/title/${todoId}`, {
          data: {
            title,
          },
        })
        setIsEditingIds(isEditingIds.filter((id) => todoId !== id))
        getTodosFromDB()
        toast({
          description: "Todo successfully edited",
          duration: 2000,
        })
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <ul
        ref={ref}
        className="flex w-11/12 flex-col items-center justify-center md:w-9/12 lg:w-7/12 xl:w-5/12"
      >
        {todos?.length > 0 ? (
          todos?.map(({ completed, id, title }, idx) => (
            <div
              key={idx}
              className="mb-4 flex w-full items-center justify-between border-b border-gray-200 pt-2 pb-4"
            >
              <span className="flex items-center gap-x-4">
                {!isEditingIds.includes(id) && (
                  <Checkbox
                    className="w-4 cursor-pointer"
                    checked={completed}
                    title={`Mark as ${completed ? "incomplete" : "complete"}`}
                    onCheckedChange={() => {
                      if (isLoggedIn) updateTodoStatusInDB(id, completed)
                      else
                        dispatch(
                          updateTodoLocally({
                            id: id,
                            completed: completed,
                          }),
                        )
                    }}
                  />
                )}
                {isEditingIds.includes(id) ? (
                  <Input
                    className="text-lg text-slate-500"
                    wrapperClassName="w-10/12"
                    value={title}
                    onChange={(e) => {
                      if (!editedTodos.includes(id)) {
                        setEditedTodos([...editedTodos, id])
                      }
                      setTodos(
                        todos.map((todo) => {
                          if (todo.id === id) {
                            return {
                              ...todo,
                              title: e.target.value,
                            }
                          }
                          return todo
                        }),
                      )
                    }}
                  />
                ) : (
                  <li
                    key={id}
                    className={clsx(
                      "text-lg ",
                      completed
                        ? "italic text-gray-400 line-through"
                        : "text-accent-primary",
                    )}
                  >
                    {title}
                  </li>
                )}
              </span>
              {isEditingIds.includes(id) ? (
                <span className="flex gap-x-2">
                  <Button
                    className="bg-gradient-to-br from-blue-400 to-green-400 "
                    size="sm"
                    disabled={!editedTodos.includes(id)}
                    onClick={() => {
                      const todoTitle = todos.filter(
                        (todo) => todo.id === id,
                      )[0].title
                      updateTodo(id, todoTitle)
                      setEditedTodos(
                        editedTodos.filter((editedId) => editedId !== id),
                      )
                    }}
                  >
                    <LucideCheck />
                  </Button>
                  <Button
                    className="bg-gradient-to-br from-red-400 to-green-400"
                    size="sm"
                    onClick={() =>
                      setIsEditingIds(isEditingIds.filter((i) => i !== id))
                    }
                  >
                    <LucideX />
                  </Button>
                </span>
              ) : (
                <span className="flex gap-x-2">
                  <Button
                    className="bg-gradient-to-br from-blue-400 to-green-400 "
                    size="sm"
                    title="Edit todo"
                    onClick={() => setIsEditingIds([...isEditingIds, id])}
                  >
                    <LucideEdit2 />
                  </Button>
                  <Button
                    className="bg-gradient-to-tr from-green-400 to-red-400"
                    title="Delete todo"
                    size="sm"
                    onClick={() => {
                      if (isLoggedIn) {
                        deleteTodoFromDB(id)
                      } else {
                        dispatch(removeTodo(id))
                      }
                    }}
                  >
                    <LucideTrash />
                  </Button>
                </span>
              )}
            </div>
          ))
        ) : (
          <p className="text-slate-500">Wow, you have nothing to do !</p>
        )}
      </ul>
    )
  },
)

export default TodoList
