"use client";

import DisplaySemuaProyek from "@/components/DisplaySemuaProyek";
import prisma from "@/lib/prisma";
import { useState } from "react";

// Server Component untuk fetch data
async function getProyekDetail(id: string) {
  const proyek = await prisma.proyekTani.findUnique({
    where: { id },
    include: {
      fase: {
        // <-- PENTING: sertakan relasi fase
        orderBy: {
          urutan: "asc", // Urutkan fase
        },
      },
    },
  });
  return proyek;
}

export default async function ProyekDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // State untuk menampilkan/menyembunyikan komponen detail
  const [showDetail, setShowDetail] = useState(false);

  // Ambil data di server component
  const proyekData = await getProyekDetail(params.id);

  if (!proyekData) {
    return <div>Proyek tidak ditemukan.</div>;
  }

  return (
    <div>
      <h1>Halaman Detail Proyek (Ringkasan)</h1>
      {/* ...tampilkan ringkasan proyek di sini... */}
      <button onClick={() => setShowDetail(true)}>
        Lihat Perjalanan Proyek Lengkap
      </button>

      {/* Komponen ini hanya akan muncul jika showDetail true */}
      {showDetail && (
        <DisplaySemuaProyek
          proyek={proyekData}
          onClose={() => setShowDetail(false)}
        />
      )}
    </div>
  );
}
