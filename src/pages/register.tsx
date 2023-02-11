import { apiCall } from "@/utils";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  async function onFormSubmit(data) {
    try {
      const response = await apiCall.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/register`,
        data,
      );
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="text-2xl">Register</h1>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-10 sm:w-1/2"
        >
          <div className="flex flex-col ">
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
          <div className="flex flex-col">
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
          <Button className="mt-5">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
