"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import AuthNav from "@/components/AuthNav";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

// Komponen untuk menampilkan status otentikasi

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navTextColor = pathname === "/" && !isScrolled ? "text-white" : "text-slate-900";

  return (
    <SessionProvider>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
         isHomePage && !isScrolled
      ? "bg-transparent"
      : "bg-white/80 shadow-md backdrop-blur-sm"
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
              <span className={`text-2xl font-bold ${navTextColor}`}>
                Tandur
              </span>
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
              <AuthNav isScrolled={isScrolled} isHomePage={isHomePage} />
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
    </SessionProvider>
  );
};

export default Navbar;
