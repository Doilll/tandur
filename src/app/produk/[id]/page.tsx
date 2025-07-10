"use client";

import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

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
      linkWhatsapp: "6281234567890",
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
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Produk Petani</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produkDummy.map((produk) => (
          <ProductCard key={produk.id} produk={produk} />
        ))}
      </div>
    </div>
    </>
  );
}
