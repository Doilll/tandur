// src/app/dashboard/proyek/[id]/edit/components/FarmingUpdateManagement.tsx
"use client";

import { Plus, BookOpen, Camera } from "lucide-react";
import { FarmingUpdate } from "@prisma/client";

interface FarmingUpdateManagementProps {
  updates: FarmingUpdate[];
  onAdd: () => void;
}

export const FarmingUpdateManagement = ({
  updates,
  onAdd,
}: FarmingUpdateManagementProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Jurnal Tani (Log Kegiatan)</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={16} />
          Tambah Update
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {updates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen size={32} className="mx-auto" />
            <p className="mt-2">Belum ada jurnal/update kegiatan.</p>
          </div>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(update.createdAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="font-semibold text-gray-800">
                    {update.judul}
                  </h3>
                </div>
                {/* Di sini bisa ditambahkan tombol Edit/Delete nanti */}
              </div>
              <p className="text-gray-600 mt-2 text-sm">{update.deskripsi}</p>
              {update.fotoUrl.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <Camera size={14} />
                  <span>{update.fotoUrl.length} foto</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
