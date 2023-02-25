import { api } from "@/utils"
import { persistTokenData } from "@/utils/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Button } from "../components/atoms/Button"
import { Input } from "../components/atoms/Input"
import Navbar from "../components/Navbar"
import { login } from "../store/user"

const RegisterPage = () => {
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isValid },
    } = useForm(),
    dispatch = useDispatch(),
    router = useRouter(),
    [isLoading, setIsLoading] = useState(false),
    [error, setError] = useState({ message: "" })

  async function onFormSubmit(data) {
    try {
      setError({ message: "" })
      setIsLoading(true)
      const userData = await api("post", "/login", {
        data,
      })
      reset()
      dispatch(login(userData))
      persistTokenData(userData.accessToken)
      router.replace("/")
    } catch (error) {
      console.log(error)
      setError({ message: error.response.data.message })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="bg-gradient-to-r from-blue-600 to-green-300 bg-clip-text text-4xl font-bold text-transparent">
          Login
        </h1>
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
          <p className="text-red-500">{error && error.message}</p>
          <Button isLoading={isLoading} className="mt-5">
            Login
          </Button>
          <p className="text-sm">
            Don't have an account ?{" "}
            <Link className="underline hover:text-blue-500" href="/register">
              Click here to register
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default RegisterPage
