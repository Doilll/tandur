// src/components/DisplayProyek.tsx

// 1. Import tipe data yang relevan dari Prisma
import { ProyekTani, StatusProyek } from "@prisma/client";
import Link from "next/link";

// 2. Definisikan tipe untuk props komponen ini
// Ini akan memberitahu TypeScript bahwa DisplayProyek akan menerima sebuah
// properti 'proyek' yang isinya adalah array dari ProyekTani.
interface DisplayProyekProps {
  proyek: ProyekTani[];
}

// 3. Terima props 'proyek' di dalam parameter komponen
export default function DisplayProyek({ proyek }: DisplayProyekProps) {
  // Jika tidak ada proyek, tampilkan pesan
  if (proyek.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Daftar Proyek Anda
        </h2>
        <p className="mt-2 text-slate-500">
          Anda belum memiliki proyek. Mulai buat proyek pertama Anda!
        </p>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          + Buat Proyek Baru
        </button>
      </div>
    );
  }

  // Jika ada proyek, tampilkan dalam bentuk daftar/grid
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Semua Proyek Anda
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyek.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                {item.namaProyek}
              </h3>
              <p className="text-sm text-slate-600 mt-1 line-clamp-3">
                {item.deskripsi}
              </p>
            </div>
            <div className="mt-4">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.status === "PANEN"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.status}
              </span>
              <Link href={`/dashboard/proyek/${item.id}`}>
                <p className="block w-full text-center mt-3 bg-slate-800 text-white py-2 rounded-md hover:bg-slate-900 transition">
                  Lihat Detail
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
