import Sidebar from "@/app/dashboard/components/Sidebar";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Pastikan path ini benar
import prisma from "@/lib/prisma"; // Import Prisma client
import { redirect } from "next/navigation";

// Fungsi ini akan berjalan di server
async function getPetaniData() {
  const session = await getServerSession(authOptions);

  // Jika tidak ada sesi atau username, arahkan ke halaman login
  if (!session?.user?.username) {
    redirect("/sign-in"); // atau halaman lain
  }

  // Langsung query ke database dari Server Component
  const petani = await prisma.user.findUnique({
    where: {
      username: session.user.username,
    },
    select: {
      name: true,
      email: true,
      image: true,
      // Kamu tidak perlu semua data di sidebar, cukup yang esensial saja
    },
  });

  // Jika karena suatu alasan user di sesi tidak ada di DB
  if (!petani) {
    redirect("/error-page"); // atau handle error
  }

  // Kita tambahkan nilai default di sini jika ada yang null
  return {
    name: petani.name ?? "Nama Petani",
    email: petani.email ?? "email@petani.com",
    image: petani.image ?? "/default-avatar.png", // Fallback ke avatar default
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Panggil fungsi untuk mendapatkan data asli dari server
  const userData = await getPetaniData();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar sekarang menerima data asli */}
      <div className="w-72 flex-shrink-0">
        <Sidebar user={userData} />
      </div>

      {/* Konten Utama (Kolom Kanan) */}
      <main className="flex-grow p-6 md:p-8">{children}</main>
    </div>
  );
}
