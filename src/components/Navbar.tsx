import { api } from "@/utils";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./atoms/Button";
import { logout } from "../store/user";
import { useTypedSelector } from "@/utils/typedStore";
import { useRouter } from "next/router";

const Navbar = () => {
  const isLoggedIn = useTypedSelector((state) => state.user.isLoggedIn);
  const username = useTypedSelector((state) => state.user.username);
  const userRole = useTypedSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const router = useRouter();

  async function logoutUser() {
    try {
      await api("get", "/logout");
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav>
      <ul className="sticky top-0 left-0 flex w-full items-center justify-between bg-[#FCFCFC] p-4 shadow-md">
        <span className="flex items-center gap-x-6">
          <li className="cursor-pointer font-semibold hover:text-blue-700">
            <Link href="/">
              <h1 className="bg-gradient-to-r from-yellow-400 via-green-300 to-blue-600 bg-clip-text  font-bold text-transparent">
                todo.io
              </h1>
            </Link>
          </li>
          {userRole === "admin" && (
            <li className="cursor-pointer font-semibold hover:text-blue-700">
              <Link href="/users">Users</Link>
            </li>
          )}
        </span>
        <span className="flex gap-x-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-x-4">
              <p className="text-xs">Hello, {username}</p>
              <Button size="sm" className="text-sm" onClick={logoutUser}>
                Logout
              </Button>
            </div>
          ) : (
            !["/login", "/register"].includes(router.asPath) && (
              <Link href="/login">
                <Button size="sm" className="cursor-pointer  text-sm ">
                  Login{" "}
                </Button>
              </Link>
            )
          )}
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
