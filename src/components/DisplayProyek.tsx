// src/components/DisplayProyek.tsx

"use client";

import React, { useState } from "react";
import DisplaySemuaProyek from "./DisplaySemuaProyek"; // Kita akan buat ini selanjutnya

const DisplayProyek = () => {
  const [lihatSemua, setLihatSemua] = useState(false);

  // Ambil beberapa gambar untuk pratinjau
  const previewImages = [
    "/proyek/1.jpg",
    "/proyek/2.jpg",
    "/proyek/3.jpg",
    "/proyek/4.jpg",
    "/proyek/5.jpg",
  ];

  const handleOpenDetail = () => {
    setLihatSemua(true);
    // Mencegah scroll di body saat popup detail terbuka
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetail = () => {
    setLihatSemua(false);
    // Mengembalikan fungsi scroll di body
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {/* Kartu Pratinjau */}
      <div
        onClick={handleOpenDetail}
        className="min-w-full h-[50vh] rounded-xl bg-white grid grid-cols-3 gap-1 cursor-pointer group relative overflow-hidden"
      >
        {/* Kolom 1 */}
        <div className="w-full h-full">
          <img
            src={previewImages[0]}
            alt="Proyek 1"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>
        {/* Kolom 2 */}
        <div className="flex flex-col gap-1">
          <img
            src={previewImages[1]}
            alt="Proyek 2"
            className="w-full h-1/2 object-cover"
          />
          <img
            src={previewImages[2]}
            alt="Proyek 3"
            className="w-full h-1/2 object-cover"
          />
        </div>
        {/* Kolom 3 */}
        <div className="flex flex-col gap-1">
          <img
            src={previewImages[3]}
            alt="Proyek 4"
            className="w-full h-1/2 object-cover rounded-tr-xl"
          />
          <img
            src={previewImages[4]}
            alt="Proyek 5"
            className="w-full h-1/2 object-cover rounded-br-xl"
          />
        </div>

        {/* Overlay dan Tombol "Lihat Semua Foto" */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-black bg-opacity-75 text-white font-bold p-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Lihat Semua Foto
          </span>
        </div>
      </div>

      {/* Tampilkan Halaman Detail jika `lihatSemua` adalah true */}
      {lihatSemua && <DisplaySemuaProyek onClose={handleCloseDetail} />}
    </>
  );
};

export default DisplayProyek;
