// src/components/CardProduk.tsx

import Image from "next/image";
import Link from "next/link";
import {
  Package,
  User2,
  MapPin,
  Tag,
  MessageCircle,
} from "lucide-react";

export default function ProductCard({ produk }: any) {
  const { id, namaProduk, harga, unit, fotoUrl, proyekTani } = produk;
  const petani = proyekTani?.petani

  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-lg bg-white">
      <Link href={`/produk/${id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={fotoUrl[0]}
            alt={namaProduk}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" />
            {namaProduk}
          </h3>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <User2 className="w-4 h-4 text-slate-400" />
            oleh {petani.name}
            <MapPin className="w-4 h-4 text-slate-400 ml-2" />
            {petani.lokasi}
          </p>
          <p className="mt-3 text-lg font-bold text-green-600 flex items-center gap-1">
            <Tag className="w-5 h-5" />
            Rp{harga.toLocaleString("id-ID")}{" "}
            <span className="text-base font-normal text-slate-500">
              / {unit}
            </span>
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <a
          href={`https://wa.me/${petani.linkWhatsapp}?text=${encodeURIComponent(
            `Halo ${petani.name}, saya tertarik dengan produk *${namaProduk}*.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-green-600 text-white text-center py-2 rounded-md font-medium hover:bg-green-700 transition"
        >
          <MessageCircle className="w-5 h-5" />
          Pesan via WhatsApp
        </a>
      </div>
    </div>
  );
}
