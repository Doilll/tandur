import Sidebar from "@/app/dashboard/components/Sidebar"; // Pastikan path ini benar
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

// Fungsi ini akan berjalan di server
async function getPetaniData() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.username) {
    redirect("/sign-in");
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
    },
  });

  if (!petani) {
    redirect("/error-page"); // atau handle error
  }

  return {
    name: petani.name ?? "Nama Petani",
    email: petani.email ?? "email@petani.com",
    image: petani.image ?? "/default-avatar.png",
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getPetaniData();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-72 flex-shrink-0">
        <Sidebar user={userData} />
      </div>
      <main className="flex-grow p-6 md:p-8">{children}</main>
    </div>
  );
}
