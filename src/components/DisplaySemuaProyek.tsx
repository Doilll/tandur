// src/components/DisplaySemuaProyek.tsx

"use client";

import React, { useState, useMemo } from "react";
import { proyekKacang } from "../data/proyekdata";
import PopupGambar from "./PopupGambar";

const ImageGrid = ({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (img: string) => void;
}) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2",
    4: "grid-cols-2",
  };

  const count = Math.min(images.length, 4);

  return (
    <div
      className={`grid ${gridClasses[count as keyof typeof gridClasses]} gap-4`}
    >
      {images.map((img, index) => (
        <div
          key={img}
          className={`
            ${
              count === 3 && index === 0 ? "col-span-2" : ""
            } /* Membuat gambar pertama lebih besar jika ada 3 */
            cursor-pointer overflow-hidden rounded-lg group
          `}
          onClick={() => onImageClick(img)}
        >
          <img
            src={img}
            alt={`Gambar fase ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};

const DisplaySemuaProyek = ({ onClose }: { onClose: () => void }) => {
  const data = proyekKacang;

  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    index: number;
  }>({ isOpen: false, index: 0 });

  const semuaGambar = useMemo(() => data.fase.flatMap((f) => f.gambar), [data]);

  const handleImageClick = (imageUrl: string) => {
    const imageIndex = semuaGambar.findIndex((img) => img === imageUrl);
    if (imageIndex !== -1) {
      setPopupState({ isOpen: true, index: imageIndex });
    }
  };

  const handleClosePopup = () => {
    setPopupState({ isOpen: false, index: 0 });
  };

  const handleNextImage = () => {
    setPopupState((prev) => ({
      ...prev,
      index: Math.min(prev.index + 1, semuaGambar.length - 1),
    }));
  };

  const handlePrevImage = () => {
    setPopupState((prev) => ({ ...prev, index: Math.max(prev.index - 1, 0) }));
  };

  return (
    <div className="fixed inset-0 bg-white z-40 overflow-y-auto animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        {/* Header dengan Judul dan Tombol Close */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm py-4 mb-8 z-10 flex items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-3xl mr-10"
          >
            ×
          </button>
          <h1 className="text-2xl md:text-xl font-bold text-gray-800">
            {data.judul}
          </h1>
        </div>

        {/* Navigasi Fase (Thumbnail) */}
        <nav className="mb-12 mx-auto">
          <ul className="flex flex-wrap gap-2 item-start">
            {data.fase.map((fase) => (
              <li key={fase.id}>
                <a href={`#${fase.id}`} className="block text-center group">
                  <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-green-500 transition-all">
                    <img
                      src={fase.gambar[0]}
                      alt={fase.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 inline-block text-sm font-semibold text-gray-600 group-hover:text-green-600">
                    {fase.nama}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Konten Utama: Cerita dan Galeri per Fase */}
        <main className="space-y-16">
          {data.fase.map((fase) => (
            <section key={fase.id} id={fase.id} className="scroll-mt-24">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Kolom Kiri: Cerita */}
                <div className="prose lg:prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-green-700">
                    {fase.nama}
                  </h2>
                  <p>{fase.cerita}</p>
                </div>
                {/* Kolom Kanan: Galeri Gambar */}
                <div>
                  <ImageGrid
                    images={fase.gambar}
                    onImageClick={handleImageClick}
                  />
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* Panggil PopupGambar jika state-nya true */}
      {popupState.isOpen && (
        <PopupGambar
          images={semuaGambar}
          currentIndex={popupState.index}
          onClose={handleClosePopup}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}
    </div>
  );
};

export default DisplaySemuaProyek;
