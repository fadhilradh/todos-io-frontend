import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";

const UsersPage = () => {
  const [usersData, setUsers] = React.useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const users = await axios.get(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/user`
        );
        setUsers(users.data.users);
      } catch (error) {
        console.log(error);
      }
    }

    void getUsers();
  }, []);

  const options = ["", "Semarang", "Jakarta", "Bandung", "Medan"];

  const methods = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = methods;

  function onFormSubmit(data) {
    console.log(data);
    console.log(isValid);
  }

  return (
    <>
      <Navbar />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col items-center justify-center gap-4 pt-20"
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
              {...register("username")}
              placeholder="Password"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <label htmlFor="role">Role</label>
            <Input
              id="role"
              className="w-56"
              {...register("username")}
              placeholder="admin | user"
            />
          </div>

          <Button className="mt-10">Submit</Button>
        </form>
      </FormProvider>
      {/* <div>
        {usersData?.map((user) => (
          <p className="text-xl" key={user?.id}>
            {user?.username}
          </p>
        ))}
      </div> */}
    </>
  );
};

export default UsersPage;
