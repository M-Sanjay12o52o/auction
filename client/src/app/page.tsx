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
            {/* TODO:  Search Implementation */}
            <div className="mt-24">
              <Input placeholder="Search what you are looking for..." />
              <br />
              <Button>Search</Button>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      )}
    </>
  )
}
