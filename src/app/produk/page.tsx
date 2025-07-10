"use client";

import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const produkDummy = [
  {
    id: "1",
    namaProduk: "Tomat Organik",
    harga: 15000,
    unit: "kg",
    fotoUrl: ["/dummy/tomat.jpg"],
    petani: {
      name: "Pak Slamet",
      lokasi: "Wonosobo",
      linkWhatsapp: "081234567890",
    },
  },
  {
    id: "2",
    namaProduk: "Cabai Rawit Merah",
    harga: 28000,
    unit: "kg",
    fotoUrl: ["/dummy/cabai.jpg"],
    petani: {
      name: "Bu Sri",
      lokasi: "Banyuwangi",
      linkWhatsapp: "6289876543210",
    },
  },
];

export default function ProdukPage() {
  return (
    <>
    <Navbar />
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-8 pt-28">
      <h1 className="text-4xl font-extrabold text-slate-800 mb-7 text-center tracking-tight">
        Produk Petani
      </h1>
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full pl-12 pr-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 transition bg-white shadow-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {produkDummy.map((produk) => (
          <ProductCard key={produk.id} produk={produk} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
