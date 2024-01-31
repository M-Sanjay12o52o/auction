import { getServerSession } from "next-auth/next"
import UserCard from "@/components/UserCard"
import options from "./api/auth/[...nextauth]/options"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        <div>
          <div>
            <UserCard user={session?.user} pagetype={"Home"} />
            <h1 className="text-5xl mt-8">Looking for anything in particular.</h1>
          </div>
          <div>
            {/* TODO:  Search Implementation */}
            <div className="mt-12">
              <Input className="border-2 border-black" placeholder="Search what you are looking for..." />
              <br />
              <Button className="w-full">Search</Button>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      )}
    </>
  )
}
