import { apiCall } from "@/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import Navbar from "../components/Navbar";
import { login } from "../store/user";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();

  async function onFormSubmit(data) {
    try {
      const userData = await apiCall.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/login`,
        data,
      );
      reset();
      dispatch(login(userData?.data));
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="text-2xl ">Login</h1>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-10 sm:w-1/2"
        >
          <div className="flex flex-col gap-y-1">
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
          <div className="flex flex-col gap-y-1">
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
          <Button className="mt-5">Login</Button>
          <p className="text-sm">
            or{" "}
            <Link className="underline hover:text-blue-500" href="/register">
              create new account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
