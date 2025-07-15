import { useSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { User, LayoutDashboard, LogOut } from "lucide-react";

// Komponen untuk menampilkan status otentikasi
const AuthNav = ({
  isScrolled,
  isMobile = false,
  isHomePage = false,
}: {
  isScrolled: boolean;
  isMobile?: boolean;
  isHomePage?: boolean;
}) => {
  const { data: session, status } = useSession();
  const navTextColor = isScrolled ? "text-slate-900" : "text-white";
  // --- Tampilan Loading ---
  if (status === "loading") {
    return (
      <div className="h-10 w-24 rounded-md bg-slate-200 animate-pulse"></div>
    );
  }

  // --- Tampilan Jika User Sudah Login ---
  if (status === "authenticated") {
    const user = session.user;
    const userInitial = user?.name?.charAt(0).toUpperCase() || "T";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative h-10 w-10 rounded-full cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image!} alt={user.name!} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-64 bg-white text-black border border-gray-200 shadow-xl rounded-xl p-2"
          align="center"
          forceMount
        >
          <DropdownMenuLabel className="pb-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase() ?? "T"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800">
                  {user.name}
                </span>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            asChild
            className="text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md px-3 py-2"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4 inline" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md px-3 py-2"
          >
            <Link href={`/petani/${user.username}`}>
              <User className="mr-2 h-4 w-4 inline" />
              Profil
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="cursor-pointer mt-1 text-center text-white font-semibold bg-green-600 hover:bg-green-700 transition-colors py-2 rounded-md"
          >
            <LogOut className="mr-2 h-4 w-4 inline" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // --- Tampilan Jika Belum Login (Default) ---
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2">
        <Button asChild className="w-full">
          <Link
            href="/sign-in"
            className="px-4 py-2 rounded-4xl font-medium transition-colorsbg-transparent text-black border-2 hover:border-green-600"
          >
            Login
          </Link>
        </Button>
        <Button asChild className="w-full">
          <Link
            href="/sign-in"
            className="px-4 py-2 rounded-full font-medium transition-colors bg-black text-white hover:bg-green-600"
          >
            Sign Up
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${navTextColor}`}>
      <Button asChild>
        <Link
          href="/sign-in"
          className={`px-4 py-2 rounded-4xl font-medium transition-colors ${
            !isHomePage || isScrolled
              ? "bg-transparent text-black border-2 hover:border-green-600"
              : "bg-transparent bg-opacity-20 text-white hover:bg-opacity-40 border-2 border-green-600 hover:border-green-700"
          }`}
        >
          Login
        </Link>
      </Button>
      <Button asChild>
        <Link
          href="/sign-in"
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            !isHomePage || isScrolled
              ? "bg-black text-white hover:bg-green-600"
              : "bg-green-600 bg-opacity-20 hover:bg-opacity-40 hover:bg-green-800 text-white"
          }`}
        >
          Sign Up
        </Link>
      </Button>
    </div>
  );
};

export default AuthNav;
