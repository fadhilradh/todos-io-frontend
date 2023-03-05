import { api } from "@/utils"
import { useTypedSelector } from "@/utils/typedStore"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../store/todo"
import { Button } from "./atoms/Button"
import { Input } from "./atoms/Input"
import { ArrowRightCircle } from "lucide-react"

const TodoInput = ({ getTodosFromDB, isLoading, setIsLoading }) => {
  const [newTodo, setNewTodo] = useState(""),
    isLoggedIn = useTypedSelector((state) => state.user.isLoggedIn),
    userId = useTypedSelector((state) => state.user.userId),
    dispatch = useDispatch()

  async function postNewTodo() {
    if (!newTodo) return
    try {
      setIsLoading(true)
      await api("post", "/todos", {
        data: {
          task: newTodo,
          isDone: false,
          userId,
        },
      })
      setNewTodo("")
      getTodosFromDB()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  function postTodoConditionally() {
    if (isLoggedIn) postNewTodo()
    else
      dispatch(
        addTodo({
          title: newTodo,
          completed: false,
          id: Math.random().toString(36).substr(2, 9),
        }),
      )
    setNewTodo("")
  }

  return (
    <div className="mb-12 flex flex w-11/12 flex-col items-center gap-x-1 md:w-9/12 lg:w-7/12 xl:w-5/12">
      <Input
        className="h-12 rounded-full border-2 border-slate-100 px-6 py-2 text-lg text-accent-primary  shadow-md shadow-accent-primary placeholder:text-accent-primary"
        isLoading={isLoading}
        placeholder={
          isLoading ? "updating your todo list..." : "Type something to do"
        }
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            postTodoConditionally()
          }
        }}
      />
      {newTodo && (
        <p className="mt-3 text-sm text-accent-primary">
          Press Enter or &#9166; to add task
        </p>
      )}
    </div>
  )
}

export default TodoInput
