import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

  return (
    <>
      <Navbar />
      <div>
        {usersData?.map((user) => (
          <p className="text-xl" key={user?.id}>
            {user?.username}
          </p>
        ))}
      </div>
    </>
  );
};

export default UsersPage;
