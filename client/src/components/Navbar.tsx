import { getServerSession } from "next-auth"
import Link from "next/link"
import options from "../../src/app/api/auth/[...nextauth]/options"

export default async function Navbar() {
    const session = await getServerSession(options)

    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/">Home</Link></li>
                {session?.user ? (
                    <>
                        <li><Link href="/api/auth/signout">Sign Out</Link></li>
                        <li><Link href="/addItems">Add</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link href="/api/auth/signin">Sign In</Link></li>
                        <li><Link href="/signup">Sign Up</Link></li>
                    </>
                )}
                <li><Link href={"/rooms"}>Auctions</Link></li>
                <li><Link href="/server">Server</Link></li>
                <li><Link href="/client">Client</Link></li>
            </ul>
        </nav>
    )
}

