// src/app/api/proyek/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const proyek = await prisma.proyekTani.findUnique({
      where: { id },
      include: {
        petani: {
          select: {
            name: true,
            email: true,
          },
        },
        produk: true,
        fase: {
          orderBy: { urutan: "asc" },
        },
      },
    });

    if (!proyek) {
      return NextResponse.json(
        { message: "Proyek tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(proyek, { status: 200 });
  } catch (error) {
    console.error("Error GET /api/proyek/[id]:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "PETANI") {
      return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();
    const { namaProyek, deskripsi, lokasiLahan } = body;

    // Validasi input
    if (!namaProyek || !deskripsi || !lokasiLahan) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Cek apakah proyek milik petani yang login
    const existingProyek = await prisma.proyekTani.findFirst({
      where: {
        id,
        petaniId: session.user.id,
      },
    });

    if (!existingProyek) {
      return NextResponse.json(
        { message: "Proyek tidak ditemukan atau bukan milik Anda" },
        { status: 404 }
      );
    }

    const proyek = await prisma.proyekTani.update({
      where: { id },
      data: {
        namaProyek: namaProyek.trim(),
        deskripsi: deskripsi.trim(),
        lokasiLahan: lokasiLahan.trim(),
      },
    });

    return NextResponse.json(
      {
        message: "Proyek berhasil diperbarui",
        data: proyek,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error PUT /api/proyek/[id]:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "PETANI") {
      return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
    }

    const { id } = params;

    // Cek apakah proyek milik petani yang login
    const existingProyek = await prisma.proyekTani.findFirst({
      where: {
        id,
        petaniId: session.user.id,
      },
    });

    if (!existingProyek) {
      return NextResponse.json(
        { message: "Proyek tidak ditemukan atau bukan milik Anda" },
        { status: 404 }
      );
    }

    const proyek = await prisma.proyekTani.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Proyek berhasil dihapus",
        data: proyek,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error DELETE /api/proyek/[id]:", error);

    // Handle foreign key constraint error
    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint")
    ) {
      return NextResponse.json(
        { message: "Tidak dapat menghapus proyek yang memiliki data terkait" },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
