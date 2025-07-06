"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Users,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

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

const ProductCard = ({ product }: { product: any }) => (
  <div className="group overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
    <Link href={`/produk/${product.id}`} className="block">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
        <p className="text-sm text-slate-500">
          oleh {product.petani.name} - {product.petani.lokasi}
        </p>
        <p className="mt-2 text-lg font-bold text-green-600">
          Rp{product.price.toLocaleString("id-ID")} / {product.unit}
        </p>
      </div>
    </Link>
    <div className="px-4 pb-4">
      <Button asChild className="w-full">
        <Link href={`/produk/${product.id}`}>Lihat Detail</Link>
      </Button>
    </div>
  </div>
);
const FarmerCard = ({ farmer }: { farmer: any }) => (
  <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
    <div className="relative mx-auto mb-4 h-24 w-24">
      <Image
        src={farmer.imageUrl}
        alt={farmer.name}
        fill
        style={{ objectFit: "cover" }}
        className="rounded-full"
      />
    </div>
    <h3 className="text-xl font-bold text-slate-900">{farmer.name}</h3>
    <p className="text-md text-slate-600">{farmer.lokasi}</p>
    <p className="mt-2 text-sm text-slate-500 italic">"{farmer.bio}"</p>
  </div>
);

const Footer = () => (
  <footer
    className="bg-slate-900 text-white"
    style={{ fontFamily: "mona-sans" }}
  >
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Tandur</span>
          </div>
          <p className="text-slate-400 max-w-md">
            Menghubungkan petani lokal dengan konsumen untuk menciptakan
            ekosistem pertanian yang lebih adil dan berkelanjutan.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Menu</h3>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link
                href="#tentang"
                className="hover:text-white transition-colors"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                href="#produk"
                className="hover:text-white transition-colors"
              >
                Produk
              </Link>
            </li>
            <li>
              <Link
                href="/petani"
                className="hover:text-white transition-colors"
              >
                Petani
              </Link>
            </li>
            <li>
              <Link
                href="/kontak"
                className="hover:text-white transition-colors"
              >
                Kontak
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontak</h3>
          <ul className="space-y-2 text-slate-400">
            <li>Email: info@tandur.id</li>
            <li>Telepon: (021) 123-4567</li>
            <li>Alamat: Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
        <p>&copy; 2024 Tandur. Semua hak dilindungi.</p>
      </div>
    </div>
  </footer>
);

export default function HomePage() {
  const dummyProduk = [
    {
      id: "1",
      name: "Cabai Rawit Merah",
      price: 55000,
      unit: "kg",
      imageUrl: "/images/cabai.jpg",
      petani: { name: "Pak Budi", lokasi: "Lembang" },
    },
    {
      id: "2",
      name: "Tomat Ceri Organik",
      price: 25000,
      unit: "kg",
      imageUrl: "/images/tomat.jpg",
      petani: { name: "Ibu Siti", lokasi: "Pangalengan" },
    },
    {
      id: "3",
      name: "Bayam Hidroponik",
      price: 15000,
      unit: "ikat",
      imageUrl: "/images/bayam.jpg",
      petani: { name: "Mas Agung", lokasi: "Ciwidey" },
    },
    {
      id: "4",
      name: "Kentang Dieng",
      price: 18000,
      unit: "kg",
      imageUrl: "/images/kentang.jpg",
      petani: { name: "Kang Ujang", lokasi: "Dieng" },
    },
  ];

  const dummyPetani = [
    {
      id: "1",
      name: "Pak Budi Santoso",
      lokasi: "Lembang, Jawa Barat",
      imageUrl: "/images/petani1.jpg",
      bio: "Menanam dengan hati, untuk hasil tani yang menyehatkan.",
    },
    {
      id: "2",
      name: "Ibu Siti Aminah",
      lokasi: "Pangalengan, Jawa Barat",
      imageUrl: "/images/petani2.jpg",
      bio: "Kualitas adalah janji dari lahan kami kepada Anda.",
    },
  ];

  return (
    <div className="bg-white">
      <Navbar />

      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-background.jpg"
              alt="Lahan pertanian yang subur"
              fill
              style={{ objectFit: "cover" }}
              className="scale-110"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-black/50 z-10"></div>

          <div className="relative z-20 text-center text-white px-4 max-w-5xl">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Dari Lahan, Langsung ke Tangan Anda.
            </h1>
            <p
              className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-200 leading-relaxed"
              style={{ fontFamily: "mona-sans" }}
            >
              Dukung petani lokal mendapatkan harga yang adil. Nikmati hasil
              tani segar berkualitas dengan cerita yang transparan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                asChild
              >
                <Link href="#produk">
                  Jelajahi Hasil Tani <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="#tentang">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="tentang"
          className="py-20 bg-slate-50"
          style={{ fontFamily: "mona-sans" }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Mewujudkan Kesejahteraan Petani
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
              Kami memotong rantai pasok yang tidak adil, menghubungkan Anda
              langsung dengan pahlawan pangan Indonesia.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Harga Adil</h3>
                <p className="mt-2 text-slate-500">
                  Petani menentukan harganya sendiri. Keuntungan maksimal
                  kembali ke mereka, bukan tengkulak.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Leaf className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">
                  Kualitas Terjamin
                </h3>
                <p className="mt-2 text-slate-500">
                  Dapatkan produk paling segar langsung dari sumbernya, dipanen
                  sesaat sebelum dikirim.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">
                  Transparansi Penuh
                </h3>
                <p className="mt-2 text-slate-500">
                  Ikuti perjalanan tanam lewat update rutin dari petani. Anda
                  tahu persis apa yang Anda konsumsi.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="produk"
          className="py-20 bg-white"
          style={{ fontFamily: "mona-sans" }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 sm:text-4xl">
              Panen Terbaru dari Petani Hebat
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-slate-600">
              Pesan sekarang atau pre-order untuk panen berikutnya. Kesegaran
              terjamin!
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {dummyProduk.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/semua-produk">Lihat Semua Produk</Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          className="py-20 bg-slate-50"
          style={{ fontFamily: "mona-sans" }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 sm:text-4xl">
              Kenali Pahlawan Pangan Kita
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {dummyPetani.map((farmer) => (
                <FarmerCard key={farmer.id} farmer={farmer} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
