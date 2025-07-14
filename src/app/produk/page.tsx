
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";


export default async function ProdukPage() {

  const produks = await prisma.produk.findMany({
      take: 8,
      orderBy: { createdAt: "desc"},
      select: {
        id: true,
        namaProduk: true,
        harga: true,
        unit: true,
        fotoUrl: true,
        proyekTani: {
          select: {
            petani: {
              select: {
                name: true,
                lokasi: true,
                linkWhatsapp: true,
              }
            }
          }
        }
      }
    })
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
        {produks.map((produk: any) => (
          <ProductCard key={produk.id} produk={produk} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
