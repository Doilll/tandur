import Link from "next/link"

export default function Navbar() {

    return(
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
                <img src="/favicon.png" alt="Logo" className="h-10 w-auto rounded-md" />
                <span className="font-bold text-xl text-gray-800">Tandur</span>
            </Link>
            <nav>
                <ul className="flex space-x-8 text-gray-700 font-medium">
                <li className="hover:text-green-600 cursor-pointer transition">Home</li>
                <li className="hover:text-green-600 cursor-pointer transition">About</li>
                <li className="hover:text-green-600 cursor-pointer transition">Contact</li>
                </ul>
            </nav>
            </div>
        </header>
    )
}