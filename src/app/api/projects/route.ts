// app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const projects = await prisma.proyekTani.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        namaProyek: true,
        deskripsi: true,
        lokasiLahan: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        petani: {
          select: {
            id: true,
            name: true,
            username: true,
            lokasi: true,
          },
        },
        updates: {
          orderBy: { createdAt: "desc" },
          take: 3,
          select: {
            id: true,
            judul: true,
            createdAt: true,
            fotoUrl: true,
          },
        },
        produk: {
          select: {
            id: true,
            namaProduk: true,
            status: true,
            harga: true,
            unit: true,
          },
          take: 5,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data proyek" },
      { status: 500 }
    );
  }
}
