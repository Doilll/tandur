"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormProyekBaru from "@/components/FormProyekBaru";
import DisplayProyek from "@/components/DisplayProyek";
import { ProyekTani } from "@prisma/client";

// Dummy data proyek
const dummyProyek = [
  {
    id: "proyek-1",
    namaProyek: "Panen Cabai Organik",
    lokasiLahan: "Banyuwangi, Jawa Timur",
    status: "BERJALAN",
    createdAt: "2024-06-01",
  },
  {
    id: "proyek-2",
    namaProyek: "Budidaya Jagung Manis",
    lokasiLahan: "Garut, Jawa Barat",
    status: "PERSIAPAN",
    createdAt: "2024-05-10",
  },
  {
    id: "proyek-3",
    namaProyek: "Panen Padi Super",
    lokasiLahan: "Ngawi, Jawa Timur",
    status: "SELESAI",
    createdAt: "2024-04-15",
  },
];


const BadgeStatus = ({ status }: { status: string }) => {
  const color =
    status === "PERSIAPAN"
      ? "bg-yellow-100 text-yellow-800"
      : status === "BERJALAN"
      ? "bg-green-100 text-green-800"
      : "bg-slate-100 text-slate-600";
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${color}`}>
      {status}
    </span>
  );
};

export default function ProyekDashboardPage() {

  const [proyek, setProyek] = useState(dummyProyek);
  const [isModalOpen, setIsModalOpen] = useState(false); // Placeholder modal
  

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">Proyek Tani Anda</h1>
        <Button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={() => setIsModalOpen(true)}>+ Tambah Proyek</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyek.map((proyek) => (
            <div key={proyek.id} className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-800">{proyek.namaProyek}</h2>
                <p className="text-sm text-slate-600">Lokasi: {proyek.lokasiLahan}</p>
                <BadgeStatus status={proyek.status} />
                <p className="mt-2 text-xs text-slate-500">
                Dibuat pada: {new Date(proyek.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
                </p>
                <Link href={`/dashboard/proyek/${proyek.id}`} className="mt-4 inline-block text-green-600 hover:text-green-800">
                Lihat Detail
                </Link>
            </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="p-4 bg-white rounded shadow mt-6 text-sm text-slate-500">
            <FormProyekBaru
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                // Placeholder for success handling
                setIsModalOpen(false);
                alert("Proyek berhasil dibuat!");
                }}
            />
        </div>
      )}
    </div>
  );
}
