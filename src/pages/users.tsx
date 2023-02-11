import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";
import { apiCall } from "@/utils";

const UsersPage = () => {
  const [usersData, setUsers] = React.useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const users = await apiCall.get(`/user`);
        setUsers(users.data.users);
      } catch (error) {
        console.log(error);
      }
    }

    void getUsers();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  async function onFormSubmit(data) {
    try {
      await apiCall.post(`/user`, data);
      const response = await apiCall.get(`/user`);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col items-center">
        <h1 className="mb-6 mt-3 text-2xl">Users List</h1>
        {usersData?.map((user) => (
          <p className="text-lg" key={user?.id}>
            {user?.username}
          </p>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col items-center justify-center gap-4 py-20"
      >
        <h1 className="mb-10 text-2xl">Add New User</h1>
        <div className="grid grid-cols-2 gap-x-4">
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            className="w-56"
            {...register("username")}
            placeholder="Username"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            className="w-56"
            {...register("password")}
            placeholder="Password"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <label htmlFor="role">Role</label>
          <Input
            id="role"
            className="w-56"
            {...register("role")}
            placeholder="admin | user"
            type="text"
          />
        </div>

        <Button className="mt-10">Submit</Button>
      </form>
    </>
  );
};

export default UsersPage;
