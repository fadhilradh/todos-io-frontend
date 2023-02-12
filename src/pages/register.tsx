import { api } from "@/utils";
import { persistTokenData } from "@/utils/auth";
import { useTypedSelector } from "@/utils/typedStore";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import Navbar from "../components/Navbar";
import { deleteAllLocalTodos } from "../store/todo";
import { login } from "../store/user";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const dispatch = useDispatch();
  const localTodos = useTypedSelector((state) => state.todo.list);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function onFormSubmit(formData) {
    try {
      setLoading(true);
      const { data } = await api.post(`/register`, formData);
      dispatch(login(data));
      persistTokenData(data.accessToken);
      reset();
      if (localTodos.length > 0) {
        storeLocalTodosToDB(data);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function storeLocalTodosToDB(data) {
    try {
      localTodos.forEach(async (todo) => {
        await api.post("/todos", {
          task: todo.title,
          isDone: todo.completed,
          userId: data?.userId,
        });
      });
      dispatch(deleteAllLocalTodos());
    } catch (error) {}
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="bg-gradient-to-r from-blue-600 to-green-300 bg-clip-text text-2xl font-bold text-transparent">
          Register
        </h1>{" "}
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-10 sm:w-1/2"
        >
          <div className="flex flex-col gap-y-[2px] ">
            <label className="text-sm" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              className="w-56"
              {...register("username")}
              placeholder="Username"
            />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              className="w-56"
              {...register("password")}
              placeholder="Password"
            />
          </div>
          <Button className="mt-5" isLoading={loading}>
            Register
          </Button>
          <p className="text-sm">
            Have an account ?{" "}
            <Link className="underline hover:text-blue-500" href="/login">
              Click here to login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
