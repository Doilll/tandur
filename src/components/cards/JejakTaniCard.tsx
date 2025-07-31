// components/cards/JejakTaniCard.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { JejakTaniUpdateWithRelations } from "@/lib/actions/jejak.actions";
import {
  Clock,
  Heart,
  MapPin,
  Share2,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import { useState } from "react";

// Helper untuk format tanggal
const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " tahun yang lalu";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan yang lalu";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari yang lalu";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam yang lalu";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit yang lalu";
  return "Baru saja";
};

// Fungsi untuk styling status proyek
const getStatusColor = (status: string) => {
  switch (status) {
    case "PERSIAPAN":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "PENANAMAN":
      return "text-green-600 bg-green-50 border-green-200";
    case "PERAWATAN":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "PANEN":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "SELESAI":
      return "text-purple-600 bg-purple-50 border-purple-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

interface JejakTaniCardProps {
  update: JejakTaniUpdateWithRelations;
}

export default function JejakTaniCard({ update }: JejakTaniCardProps) {
  const { proyekTani, _count: counts } = update;
  const petani = proyekTani.petani;
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(counts.likes);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [commentSortOrder, setCommentSortOrder] = useState<"newest" | "oldest">(
    "newest"
  );

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // Mock comments data - replace with real data
  const mockComments = [
    {
      id: 1,
      author: "Ahmad Subhan",
      username: "ahmad_subhan",
      content:
        "Wah keren sekali hasil panennya pak! Boleh tahu pupuk apa yang dipakai?",
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 3,
    },
    {
      id: 2,
      author: "Sari Pertiwi",
      username: "sari_tani",
      content:
        "Inspiratif banget! Saya juga mau coba teknik yang sama di kebun saya.",
      time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      likes: 1,
    },
    {
      id: 3,
      author: "Budi Santoso",
      username: "budi_organik",
      content:
        "Hasil yang luar biasa! Berapa lama proses dari tanam sampai panen?",
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      likes: 2,
    },
  ];

  const sortedComments = [...mockComments].sort((a, b) => {
    return commentSortOrder === "newest"
      ? b.time.getTime() - a.time.getTime()
      : a.time.getTime() - b.time.getTime();
  });

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Link href={`/petani/${petani.username}`} className="flex-shrink-0">
              <Image
                src={petani.image || "/assets/placeholder-avatar.png"}
                alt={`Foto profil ${petani.name}`}
                width={48}
                height={48}
                className="rounded-full object-cover border-2 border-gray-100"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Link
                  href={`/petani/${petani.username}`}
                  className="font-semibold text-gray-900 hover:text-green-600 transition-colors"
                >
                  {petani.name}
                </Link>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                    proyekTani.status
                  )}`}
                >
                  {proyekTani.status.charAt(0) +
                    proyekTani.status.slice(1).toLowerCase()}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-3">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{proyekTani.lokasiLahan}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{timeAgo(update.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-4">
          <Link
            href={`/proyek/${proyekTani.id}`}
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {proyekTani.namaProyek}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
          {update.deskripsi}
        </p>
      </div>

      {/* Images */}
      {update.fotoUrl && update.fotoUrl.length > 0 && (
        <div className="px-6 pb-4">
          {update.fotoUrl.length === 1 ? (
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={update.fotoUrl[0]}
                alt="Update foto"
                width={600}
                height={400}
                className="object-cover w-full max-h-96"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
              {update.fotoUrl.slice(0, 4).map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={url}
                    alt={`Foto ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {index === 3 && update.fotoUrl.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        +{update.fotoUrl.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
              isLiked
                ? "text-red-600 bg-red-50 hover:bg-red-100"
                : "text-gray-600 hover:text-red-600 hover:bg-red-50"
            }`}
          >
            <Heart size={18} className={isLiked ? "fill-current" : ""} />
            <span className="text-sm font-medium">
              {likesCount > 0 ? likesCount : "Suka"}
            </span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all">
            <Share2 size={18} />
            <span className="text-sm font-medium">Bagikan</span>
          </button>
        </div>
      </div>

      {/* Comment Input */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tulis komentar Anda..."
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Kirim
          </button>
        </div>
      </div>

      {/* Comments Preview */}
      {counts.comments > 0 && (
        <div className="border-t border-gray-100">
          {/* Comments Header */}
          <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {counts.comments} komentar
            </span>
            <div className="flex items-center space-x-4">
              <select
                value={commentSortOrder}
                onChange={(e) =>
                  setCommentSortOrder(e.target.value as "newest" | "oldest")
                }
                className="text-xs bg-transparent border-none text-gray-600 focus:outline-none cursor-pointer"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
              </select>
              <button
                onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
                className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                <span>{isCommentsExpanded ? "Tutup" : "Lihat semua"}</span>
                {isCommentsExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isCommentsExpanded ? "max-h-96 overflow-y-auto" : "max-h-32"
            }`}
          >
            {sortedComments
              .slice(0, isCommentsExpanded ? sortedComments.length : 2)
              .map((comment) => (
                <div
                  key={comment.id}
                  className="px-6 py-3 border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User size={14} className="text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          @{comment.username}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {timeAgo(comment.time)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-600">
                          <Heart size={12} />
                          <span>{comment.likes > 0 ? comment.likes : ""}</span>
                        </button>
                        <button className="text-xs text-gray-500 hover:text-green-600">
                          Balas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </article>
  );
}
