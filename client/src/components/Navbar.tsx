import { getServerSession } from "next-auth";
import Link from "next/link";
import options from "../../src/app/api/auth/[...nextauth]/options";
import Logo from "./Logo";

export default async function Navbar() {
    const session = await getServerSession(options);

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link href="/">
                            <div className="flex items-center space-x-2 ml-12 text-lg font-semibold">
                                <Logo />
                            </div>
                        </Link>
                    </div>
                    <ul className="flex items-center space-x-6 mr-8">
                        <li>
                            <p className="text-lg cursor-pointer hover:text-gray-300">
                                <Link href="/rooms">Auctions</Link>
                            </p>
                        </li>
                        {session?.user ? (
                            <>
                                <li>
                                    <p className="text-lg cursor-pointer hover:text-gray-300">
                                        <Link href="/addItems">Add Items</Link>
                                    </p>
                                </li>
                                <li>
                                    <p className="text-lg cursor-pointer hover:text-gray-300">
                                        <Link href="/api/auth/signout">Sign Out</Link>
                                    </p>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <p className="text-lg cursor-pointer hover:text-gray-300">
                                        <Link href="/api/auth/signin">Sign In</Link>
                                    </p>
                                </li>
                                <li>
                                    <p className="text-lg cursor-pointer hover:text-gray-300">
                                        <Link href="/signup">Sign Up</Link>
                                    </p>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
