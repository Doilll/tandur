// src/components/CardProduk.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ produk }: any) {
  const { id, namaProduk, harga, unit, fotoUrl, petani } = produk;

  return (
    <div className="group overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg bg-white">
      <Link href={`/produk/${id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={fotoUrl[0]}
            alt={namaProduk}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-800">
            {namaProduk}
          </h3>
          <p className="text-sm text-slate-500">
            oleh {petani.name} - {petani.lokasi}
          </p>
          <p className="mt-2 text-lg font-bold text-green-600">
            Rp{harga.toLocaleString("id-ID")} / {unit}
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
          className="block w-full bg-green-600 text-white text-center py-2 rounded-md font-medium hover:bg-green-700 transition"
        >
          Pesan via WhatsApp
        </a>
      </div>
    </div>
  );
}
