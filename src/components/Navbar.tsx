import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul className="sticky top-0 left-0 mb-4 flex w-full items-center justify-between p-4 shadow-md">
        <span className="flex gap-x-6 ">
          <li className="cursor-pointer font-semibold hover:text-blue-700">
            <Link href="/">Todo</Link>
          </li>
          <li className="cursor-pointer font-semibold hover:text-blue-700">
            <Link href="/form">Users</Link>
          </li>
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
