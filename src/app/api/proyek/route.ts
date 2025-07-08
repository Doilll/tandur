import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // pastikan file authOptions udah di-setup
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "PETANI") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const { namaProyek, deskripsi, lokasiLahan } = body;

    if (!namaProyek || !deskripsi || !lokasiLahan) {
      return NextResponse.json(
        { message: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    const proyek = await prisma.proyekTani.create({
      data: {
        namaProyek,
        deskripsi,
        lokasiLahan,
        petaniId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "Proyek berhasil dibuat", data: proyek },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error POST /api/proyek:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
