import { api } from "@/utils"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "./atoms/Button"
import { logout } from "../store/user"
import { useTypedSelector } from "@/utils/typedStore"
import { useRouter } from "next/router"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./atoms/Dropdown"
import { Avatar, AvatarFallback, AvatarImage } from "./atoms/Avatar"
import { getTokenData, removeTokenData } from "@/utils/auth"
import React from "react"
import { useToast } from "../hooks/useToast"

const Navbar = () => {
  const userRole = useTypedSelector((state) => state.user.role),
    userId = useTypedSelector((state) => state.user.userId),
    userName = useTypedSelector((state) => state.user.username),
    userToken = getTokenData(),
    dispatch = useDispatch(),
    router = useRouter(),
    currentURL = new URL(window.location.href),
    isExpired = currentURL.searchParams.get("expired"),
    { toast } = useToast(),
    userProfilePic = useTypedSelector((state) => state.user.profilePic)

  async function logoutUser() {
    try {
      await api("get", "/logout")
      dispatch(logout())
      removeTokenData()
      router.replace("/")
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (isExpired) {
      toast({
        title: "Your session has expired",
        description: "Please login again",
        variant: "destructive",
      })
    }
  }, [])

  return (
    <nav>
      <ul className="sticky top-0 left-0 flex w-full items-center justify-between bg-[#FCFCFC] p-4 shadow-md">
        <span className="flex items-center gap-x-6">
          <li className="cursor-pointer font-semibold hover:text-blue-700">
            <Link href="/">
              <h1 className="bg-gradient-to-r from-green-300  to-blue-600 bg-clip-text  font-bold text-transparent">
                todos.io
              </h1>
            </Link>
          </li>
          {userRole === "admin" && (
            <li className="cursor-pointer text-sm font-semibold text-accent-primary hover:text-blue-700">
              <Link href="/users">Users</Link>
            </li>
          )}
        </span>

        <span className="flex gap-x-6">
          {userToken ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={userProfilePic} />
                  <AvatarFallback>
                    {userName?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={20}>
                <DropdownMenuItem className="!hover:bg-transparent cursor-default">
                  Hello, {userName} !
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/profile/${userId}`}>Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400" onClick={logoutUser}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            !["/login", "/register"].includes(router.asPath) && (
              <Link href="/login">
                <Button className="cursor-pointer  text-sm ">Login </Button>
              </Link>
            )
          )}
        </span>
      </ul>
    </nav>
  )
}

export default Navbar
