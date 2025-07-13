"use client";

import {
  User,
  MapPin,
  Phone,
  Image,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Upload,
  Trash2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ProfileData {
  name: string;
  bio: string;
  lokasi: string;
  linkWhatsapp: string;
  image: string;
  username: string;
}

export default function FarmerSettings() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    bio: "",
    lokasi: "",
    linkWhatsapp: "",
    image: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.username) return;

      try {
        const response = await fetch(`/api/petani/${session.user.username}`);
        if (!response.ok) throw new Error("Gagal memuat profil");
        const data = await response.json();
        const petani = {
          name: data.data.name ?? "",
          bio: data.data.bio ?? "",
          lokasi: data.data.lokasi ?? "",
          linkWhatsapp: data.data.linkWhatsapp ?? "",
          image: data.data.image ?? "",
            username: data.data.username ?? "",
        };
        setProfile(petani);
        setImagePreview(data.data.image);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return profile?.image || "";

    const formData = new FormData();
    formData.append("images", selectedImage);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Gagal mengupload gambar");

      const data = await response.json();
      return data.urls[0];
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      let imageUrl = profile.image;

      if (selectedImage) {
        imageUrl = await uploadImage();
      }

      const updatedData = {
        ...profile,
        image: imageUrl,
      };

      const response = await fetch(`/api/petani/${session?.user?.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan perubahan");

      setSuccess("Profil berhasil diperbarui!");
      setProfile(updatedData);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!profile) return;
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AlertCircle className="w-8 h-8 text-red-500 mr-2" />
        <p>Gagal memuat data profil</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Status Messages */}
      {error && (
        <div className="flex items-center bg-red-50 text-red-700 p-3 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center bg-green-50 text-green-700 p-3 rounded-lg mb-6">
          <CheckCircle className="w-5 h-5 mr-2" />
          {success}
        </div>
      )}

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Profile Picture Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Image className="w-5 h-5 mr-2 text-green-600" />
            Foto Profil
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full text-gray-400 p-8" />
                )}
              </div>
              {selectedImage && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(profile.image);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Unggah foto baru
              </label>
              <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition">
                <div className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    {selectedImage ? "Ganti gambar" : "Pilih gambar"}
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG (maks. 5MB)
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Informasi Pribadi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={profile.username}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio/Deskripsi
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio ?? ""}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="lokasi"
                className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Lokasi
              </label>
              <input
                type="text"
                id="lokasi"
                name="lokasi"
                value={profile.lokasi}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="linkWhatsapp"
                className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <Phone className="w-4 h-4 mr-1" />
                Nomor WhatsApp
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                  +62
                </span>
                <input
                  type="tel"
                  id="linkWhatsapp"
                  name="linkWhatsapp"
                  value={(profile.linkWhatsapp || "").replace("+62", "")}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setProfile({
                      ...profile,
                      linkWhatsapp: "+62" + value,
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Contoh: 81234567890 (tanpa +62)
              </p>
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
