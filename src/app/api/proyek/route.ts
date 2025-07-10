// src/app/api/proyek/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // 1. Cek Sesi Pengguna: Pastikan hanya PETANI yang bisa membuat proyek
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "PETANI") {
      return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
    }

    // 2. Ambil data dari body request
    const body = await request.json();
    const { namaProyek, deskripsi, lokasiLahan } = body;

    // 3. Validasi Input: Pastikan data yang dibutuhkan ada
    if (!namaProyek || !deskripsi || !lokasiLahan) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // 4. Validasi tambahan untuk panjang string
    if (namaProyek.length > 100) {
      return NextResponse.json(
        { message: "Nama proyek maksimal 100 karakter" },
        { status: 400 }
      );
    }

    if (deskripsi.length > 500) {
      return NextResponse.json(
        { message: "Deskripsi maksimal 500 karakter" },
        { status: 400 }
      );
    }

    if (lokasiLahan.length > 200) {
      return NextResponse.json(
        { message: "Lokasi lahan maksimal 200 karakter" },
        { status: 400 }
      );
    }

    // 5. Buat Proyek Baru di Database menggunakan Prisma
    const proyekBaru = await prisma.proyekTani.create({
      data: {
        namaProyek: namaProyek.trim(),
        deskripsi: deskripsi.trim(),
        lokasiLahan: lokasiLahan.trim(),
        petaniId: session.user.id, // Hubungkan proyek dengan petani yang login
        // Status akan otomatis 'PERSIAPAN' sesuai default di schema
      },
    });

    // 6. Kembalikan respons sukses dengan format yang konsisten
    return NextResponse.json(
      {
        message: "Proyek berhasil dibuat",
        data: proyekBaru,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat membuat proyek:", error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      // Jika ada constraint violation atau error database lainnya
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { message: "Nama proyek sudah digunakan" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // 1. Cek Sesi Pengguna
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "PETANI") {
      return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
    }

    // 2. Ambil semua proyek milik petani yang login
    const proyekList = await prisma.proyekTani.findMany({
      where: {
        petaniId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      // Hapus include _count yang bermasalah
    });

    // 3. Kembalikan data proyek
    return NextResponse.json(
      {
        message: "Data proyek berhasil diambil",
        data: proyekList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saat mengambil proyek:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
