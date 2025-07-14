// src/components/DisplaySemuaProyek.tsx

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

  // Logika untuk mendapatkan 5 gambar thumbnail
  const getThumbnailImages = () => {
    const defaultImages = [
      "/proyek/1.jpg",
      "/proyek/2.jpg",
      "/proyek/3.jpg",
      "/proyek/4.jpg",
      "/proyek/5.jpg",
    ];

    // Coba ambil gambar dari fase proyek
    const allImages: string[] = [];

    if (proyek.fase && proyek.fase.length > 0) {
      proyek.fase.forEach((fase) => {
        if (fase.gambar && fase.gambar.length > 0) {
          allImages.push(...fase.gambar);
        }
      });
    }

    // Jika ada gambar dari proyek, ambil maksimal 5
    if (allImages.length > 0) {
      const selectedImages = allImages.slice(0, 5);
      // Jika kurang dari 5, tambahkan default images
      while (selectedImages.length < 5) {
        selectedImages.push(
          defaultImages[selectedImages.length % defaultImages.length]
        );
      }
      return selectedImages;
    }

    // Jika tidak ada gambar sama sekali, pakai default
    return defaultImages;
  };

  const thumbnailImages = getThumbnailImages();

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
      <div className="w-full p-2 max-w-10xl mx-auto bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden">
        <div
          className="relative h-80 cursor-pointer group"
          onClick={handleOpenDetail}
        >
          {/* Grid Layout untuk 5 gambar: 1-2-2 */}
          <div className="grid grid-cols-3 grid-rows-2 gap-1 h-full">
            {/* Gambar 1 - Span 2 rows (kiri besar) */}
            <div className="row-span-2 relative rounded-l-lg overflow-hidden">
              <img
                src={thumbnailImages[0]}
                alt={`${proyek.namaProyek} - Image 1`}
                className="w-full h-full  object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/1.jpg";
                }}
              />
            </div>

            {/* Gambar 2 - Kanan atas */}
            <div className="relative overflow-hidden">
              <img
                src={thumbnailImages[1]}
                alt={`${proyek.namaProyek} - Image 2`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/2.jpg";
                }}
              />
            </div>

            {/* Gambar 3 - Kanan atas */}
            <div className="relative rounded-tr-lg overflow-hidden">
              <img
                src={thumbnailImages[2]}
                alt={`${proyek.namaProyek} - Image 3`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/3.jpg";
                }}
              />
            </div>

            {/* Gambar 4 - Kanan bawah */}
            <div className="relative  overflow-hidden">
              <img
                src={thumbnailImages[3]}
                alt={`${proyek.namaProyek} - Image 4`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/4.jpg";
                }}
              />
            </div>

            {/* Gambar 5 - Kanan bawah */}
            <div className="relative rounded-br-lg overflow-hidden">
              <img
                src={thumbnailImages[4]}
                alt={`${proyek.namaProyek} - Image 5`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/proyek/5.jpg";
                }}
              />
            </div>
          </div>

          {/* Overlay hover effect */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <span className="bg-white text-gray-800 font-medium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Lihat Detail
            </span>
          </div>

          {/* Card Info di pojok kanan bawah */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg p-4 shadow-lg max-w-xs">
            <h3 className="font-bold text-lg text-slate-900 line-clamp-1 mb-2">
              {proyek.namaProyek}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
              {proyek.deskripsi}
            </p>

            <div className="flex flex-col gap-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full self-start ${
                  proyek.status === "PANEN"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {proyek.status}
              </span>

              <Link
                href={`/dashboard/proyek/${proyek.id}/edit`}
                className="text-center bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-900 transition text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Kelola Proyek
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tampilkan Halaman Detail jika `showDetail` dan data sudah ada */}
      {showDetail && detailProyekData && (
        <DisplayProyek proyek={detailProyekData} onClose={handleCloseDetail} />
      )}
    </>
  );
};

// Komponen Utama: DisplayProyek dengan Pagination
export default function DisplaySemuaProyek({ proyek }: DisplayProyekProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Ubah menjadi 5 proyek per halaman

  // Hitung total halaman
  const totalPages = Math.ceil(proyek.length / itemsPerPage);

  // Dapatkan proyek untuk halaman saat ini
  const currentProyek = proyek.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fungsi untuk navigasi halaman
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate array nomor halaman untuk pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (proyek.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-500">Anda belum memiliki proyek.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Flex Column Layout - Satu card per baris */}
      <div className="flex flex-col gap-6">
        {currentProyek.map((item) => (
          <KartuProyekPratinjau key={item.id} proyek={item} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 py-8">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-gray-50 border"
            }`}
          >
            ‹
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && goToPage(page)}
              disabled={typeof page === "string"}
              className={`px-3 py-2 rounded-md ${
                page === currentPage
                  ? "bg-green-600 text-white"
                  : typeof page === "string"
                  ? "bg-transparent text-gray-400 cursor-default"
                  : "bg-white text-gray-600 hover:bg-gray-50 border"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-gray-50 border"
            }`}
          >
            ›
          </button>
        </div>
      )}

      {/* Info Pagination */}
      <div className="text-center text-sm text-gray-500">
        Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, proyek.length)} dari{" "}
        {proyek.length} proyek
      </div>
    </div>
  );
}
