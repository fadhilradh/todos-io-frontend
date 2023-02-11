import Link from "next/link";
import { useSelector } from "react-redux";
import { Button } from "./atoms/Button";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const username = useSelector((state) => state.user.username);
  return (
    <nav>
      <ul className="sticky top-0 left-0 mb-4 flex w-full items-center justify-between p-4 shadow-md">
        <span className="flex gap-x-6 ">
          <li className="cursor-pointer font-semibold hover:text-blue-700">
            <Link href="/">Todo</Link>
          </li>
          <li className="cursor-pointer font-semibold hover:text-blue-700">
            <Link href="/users">Users</Link>
          </li>
          <li className="cursor-pointer font-semibold hover:text-blue-700">
            <Link href="/socket">Socket</Link>
          </li>
        </span>
        <span className="flex gap-x-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-x-8">
              <p>Hello, {username}</p>
              <Button className="cursor-pointer  hover:text-blue-700">
                Logout
              </Button>
            </div>
          ) : (
            <>
              <li className="cursor-pointer font-semibold hover:text-blue-700">
                <Link href="/login">Login</Link>
              </li>
              <li className="cursor-pointer font-semibold hover:text-blue-700">
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
