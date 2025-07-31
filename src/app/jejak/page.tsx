// app/jejak/page.tsx

import { getJejakTaniUpdates } from "@/lib/actions/jejak.actions";
import JejakTaniCard from "@/components/cards/JejakTaniCard";
import { Plus, Sprout } from "lucide-react";

export const metadata = {
  title: "Jejak Tani | Tandur",
  description:
    "Ikuti perjalanan dan cerita terbaru dari para petani di seluruh Indonesia.",
};

function PageHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Jejak Tani</h1>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Ikuti perjalanan dan berbagi pengalaman bertani bersama komunitas
              petani Indonesia. Dokumentasikan setiap langkah perjalanan
              pertanian Anda.
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
            <Plus size={18} />
            <span>Buat Update</span>
          </button>
        </div>
      </div>
    </div>
  );
}
function FilterSection() {
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Urutkan:</span>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="most-liked">Paling Disukai</option>
              <option value="most-commented">Paling Banyak Komentar</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="all">Semua Status</option>
              <option value="PERSIAPAN">Persiapan</option>
              <option value="PENANAMAN">Penanaman</option>
              <option value="PERAWATAN">Perawatan</option>
              <option value="PANEN">Panen</option>
              <option value="SELESAI">Selesai</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sprout className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Belum Ada Jejak yang Ditinggalkan
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Saat ini belum ada update dari para petani. Jadilah yang pertama
          berbagi cerita perjalanan pertanian Anda dan inspirasi untuk
          komunitas!
        </p>
        <button className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
          <Plus size={18} />
          <span>Mulai Berbagi Jejak</span>
        </button>
      </div>
    </div>
  );
}

function StatsSection({ updateCount }: { updateCount: number }) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="text-center">
            <div className="font-semibold text-green-800">{updateCount}</div>
            <div className="text-green-600">Update Hari Ini</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-800">24</div>
            <div className="text-green-600">Petani Aktif</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-800">156</div>
            <div className="text-green-600">Proyek Berlangsung</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function JejakTaniPage() {
  const updates = await getJejakTaniUpdates();

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Stats Section */}
      <StatsSection updateCount={updates?.length || 0} />

      {/* Filter Section */}
      <FilterSection />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8">
        {updates && updates.length > 0 ? (
          <div className="space-y-0">
            {updates.map((update) => (
              <JejakTaniCard key={update.id} update={update} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}
