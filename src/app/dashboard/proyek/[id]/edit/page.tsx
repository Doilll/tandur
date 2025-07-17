// src/app/dashboard/proyek/[id]/edit/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ProyekTani,
  FaseProyek,
  StatusProyek,
  FarmingUpdate,
} from "@prisma/client";
import { ArrowLeft, Save } from "lucide-react";

// Import komponen yang sudah di-refactor
import { ProjectInfoForm, type FormData } from "./components/ProjectInfoForm";
import { FaseManagement } from "./components/FaseManagement";
import { ProjectSidebar } from "./components/ProjectSidebar";
import { FaseEditorModal } from "./components/FaseEditorModal";
import {
  ProdukEditorModal,
  type ProdukFormData,
} from "./components/ProdukEditorModal";
import { FarmingUpdateManagement } from "./components/FarmingUpdateManagement";
import { UpdateEditorModal } from "./components/UpdateEditorModal";

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

  // State untuk Produk
  const [produkList, setProdukList] = useState<ProdukFormData[]>([]);
  const [editingProduk, setEditingProduk] = useState<ProdukFormData | null>(
    null
  );
  const [showProdukModal, setShowProdukModal] = useState(false);

  // State untuk Farming Update
  const [updates, setUpdates] = useState<FarmingUpdate[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Fetch semua data proyek, termasuk farming updates
  useEffect(() => {
    if (!proyekId) return;
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Gunakan Promise.all untuk fetch data secara paralel
        const [proyekRes, updatesRes] = await Promise.all([
          fetch(`/api/proyek/${proyekId}`),
          fetch(`/api/proyek/${proyekId}/update`),
        ]);

        if (!proyekRes.ok) throw new Error("Gagal mengambil data proyek");
        const dataProyek: ProyekWithFase = await proyekRes.json();
        setProyek(dataProyek);
        setFormData({
          namaProyek: dataProyek.namaProyek,
          deskripsi: dataProyek.deskripsi,
          lokasiLahan: dataProyek.lokasiLahan,
          status: dataProyek.status,
        });
        setFaseList(
          dataProyek.fase.map((f) => ({ ...f, gambar: f.gambar || [] }))
        );

        if (updatesRes.ok) {
          const dataUpdates = await updatesRes.json();
          setUpdates(dataUpdates);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Gagal memuat data halaman");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [proyekId]);

  // Fetch data produk
  useEffect(() => {
    if (!proyekId) return;
    const fetchProduk = async () => {
      try {
        const response = await fetch(`/api/proyek/${proyekId}/produk`);
        if (!response.ok) throw new Error("Gagal mengambil data produk");
        const data: ProdukFormData[] = await response.json();
        setProdukList(data);
      } catch (error) {
        console.error("Error fetching produk:", error);
      }
    };
    fetchProduk();
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

  // Handler untuk Produk
  const handleSaveProduk = async (produkData: ProdukFormData) => {
    const isEdit = !!produkData.id;
    const url = isEdit
      ? `/api/proyek/${proyekId}/produk/${produkData.id}`
      : `/api/proyek/${proyekId}/produk`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produkData),
      });
      if (!response.ok) throw new Error("Gagal menyimpan produk");
      const savedProduk = await response.json();

      if (isEdit) {
        setProdukList((prev) =>
          prev.map((p) => (p.id === savedProduk.id ? savedProduk : p))
        );
      } else {
        setProdukList((prev) => [...prev, savedProduk]);
      }
      setShowProdukModal(false);
      alert("Produk berhasil disimpan!");
    } catch (error) {
      console.error("Error saving produk:", error);
      alert("Gagal menyimpan produk");
    }
  };

  const handleDeleteProduk = async (produkId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    try {
      const response = await fetch(
        `/api/proyek/${proyekId}/produk/${produkId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Gagal menghapus produk");
      setProdukList((prev) => prev.filter((p) => p.id !== produkId));
      alert("Produk berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting produk:", error);
      alert("Gagal menghapus produk");
    }
  };

  // Handler untuk Farming Update
  const handleSaveUpdate = async (
    updateData: Omit<FarmingUpdate, "id" | "proyekTaniId" | "createdAt">
  ) => {
    try {
      const response = await fetch(`/api/proyek/${proyekId}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error("Gagal menyimpan update");
      const newUpdate = await response.json();
      setUpdates((prev) => [newUpdate, ...prev]); // Tambahkan ke depan array
      setShowUpdateModal(false);
      alert("Update berhasil disimpan!");
    } catch (error) {
      alert("Gagal menyimpan update.");
      console.error(error);
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

  const handleOpenAddProduk = () => {
    setEditingProduk({
      namaProduk: "",
      deskripsi: "",
      fotoUrl: [],
      harga: 0,
      unit: "kg",
      stokTersedia: 0,
      status: "TERSEDIA",
      estimasiPanen: null,
      proyekTaniId: proyekId,
    });
    setShowProdukModal(true);
  };

  const handleOpenEditProduk = (produk: ProdukFormData) => {
    setEditingProduk(produk);
    setShowProdukModal(true);
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

          {/* Komponen Farming Update Management */}
          <FarmingUpdateManagement
            updates={updates}
            onAdd={() => setShowUpdateModal(true)}
          />

          {/* Manajemen Produk */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Produk</h3>
              <button
                onClick={handleOpenAddProduk}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                + Tambah Produk
              </button>
            </div>

            {produkList.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Belum ada produk yang ditambahkan
              </p>
            ) : (
              <div className="space-y-3">
                {produkList.map((produk) => (
                  <div
                    key={produk.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {produk.namaProduk}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Rp {produk.harga.toLocaleString("id-ID")} /{" "}
                        {produk.unit}
                      </p>
                      <p className="text-sm text-gray-500">
                        Stok: {produk.stokTersedia} {produk.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          produk.status === "TERSEDIA"
                            ? "bg-green-100 text-green-800"
                            : produk.status === "PREORDER"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {produk.status}
                      </span>
                      <button
                        onClick={() => handleOpenEditProduk(produk)}
                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduk(produk.id!)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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

      {/* Modal untuk edit/tambah produk */}
      <ProdukEditorModal
        isOpen={showProdukModal}
        onClose={() => setShowProdukModal(false)}
        onSave={handleSaveProduk}
        initialData={editingProduk}
        onImageUpload={handleImageUpload}
        proyekId={proyekId}
      />

      {/* Modal untuk edit/tambah farming update */}
      <UpdateEditorModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSave={handleSaveUpdate}
      />
    </div>
  );
};

export default EditProyekPage;
