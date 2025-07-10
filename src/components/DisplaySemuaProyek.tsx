// src/components/DisplayProyek.tsx

"use client";

import React, { useState } from "react";
import DisplayProyek from "./DisplayProyek";
import { ProyekTani, FaseProyek } from "@prisma/client";
import Link from "next/link";

// Tipe untuk ProyekTani yang sudah include relasi fase (dengan gambar)
type ProyekWithFaseGambar = ProyekTani & {
  fase: { gambar: string[] }[];
};

// Tipe untuk ProyekTani lengkap dengan semua data fase
type ProyekWithFaseLengkap = ProyekTani & {
  fase: FaseProyek[];
};

// Props untuk komponen utama
interface DisplayProyekProps {
  proyek: ProyekWithFaseGambar[]; // Menerima proyek dengan fase gambar
}

// Sub-komponen untuk satu kartu pratinjau
const KartuProyekPratinjau = ({ proyek }: { proyek: ProyekWithFaseGambar }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detailProyekData, setDetailProyekData] =
    useState<ProyekWithFaseLengkap | null>(null);

  // Logika untuk mendapatkan gambar pratinjau
  const getPreviewImages = () => {
    const defaultImages = [
      "/proyek/1.jpg",
      "/proyek/2.jpg",
      "/proyek/3.jpg",
      "/proyek/4.jpg",
      "/proyek/5.jpg",
    ];

    // Cek jika proyek punya fase dan fase pertama punya gambar
    if (
      proyek.fase &&
      proyek.fase.length > 0 &&
      proyek.fase[0].gambar.length > 0
    ) {
      const gambarAsli = proyek.fase[0].gambar;
      // Gabungkan gambar asli dengan gambar default untuk memastikan selalu ada 5 gambar
      return [...gambarAsli, ...defaultImages].slice(0, 5);
    }

    // Jika tidak ada gambar sama sekali, pakai default
    return defaultImages;
  };

  const previewImages = getPreviewImages();

  const handleOpenDetail = async () => {
    // Saat diklik, fetch data lengkap (termasuk fase) untuk proyek ini
    try {
      const res = await fetch(`/api/proyek/${proyek.id}`);
      if (!res.ok) throw new Error("Gagal mengambil detail proyek");
      const data: ProyekWithFaseLengkap = await res.json();
      setDetailProyekData(data);
      setShowDetail(true);
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Error fetching project details:", error);
      alert("Tidak dapat memuat detail proyek.");
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setDetailProyekData(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="border rounded-xl p-4 flex flex-col justify-between bg-white shadow-sm hover:shadow-lg transition-shadow">
        <div>
          {/* Layout Grid Gambar Pratinjau - Sesuai dengan desain yang diminta */}
          <div
            onClick={handleOpenDetail}
            className="min-w-full h-[50vh] rounded-xl bg-white grid grid-cols-3 gap-1 cursor-pointer group relative overflow-hidden mb-4"
          >
            {/* Kolom 1 */}
            <div className="w-full h-full">
              <img
                src={previewImages[0]}
                alt="Proyek 1"
                className="w-full h-full object-cover rounded-l-xl"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/1.jpg";
                }}
              />
            </div>

            {/* Kolom 2 */}
            <div className="flex flex-col gap-1">
              <img
                src={previewImages[1]}
                alt="Proyek 2"
                className="w-full h-1/2 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/2.jpg";
                }}
              />
              <img
                src={previewImages[2]}
                alt="Proyek 3"
                className="w-full h-1/2 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/3.jpg";
                }}
              />
            </div>

            {/* Kolom 3 */}
            <div className="flex flex-col gap-1">
              <img
                src={previewImages[3]}
                alt="Proyek 4"
                className="w-full h-1/2 object-cover rounded-tr-xl"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/4.jpg";
                }}
              />
              <img
                src={previewImages[4]}
                alt="Proyek 5"
                className="w-full h-1/2 object-cover rounded-br-xl"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/5.jpg";
                }}
              />
            </div>

            {/* Overlay dan Tombol "Lihat Semua Foto" */}
            <div className="absolute bottom-4 right-4">
              <span className="bg-black bg-opacity-75 text-white font-bold p-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Lihat Semua Foto
              </span>
            </div>
          </div>

          {/* Info Teks Proyek */}
          <h3 className="font-bold text-lg text-slate-900">
            {proyek.namaProyek}
          </h3>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
            {proyek.deskripsi}
          </p>
        </div>

        <div className="mt-4">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              proyek.status === "PANEN"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {proyek.status}
          </span>
          <Link
            href={`/dashboard/proyek/${proyek.id}/edit`}
            className="block w-full text-center mt-3 bg-slate-800 text-white py-2 rounded-md hover:bg-slate-900 transition"
          >
            Kelola Proyek
          </Link>
        </div>
      </div>

      {/* Tampilkan Halaman Detail jika `showDetail` dan data sudah ada */}
      {showDetail && detailProyekData && (
        <DisplayProyek
          proyek={detailProyekData}
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
};

// Komponen Utama: DisplayProyek
export default function DisplaySemuaProyek({ proyek }: DisplayProyekProps) {
  if (proyek.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-500">Anda belum memiliki proyek.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {proyek.map((item) => (
        <KartuProyekPratinjau key={item.id} proyek={item} />
      ))}
    </div>
  );
}
