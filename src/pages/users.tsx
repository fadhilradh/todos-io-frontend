import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Input } from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";
import { api } from "@/utils";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/atoms/Select";
import Table from "../components/Table";

const UsersPage = () => {
  const [usersData, setUsers] = React.useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const { users } = await api("get", "/user");
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, []);

  const { register, handleSubmit, control } = useForm();

  const columns = React.useMemo(
    () => [
      {
        Header: "Task",
        accessor: "col1",
      },
      {
        Header: "Username",
        accessor: "col2",
      },
      {
        Header: "Completed",
        accessor: "col3",
      },
    ],
    [],
  );

  const data = React.useMemo(
    () =>
      usersData.map((user) => ({
        col1: user.task,
        col2: user.username,
        col3: `${user.is_done}`,
      })),
    [JSON.stringify(usersData)],
  );

  async function onFormSubmit(data) {
    try {
      await api("post", `/user`, { data });
      const response = await api("get", `/user`);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col items-center">
        <h1 className="mb-6 mt-3 text-2xl">Users & Task List</h1>
        <Table columns={columns} data={data} />
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
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value, ref } }) => {
              return (
                <Select onValueChange={onChange}>
                  <SelectTrigger className="w-[180px]" value={value} ref={ref}>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent {...register("role")}>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div>

        <Button className="mt-10">Submit</Button>
      </form>
    </>
  );
};

export default UsersPage;
