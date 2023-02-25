import { Button } from "@/src/components/atoms/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/atoms/Dialog"
import { Input } from "@/src/components/atoms/Input"
import Navbar from "@/src/components/Navbar"
import { changeProfilePic } from "@/src/store/user"
import { api } from "@/utils"
import { useTypedDispatch, useTypedSelector } from "@/utils/typedStore"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import EmptyProfilePic from "@/public/images/empty-profile-pic.png"
import { useToast } from "@/src/hooks/useToast"
import Link from "next/link"

const Profile = () => {
  const { register, setValue, handleSubmit } = useForm()
  const {
    query: { id },
  } = useRouter()
  const [newProfilePic, setnewProfilePic] = React.useState<File>(null),
    dispatch = useTypedDispatch(),
    userProfilePic = useTypedSelector((state) => state.user.profilePic),
    [open, setOpen] = React.useState(false),
    [isLoading, setIsLoading] = React.useState<boolean>(false),
    { toast } = useToast()

  async function getUserData() {
    try {
      const { userDetail } = await api("get", `/user/${id}`)
      setValue("username", userDetail?.username)
    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
    if (id) {
      getUserData()
    }
  }, [id])

  async function uploadProfilePicture() {
    try {
      setIsLoading(true)
      const { uploadURL } = await api("get", "/s3url")
      await fetch(uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: newProfilePic,
      })
      const imageUrl = uploadURL.split("?")[0]
      await api("put", `/user/profile-pic/${id}`, {
        data: {
          profilePicUrl: imageUrl,
        },
      })
      dispatch(changeProfilePic(imageUrl))
      setOpen(false)
      setnewProfilePic(null)
      toast({
        title: "Profile picture updated!",
        description: "Your profile picture has been successfully updated",
        duration: 3000,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function updateUserDetail(data) {
    try {
      setIsLoading(true)
      await api("put", `/user/${id}`, {
        data,
      })
      await getUserData()
      toast({
        title: "Username updated!",
        description: "Your username has been successfully updated",
        duration: 3000,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex h-screen w-full flex-col items-center gap-y-3 !py-12">
        <Image
          alt="profile pic"
          src={userProfilePic || EmptyProfilePic}
          width={200}
          height={200}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button type="button">
              {userProfilePic ? "Change" : "Upload"} Profile Picture
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {userProfilePic ? "Change" : "Upload"} Profile Picture
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setnewProfilePic(e.target.files[0])}
              />
            </DialogDescription>
            <Button
              type="button"
              className="mt-2"
              onClick={uploadProfilePicture}
              isLoading={isLoading}
              disabled={!newProfilePic}
            >
              {userProfilePic ? "Change" : "Upload"}
            </Button>
          </DialogContent>
        </Dialog>
        <form
          className="mt-12 flex flex-col items-center gap-y-8 rounded-md p-8 shadow-lg"
          onSubmit={handleSubmit(updateUserDetail)}
        >
          <h1 className=" bg-gradient-to-r from-green-300 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
            Profile Detail
          </h1>
          <div className="mt-2 mb-10">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <Input
              id="username"
              type="text"
              autoComplete="off"
              className="w-64"
              {...register("username")}
              placeholder="Username"
            />
          </div>

          <Button isLoading={isLoading}>Update Profile</Button>
        </form>
        <Link href="/">
          <Button variant="ghost" className="my-10" disabled={isLoading}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Profile
