"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className="flex items-center justify-between h-16"
          style={{ fontFamily: "mona-sans" }}
        >
          {/* Logo */}
          <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center bg-green-600 rounded-full">
            <img src="/favicon.png" alt="Tandur Logo" className="w-full h-full rounded-full" />
          </div>
          <span
            className={`text-xl font-bold ${
          isScrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Tandur
          </span>
        </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" style={{ fontFamily: "mona-sans" }}>
        <Link
          href="#tentang"
          className={`hover:text-green-600 transition-colors ${
            isScrolled ? "text-slate-700" : "text-white"
          }`}
        >
          Tentang
        </Link>
        <Link
          href="#produk"
          className={`hover:text-green-600 transition-colors ${
            isScrolled ? "text-slate-700" : "text-white"
          }`}
        >
          Produk
        </Link>
        <Link
          href="/petani"
          className={`hover:text-green-600 transition-colors ${
            isScrolled ? "text-slate-700" : "text-white"
          }`}
        >
          Petani
        </Link>
        <Link
          href="/kontak"
          className={`hover:text-green-600 transition-colors ${
            isScrolled ? "text-slate-700" : "text-white"
          }`}
        >
          Kontak
        </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3" style={{ fontFamily: "mona-sans" }}>
        <Link
          href="/sign-in"
          className={`px-4 py-2 rounded-4xl font-medium transition-colors ${
            isScrolled
          ? "bg-white text-green-600 border-2 border-green-600 hover:border-black hover:text-black"
          : "bg-transparent bg-opacity-20 text-white hover:bg-opacity-40 border-2 border-green-600 hover:border-green-700"
          }`}
        >
          Login
        </Link>
        <Link
          href="/sign-in"
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            isScrolled
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-white bg-opacity-20 text-green-600 hover:bg-opacity-40 hover:bg-green-500 hover:text-black"
          }`}
        >
          Sign Up
        </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden ${
          isScrolled ? "text-slate-900" : "text-white"
        }`}
          >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="#tentang"
              className="block px-3 py-2 text-slate-700 hover:text-green-600"
            >
              Tentang
            </Link>
            <Link
              href="#produk"
              className="block px-3 py-2 text-slate-700 hover:text-green-600"
            >
              Produk
            </Link>
            <Link
              href="/petani"
              className="block px-3 py-2 text-slate-700 hover:text-green-600"
            >
              Petani
            </Link>
            <Link
              href="/kontak"
              className="block px-3 py-2 text-slate-700 hover:text-green-600"
            >
              Kontak
            </Link>
            <div className="px-0.5 py-2">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/sign-in"
                  className="block w-full px-4 py-2 rounded-4xl font-medium text-green-600 border-2 border-green-600 bg-white hover:border-black hover:text-black transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  href="/sign-in"
                  className="block w-full px-4 py-2 rounded-full font-medium bg-green-600 text-white hover:bg-green-700 transition-colors text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
