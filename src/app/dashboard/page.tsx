// src/app/(dashboard)/dashboard/page.tsx

import { Leaf, Package, BarChart3 } from "lucide-react";
import DisplayProyek from "@/components/DisplayProyek";

// Contoh komponen Card, bisa dibuat file terpisah nanti
const StatCard = ({ title, value, icon: Icon, colorClass }: any) => (
  <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className={`rounded-full p-2 ${colorClass}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
    <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
  </div>
);

export default function DashboardOverviewPage() {
  // Di sini kamu akan fetch data dari database
  // const totalProyekAktif = ...
  // const totalProduk = ...

  return (
    <div className="space-y-8">
      {/* Grid untuk Kartu Statistik */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Proyek Aktif"
          value="5"
          icon={Leaf}
          colorClass="bg-green-500"
        />
        <StatCard
          title="Total Produk"
          value="12"
          icon={Package}
          colorClass="bg-sky-500"
        />
        <StatCard
          title="Pengunjung Profil (30 hari)"
          value="1.2k"
          icon={BarChart3}
          colorClass="bg-amber-500"
        />
      </div>

      {/* Area lain, misalnya: Update Proyek Terbaru */}
      <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">
          Aktivitas Proyek Terbaru
        </h2>
        <p className="mt-2 text-slate-500">
          Di sini kamu bisa menampilkan daftar update terakhir dari model
          `FarmingUpdate`.
        </p>
        {/* ... Tampilkan daftar aktivitas di sini ... */}
      </div>

      <DisplayProyek />
    </div>
  );
}
