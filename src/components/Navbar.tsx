"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

// Import komponen dari shadcn/ui
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

// Komponen untuk menampilkan status otentikasi
const AuthNav = ({
  isScrolled,
  isMobile = false,
}: {
  isScrolled: boolean;
  isMobile?: boolean;
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
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image!} alt={user.name!} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profil">Profil</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="cursor-pointer"
          >
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
        <Button asChild className="w-full" variant="outline">
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button asChild className="w-full">
          <Link href="/sign-in">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${navTextColor}`}>
      <Button asChild>
        <Link href="/sign-in">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/sign-in">Sign Up</Link>
      </Button>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTextColor = isScrolled ? "text-slate-900" : "text-white";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className="flex items-center justify-between h-20"
          style={{ fontFamily: "mona-sans" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
              <Image
                src="/favicon.png" // Ganti dengan path logo yang benar
                alt="Tandur Logo"
                width={40}
                height={40}
              />
            </div>
            <span className={`text-2xl font-bold ${navTextColor}`}>Tandur</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#tentang"
              className={`hover:text-green-500 transition-colors ${navTextColor}`}
            >
              Tentang
            </Link>
            <Link
              href="/#produk"
              className={`hover:text-green-500 transition-colors ${navTextColor}`}
            >
              Produk
            </Link>
            <Link
              href="/petani"
              className={`hover:text-green-500 transition-colors ${navTextColor}`}
            >
              Petani
            </Link>
            <Link
              href="/kontak"
              className={`hover:text-green-500 transition-colors ${navTextColor}`}
            >
              Kontak
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex">
            <AuthNav isScrolled={isScrolled} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${navTextColor}`}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link
              href="/#tentang"
              className="block text-slate-700 hover:text-green-600"
            >
              Tentang
            </Link>
            <Link
              href="/#produk"
              className="block text-slate-700 hover:text-green-600"
            >
              Produk
            </Link>
            <Link
              href="/petani"
              className="block text-slate-700 hover:text-green-600"
            >
              Petani
            </Link>
            <div className="border-t pt-4">
              <AuthNav isScrolled={isScrolled} isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
