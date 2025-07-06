import Link from "next/link";
import {
    Leaf,
    Search,
    Menu,
    X,
} from "lucide-react";
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
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
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

          <div
            className="hidden md:flex items-center space-x-8"
            style={{ fontFamily: "mona-sans" }}
          >
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

          <div
            className="flex items-center space-x-4"
            style={{ fontFamily: "mona-sans" }}
          >
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isScrolled ? "text-slate-400" : "text-white"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  className={`pl-10 pr-4 py-2 rounded-full border transition-all ${
                    isScrolled
                      ? "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                      : "bg-white/10 border-white/20 text-white placeholder-white/70 backdrop-blur-sm"
                  }`}
                />
              </div>
            </div>

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
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navbar;