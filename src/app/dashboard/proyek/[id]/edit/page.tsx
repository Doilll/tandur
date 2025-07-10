// src/app/dashboard/proyek/[id]/edit/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProyekTani, FaseProyek, StatusProyek } from "@prisma/client";
import { ArrowLeft, Eye, Save } from "lucide-react";

// Import komponen yang sudah di-refactor
import { ProjectInfoForm, type FormData } from "./components/ProjectInfoForm";
import { FaseManagement } from "./components/FaseManagement";
import { ProjectSidebar } from "./components/ProjectSidebar";
import { FaseEditorModal } from "./components/FaseEditorModal";

// Tipe yang akan digunakan oleh komponen anak
type ProyekWithFase = ProyekTani & { fase: FaseProyek[] };
export interface FaseFormData {
  id?: string;
  nama: string;
  slug: string;
  cerita: string;
  gambar: string[];
  urutan: number;
}

const EditProyekPage = () => {
  const params = useParams();
  const router = useRouter();
  const proyekId = params.id as string;

  // State utama tetap di sini
  const [proyek, setProyek] = useState<ProyekWithFase | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    namaProyek: "",
    deskripsi: "",
    lokasiLahan: "",
    status: StatusProyek.PERSIAPAN,
  });

  const [faseList, setFaseList] = useState<FaseFormData[]>([]);
  const [editingFase, setEditingFase] = useState<FaseFormData | null>(null);
  const [showFaseModal, setShowFaseModal] = useState(false);

  // Fetch data proyek (tidak berubah)
  useEffect(() => {
    if (!proyekId) return;
    const fetchProyek = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/proyek/${proyekId}`);
        if (!response.ok) throw new Error("Gagal mengambil data proyek");
        const data: ProyekWithFase = await response.json();
        setProyek(data);
        setFormData({
          namaProyek: data.namaProyek,
          deskripsi: data.deskripsi,
          lokasiLahan: data.lokasiLahan,
          status: data.status,
        });
        setFaseList(data.fase.map((f) => ({ ...f, gambar: f.gambar || [] })));
      } catch (error) {
        console.error("Error fetching proyek:", error);
        alert("Gagal memuat data proyek");
      } finally {
        setLoading(false);
      }
    };
    fetchProyek();
  }, [proyekId]);

  // Semua handler tetap di sini, menjadi "callback" untuk komponen anak
  const handleFormChange = useCallback(
    (field: keyof FormData, value: string | StatusProyek) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSaveProyek = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/proyek/${proyekId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Gagal menyimpan proyek");
      alert("Proyek berhasil disimpan!");
    } catch (error) {
      console.error("Error saving proyek:", error);
      alert("Gagal menyimpan proyek");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFase = async (faseData: FaseFormData) => {
    const isEdit = !!faseData.id;
    const url = isEdit
      ? `/api/proyek/${proyekId}/fase/${faseData.id}`
      : `/api/proyek/${proyekId}/fase`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faseData),
      });
      if (!response.ok) throw new Error("Gagal menyimpan fase");
      const savedFase = await response.json();

      if (isEdit) {
        setFaseList((prev) =>
          prev.map((f) => (f.id === savedFase.id ? savedFase : f))
        );
      } else {
        setFaseList((prev) => [...prev, savedFase]);
      }
      setShowFaseModal(false);
      alert("Fase berhasil disimpan!");
    } catch (error) {
      console.error("Error saving fase:", error);
      alert("Gagal menyimpan fase");
    }
  };

  const handleDeleteFase = async (faseId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus fase ini?")) return;
    try {
      const response = await fetch(`/api/proyek/${proyekId}/fase/${faseId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Gagal menghapus fase");
      setFaseList((prev) => prev.filter((f) => f.id !== faseId));
      alert("Fase berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting fase:", error);
      alert("Gagal menghapus fase");
    }
  };

  const handleImageUpload = async (files: FileList): Promise<string[]> => {
    const uploadFormData = new FormData();
    Array.from(files).forEach((file) => uploadFormData.append("images", file));
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });
      if (!response.ok) throw new Error("Gagal upload gambar");
      const { urls } = await response.json();
      return urls;
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Gagal upload gambar");
      return [];
    }
  };

  // Handlers untuk membuka dan menutup modal
  const handleOpenAddFase = () => {
    setEditingFase({
      nama: "",
      slug: "",
      cerita: "",
      gambar: [],
      urutan: faseList.length + 1,
    });
    setShowFaseModal(true);
  };

  const handleOpenEditFase = (fase: FaseFormData) => {
    setEditingFase(fase);
    setShowFaseModal(true);
  };

  // Render logic
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  if (!proyek)
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Proyek tidak ditemukan</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Proyek</h1>
            <p className="text-gray-600">{proyek.namaProyek}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSaveProyek}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Kolom utama dengan form dan manajemen fase */}
        <div className="lg:col-span-2 space-y-6">
          <ProjectInfoForm
            formData={formData}
            onFormChange={handleFormChange}
          />
          <FaseManagement
            faseList={faseList}
            onAdd={handleOpenAddFase}
            onEdit={handleOpenEditFase}
            onDelete={handleDeleteFase}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ProjectSidebar
            proyekId={proyekId}
            faseList={faseList}
            status={formData.status}
          />
        </div>
      </div>

      {/* Modal untuk edit/tambah fase */}
      <FaseEditorModal
        isOpen={showFaseModal}
        onClose={() => setShowFaseModal(false)}
        onSave={handleSaveFase}
        initialData={editingFase}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default EditProyekPage;
